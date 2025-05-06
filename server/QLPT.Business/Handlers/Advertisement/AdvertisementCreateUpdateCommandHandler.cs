using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class AdvertisementCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementCreateUpdateCommand, AdvertisementViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<AdvertisementViewModel> Handle(AdvertisementCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<AdvertisementViewModel> Create(AdvertisementCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new Advertisement
        {
            Title = request.Title,
            Address = request.Address,
            Description = request.Description,
            Cost = request.Cost,
            Area = request.Area,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            MaxOccupants = request.MaxOccupants,
            Status = request.Status,
            Type = request.Type,
            UserId = request.UserId,
        };

        _unitOfWork.AdvertisementRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create advertisement");
        }

        var createdEntity = await _unitOfWork.AdvertisementRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<AdvertisementViewModel>(createdEntity);
    }

    private async Task<AdvertisementViewModel> Update(AdvertisementCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.AdvertisementRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("Advertisement not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.AdvertisementRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update Advertisement failed");
        }

        return _mapper.Map<AdvertisementViewModel>(entity);
    }
}
