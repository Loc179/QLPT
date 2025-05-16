using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceGetByUserIdQuery : IRequest<IEnumerable<InvoiceListViewModel>>
{
    public int UserId { get; set; }
}
