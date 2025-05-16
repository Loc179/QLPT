using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceGetByHouseIdQuery :IRequest<IEnumerable<InvoiceListViewModel>>
{
    public int HouseId { get; set; }
}
