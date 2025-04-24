using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels.Tenant;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class TenantCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<TenantCreateUpdateCommand, TenantViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<TenantViewModel> Handle(TenantCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<TenantViewModel> Create(TenantCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new Tenant
        {
            FullName = request.FullName,
            PhoneNumber = request.PhoneNumber,
            Email = request.Email,
            IsRepresentative = request.IsRepresentative,
            RoomId = request.RoomId
        };

        _unitOfWork.TenantRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create Tenant");
        }

        var createdEntity = await _unitOfWork.TenantRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<TenantViewModel>(createdEntity);
    }

    private async Task<TenantViewModel> Update(TenantCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.TenantRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("Tenant not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.TenantRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update Tenant failed");
        }

        return _mapper.Map<TenantViewModel>(entity);
    }
}
