using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetByRoomIdQueryHandler(IUnitOfWorks unitOfWork, IMapper mapper) : IRequestHandler<InvoiceGetByRoomIdQuery, PaginatedResult<InvoiceListViewModel>>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly IMapper _mapper = mapper;

    public async Task<PaginatedResult<InvoiceListViewModel>> Handle(InvoiceGetByRoomIdQuery request, CancellationToken cancellationToken)
    {
        var queryRoom = await _unitOfWork.RoomRepository.GetByIdAsync(request.RoomId);
        if(queryRoom == null)
        {
            throw new Exception("Not found Room");
        }

        var queryInvoice = _unitOfWork.InvoiceRepository.GetQuery(r => r.RoomId == request.RoomId);
        
        var query = queryInvoice
            .Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable();

        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<InvoiceListViewModel>>(result);

        return new PaginatedResult<InvoiceListViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
