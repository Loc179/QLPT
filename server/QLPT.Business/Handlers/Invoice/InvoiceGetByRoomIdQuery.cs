using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceGetByRoomIdQuery : BaseGetAllQuery<InvoiceListViewModel>
{
    public int RoomId { get; set; }
}
