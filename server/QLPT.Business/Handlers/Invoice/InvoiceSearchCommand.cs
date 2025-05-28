using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceSearchCommand : BaseGetAllQuery<InvoiceListViewModel>
{
    public string? Keyword { get; set; }
    public bool? IsPad { get; set; }
    public int? HouseId { get; set; }
    public int? RoomId { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public int UserId { get; set; }
}
