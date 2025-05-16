using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceGetByRoomIdQuery : IRequest<IEnumerable<InvoiceListViewModel>>
{
    public int RoomId { get; set; }
}
