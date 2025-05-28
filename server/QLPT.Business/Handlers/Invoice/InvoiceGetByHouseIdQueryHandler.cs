using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetByHouseIdQueryHandler(IUnitOfWorks unitOfWork, IMapper mapper) : IRequestHandler<InvoiceGetByHouseIdQuery, PaginatedResult<InvoiceListViewModel>>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly IMapper _mapper = mapper;

    public async Task<PaginatedResult<InvoiceListViewModel>> Handle(InvoiceGetByHouseIdQuery request, CancellationToken cancellationToken)
    {
        var queryHouse = await _unitOfWork.HouseRepository.GetByIdAsync(request.HouseId);
        if(queryHouse == null)
        {
            throw new Exception("Not found House");
        }

        var queryInvoice = _unitOfWork.InvoiceRepository.GetQuery(r => r.Room.HouseId == request.HouseId);
        
        var queryInvoices = queryInvoice
            .Include(i => i.Room)
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