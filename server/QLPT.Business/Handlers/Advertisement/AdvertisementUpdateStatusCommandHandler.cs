using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementUpdateStatusCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementUpdateStatusCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(AdvertisementUpdateStatusCommand request, CancellationToken cancellationToken)
    {
        var advertisement = await _unitOfWork.AdvertisementRepository.GetByIdAsync(request.Id);

        if (advertisement == null)
        {
            throw new Exception("Advertisement not found!");
        }

        advertisement.Status = request.Status;

        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
