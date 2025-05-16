using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceGetByIdQuery, InvoiceListViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<InvoiceListViewModel> Handle(InvoiceGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.InvoiceRepository.GetQuery(i => i.Id == request.Id);

        var result = await query
            .Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable()
            .FirstOrDefaultAsync();

        return _mapper.Map<InvoiceListViewModel>(result);
    }
}
