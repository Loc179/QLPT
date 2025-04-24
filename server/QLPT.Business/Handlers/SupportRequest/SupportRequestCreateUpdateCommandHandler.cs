using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class SupportRequestCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestCreateUpdateCommand, SupportRequestViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<SupportRequestViewModel> Handle(SupportRequestCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<SupportRequestViewModel> Create(SupportRequestCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new SupportRequest
        {
            Content = request.Content,
            AdminReply = request.AdminReply,
            Status = request.Status,
            CreatedAt = DateTime.UtcNow,
            UserId = request.UserId
        };

        _unitOfWork.SupportRequestRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create SupportRequest");
        }

        var createdEntity = await _unitOfWork.SupportRequestRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<SupportRequestViewModel>(createdEntity);
    }

    private async Task<SupportRequestViewModel> Update(SupportRequestCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.SupportRequestRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("SupportRequest not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.SupportRequestRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update SupportRequest failed");
        }

        return _mapper.Map<SupportRequestViewModel>(entity);
    }
}
