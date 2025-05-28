using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceGetByHouseIdQuery : BaseGetAllQuery<InvoiceListViewModel>
{
    public int HouseId { get; set; }
}
