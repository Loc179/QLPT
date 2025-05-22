using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByStatusQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementGetByStatusQuery, IEnumerable<AdvertisementViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<AdvertisementViewModel>> Handle(AdvertisementGetByStatusQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.AdvertisementRepository.GetQuery(r => r.Status == request.Status)
            .Include(ad => ad.User)
            .Include(i => i.Images);

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<AdvertisementViewModel>>(result);
    }
}
