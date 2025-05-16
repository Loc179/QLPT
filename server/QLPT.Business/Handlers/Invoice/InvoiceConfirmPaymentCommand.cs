using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class InvoiceConfirmPaymentCommand : IRequest<bool>
{
    public string InvoiceCode { get; set; } = null!;
}
