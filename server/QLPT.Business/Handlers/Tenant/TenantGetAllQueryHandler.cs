using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<TenantGetAllQuery, IEnumerable<TenantViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<TenantViewModel>> Handle(TenantGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.TenantRepository.GetQuery()
            .Include(r => r.Room)
            .ThenInclude(r => r.House)
            .AsNoTracking()
            .AsQueryable();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<TenantViewModel>>(result);
    }
}
