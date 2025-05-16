using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class InvoicePaymentUrlCommand : IRequest<string>
{
    public string InvoiceCode { get; set; } = string.Empty;
    public double Total { get; set; }

    public DateTime CreateAt { get; set; }
    public int RoomId { get; set; }
}
