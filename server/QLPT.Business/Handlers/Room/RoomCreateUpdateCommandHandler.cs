using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class RoomCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomCreateUpdateCommand, RoomViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<RoomViewModel> Handle(RoomCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<RoomViewModel> Create(RoomCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new Room
        {
            RoomNumber = request.RoomNumber,
            Description = request.Description,
            Price = request.Price,
            MaxOccupants = request.MaxOccupants,
            OccupancyStatus = request.OccupancyStatus,
            HouseId = request.HouseId,
            CreatedAt = DateTime.UtcNow
        };

        _unitOfWork.RoomRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create room");
        }

        var createdEntity = await _unitOfWork.RoomRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<RoomViewModel>(createdEntity);
    }

    private async Task<RoomViewModel> Update(RoomCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.RoomRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("Room not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.RoomRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update room failed");
        }

        return _mapper.Map<RoomViewModel>(entity);
    }
}
