using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class InvoiceExportExcelCommand : IRequest<byte[]>
{
    public string? Keyword { get; set; }
    public bool? IsPad { get; set; }
    public int? HouseId { get; set; }
    public int? RoomId { get; set; }
    public int UserId { get; set; }
}
