using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetByRoomIdQueryHandler(IUnitOfWorks unitOfWork, IMapper mapper) : IRequestHandler<InvoiceGetByRoomIdQuery, IEnumerable<InvoiceListViewModel>>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<InvoiceListViewModel>> Handle(InvoiceGetByRoomIdQuery request, CancellationToken cancellationToken)
    {
        var queryRoom = await _unitOfWork.RoomRepository.GetByIdAsync(request.RoomId);
        if(queryRoom == null)
        {
            throw new Exception("Not found Room");
        }

        var queryInvoice = _unitOfWork.InvoiceRepository.GetQuery(r => r.RoomId == request.RoomId);
        
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
