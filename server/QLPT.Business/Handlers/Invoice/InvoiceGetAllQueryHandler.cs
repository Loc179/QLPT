using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceGetAllQuery, PaginatedResult<InvoiceListViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<InvoiceListViewModel>> Handle(InvoiceGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.InvoiceRepository.GetQuery();

        var queryInvoices = query.Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable();

        int total = await queryInvoices.CountAsync(cancellationToken);
        var result = await queryInvoices.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<InvoiceListViewModel>>(result);

        return new PaginatedResult<InvoiceListViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
