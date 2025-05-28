using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceGetByUserIdQuery : BaseGetAllQuery<InvoiceListViewModel>
{
    public int UserId { get; set; }
}
