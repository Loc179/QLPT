using System;
using AutoMapper;
using MediatR;
using QLPT.Business.Services;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class UploadAdvertisementImageCommandHandler(IUnitOfWorks unitOfWorks, IImageHostingService imageService) : IRequestHandler<UploadAdvertisementImageCommand, int>
{
    private readonly IUnitOfWorks _unitOfWorks = unitOfWorks;
    private readonly IImageHostingService _imageService = imageService;

    public async Task<int> Handle(UploadAdvertisementImageCommand request, CancellationToken cancellationToken)
    {
        // Upload ảnh lên Cloudinary
        string imageUrl = await _imageService.UploadImageAsync(request.Image);

        // Tạo bản ghi trong DB
        var entity = new AdvertisementImage
        {
            AdvertisementId = request.AdvertisementId,
            ImagePath = imageUrl
        };

        _unitOfWorks.AdvertisementImageRepository.Add(entity);
        await _unitOfWorks.SaveChangesAsync();

        return entity.Id;
    }
}
