using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class HouseGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<HouseGetAllQuery, PaginatedResult<HouseViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<HouseViewModel>> Handle(HouseGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.HouseRepository.GetQuery();
        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<HouseViewModel>>(result);

        return new PaginatedResult<HouseViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
