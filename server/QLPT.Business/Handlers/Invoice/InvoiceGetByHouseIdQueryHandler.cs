using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetByHouseIdQueryHandler(IUnitOfWorks unitOfWork, IMapper mapper) : IRequestHandler<InvoiceGetByHouseIdQuery, IEnumerable<InvoiceListViewModel>>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<InvoiceListViewModel>> Handle(InvoiceGetByHouseIdQuery request, CancellationToken cancellationToken)
    {
        var queryHouse = await _unitOfWork.HouseRepository.GetByIdAsync(request.HouseId);
        if(queryHouse == null)
        {
            throw new Exception("Not found House");
        }

        var queryInvoice = _unitOfWork.InvoiceRepository.GetQuery(r => r.Room.HouseId == request.HouseId);
        
        var result = await queryInvoice
            .Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable()
            .ToListAsync();

        return _mapper.Map<IEnumerable<InvoiceListViewModel>>(result);
    }
}