using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementGetByIdQuery, AdvertisementViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<AdvertisementViewModel> Handle(AdvertisementGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.AdvertisementRepository.GetQuery(r => r.Id == request.Id)
            .Include(ad => ad.User)
            .Include(i => i.Images);

        var result = await query.FirstOrDefaultAsync();

        return _mapper.Map<AdvertisementViewModel>(result);
    }
}
