using System;
using AutoMapper;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementDeleteByIdHandler(IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementDeleteById, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(AdvertisementDeleteById request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.AdvertisementRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("Advertisement not found");
        }

        _unitOfWork.AdvertisementRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
