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

        if (request.AreaMin > 0)
        {
            query = query.Where(ad => ad.Area >= request.AreaMin);
        }

        if (request.AreaMax >0)
        {
            query = query.Where(ad => ad.Area <= request.AreaMax);
        }

        if (request.PriceMin > 0)
        {
            query = query.Where(ad => ad.Cost >= request.PriceMin);
        }

        if (request.PriceMax > 0)
        {
            query = query.Where(ad => ad.Cost <= request.PriceMax);
        }

        var result = await query
            .Include(ad => ad.User)
            .Include(i => i.Images).ToListAsync();

        return _mapper.Map<IEnumerable<AdvertisementViewModel>>(result);
    }
}
