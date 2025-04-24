using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class HouseCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<HouseCreateUpdateCommand, HouseViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<HouseViewModel> Handle(HouseCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<HouseViewModel> Create(HouseCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new House
        {
            Name = request.Name,
            Address = request.Address,
            Description = request.Description,
            TotalRooms = request.TotalRooms,
            Status = request.Status,
            CreatedAt = DateTime.UtcNow,
            UserId = request.UserId
            
        };

        _unitOfWork.HouseRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create house");
        }

        var createdEntity = await _unitOfWork.HouseRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<HouseViewModel>(createdEntity);
    }

    private async Task<HouseViewModel> Update(HouseCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.HouseRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("House not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.HouseRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update house failed");
        }

        return _mapper.Map<HouseViewModel>(entity);
    }
}
