using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantGetByIdHouseQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<TenantGetByIdHouseQuery, PaginatedResult<TenantViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<TenantViewModel>> Handle(TenantGetByIdHouseQuery request, CancellationToken cancellationToken)
    {
        var queryHouse = await _unitOfWork.HouseRepository.GetByIdAsync(request.HouseId);
        if(queryHouse == null)
        {
            throw new Exception("Not found House");
        }

        var queryTenant = _unitOfWork.TenantRepository.GetQuery(r => r.Room.HouseId == request.HouseId)
            .Include(r => r.Room)
            .ThenInclude(r => r.House)
            .AsNoTracking()
            .AsQueryable();
        
        int total = await queryTenant.CountAsync(cancellationToken);
        var result = await queryTenant.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<TenantViewModel>>(result);

        return new PaginatedResult<TenantViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
