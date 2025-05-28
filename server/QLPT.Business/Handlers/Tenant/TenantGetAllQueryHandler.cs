using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<TenantGetAllQuery, PaginatedResult<TenantViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<TenantViewModel>> Handle(TenantGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.TenantRepository.GetQuery()
            .Include(r => r.Room)
            .ThenInclude(r => r.House)
            .AsNoTracking()
            .AsQueryable();

        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<TenantViewModel>>(result);

        return new PaginatedResult<TenantViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
