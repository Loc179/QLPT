using System;
using AutoMapper;
using MediatR;
using QLPT.Business.Services;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class AdvertisementCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork, IImageHostingService imageService) : IRequestHandler<AdvertisementCreateUpdateCommand, AdvertisementViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly IImageHostingService _imageService = imageService;

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
            Address = request.WardName + ", " + request.DistrictName + ", " + request.ProvinceName,
            Description = request.Description,
            Cost = request.Cost,
            Area = request.Area,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            MaxOccupants = request.MaxOccupants,
            Status = 0,
            Type = request.Type,
            CreatedAt = DateTime.UtcNow,
            UserId = request.UserId,
        };

        _unitOfWork.AdvertisementRepository.Add(entity);

        await _unitOfWork.SaveChangesAsync();

        foreach (var image in request.Images)
        {
            string imageUrl = await _imageService.UploadImageAsync(image);

            var entityAdvertisementImage = new AdvertisementImage
            {
                AdvertisementId = entity.Id,
                ImagePath = imageUrl
            };

            _unitOfWork.AdvertisementImageRepository.Add(entityAdvertisementImage);
        }

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
        
        entity.Address = request.WardName + ", " + request.DistrictName + ", " + request.ProvinceName;

        _unitOfWork.AdvertisementRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update Advertisement failed");
        }

        return _mapper.Map<AdvertisementViewModel>(entity);
    }
}
