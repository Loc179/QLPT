using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByStatusQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementGetByStatusQuery, PaginatedResult<AdvertisementViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<AdvertisementViewModel>> Handle(AdvertisementGetByStatusQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.AdvertisementRepository.GetQuery(r => r.Status == request.Status)
            .Include(ad => ad.User)
            .Include(i => i.Images);

        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<AdvertisementViewModel>>(result);

        return new PaginatedResult<AdvertisementViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
