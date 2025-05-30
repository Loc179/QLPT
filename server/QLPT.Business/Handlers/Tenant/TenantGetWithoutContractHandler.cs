using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantGetWithoutContractHandler(IUnitOfWorks unitOfWork, IMapper mapper) : IRequestHandler<TenantGetWithoutContract, PaginatedResult<TenantViewModel>>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly IMapper _mapper = mapper;

    public async Task<PaginatedResult<TenantViewModel>> Handle(TenantGetWithoutContract request, CancellationToken cancellationToken)
    {
        var tenantQuery = _unitOfWork.TenantRepository.GetQuery(t => t.Room.House.UserId == request.UserId)
            .Include(r => r.Room)
            .ThenInclude(r => r.House);

        var contractTenantQuery = _unitOfWork.ContractTenantRepository.GetQuery();
        var contractQuery = _unitOfWork.ContractRepository.GetQuery();

        var query = tenantQuery
            .Where(t =>
                !contractTenantQuery.Any(ct => ct.TenantId == t.Id) || // Chưa có hợp đồng nào
                contractTenantQuery
                    .Where(ct => ct.TenantId == t.Id)
                    .All(ct =>
                        contractQuery
                            .Where(c => c.Id == ct.ContractId)
                            .All(c => c.EndDate < DateTime.UtcNow)
                    )
            );

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var viewmodels = _mapper.Map<IEnumerable<TenantViewModel>>(items);

        return new PaginatedResult<TenantViewModel>(request.PageNumber, request.PageSize, totalCount, viewmodels);
    }
}
