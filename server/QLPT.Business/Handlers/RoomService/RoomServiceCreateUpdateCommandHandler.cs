using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class RoomServiceCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomServiceCreateUpdateCommand, RoomServiceViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<RoomServiceViewModel> Handle(RoomServiceCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<RoomServiceViewModel> Create(RoomServiceCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new RoomService
        {
            Name = request.Name,
            Cost = request.Cost,
            Unit = request.Unit,
            CreatedAt = DateTime.UtcNow,
            RoomId = request.RoomId
        };

        _unitOfWork.RoomServiceRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create roomService");
        }

        var createdEntity = await _unitOfWork.RoomServiceRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<RoomServiceViewModel>(createdEntity);
    }

    private async Task<RoomServiceViewModel> Update(RoomServiceCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.RoomServiceRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("RoomService not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.RoomServiceRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update roomService failed");
        }

        return _mapper.Map<RoomServiceViewModel>(entity);
    }
}
