using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceSearchCommand : IRequest<IEnumerable<InvoiceViewModel>>
{
    public string? Keyword { get; set; }
    public bool? IsPad { get; set; }
    public int? HouseId { get; set; }
    public int? RoomId { get; set; }
    public int UserId { get; set; }
}
