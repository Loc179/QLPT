using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceGetAllQuery, IEnumerable<InvoiceListViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<InvoiceListViewModel>> Handle(InvoiceGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.InvoiceRepository.GetQuery();

        var result = await query.Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable()
            .ToListAsync();

        return _mapper.Map<IEnumerable<InvoiceListViewModel>>(result);
    }
}
