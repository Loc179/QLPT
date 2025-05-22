using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementFilterQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementFilterQuery, IEnumerable<AdvertisementViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<AdvertisementViewModel>> Handle(AdvertisementFilterQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.AdvertisementRepository.GetQuery(ad => ad.Status == 1);

        if (!string.IsNullOrWhiteSpace(request.Address))
        {
            query = query.Where(ad => ad.Address.Contains(request.Address));
        }

        if (request.AreaMin.HasValue)
        {
            query = query.Where(ad => ad.Area >= request.AreaMin.Value);
        }

        if (request.AreaMax.HasValue)
        {
            query = query.Where(ad => ad.Area <= request.AreaMax.Value);
        }

        if (request.PriceMin.HasValue)
        {
            query = query.Where(ad => ad.Cost >= request.PriceMin.Value);
        }

        if (request.PriceMax.HasValue)
        {
            query = query.Where(ad => ad.Cost <= request.PriceMax.Value);
        }

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<AdvertisementViewModel>>(result);
    }
}
