using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantGetByIdHouseQuery : IRequest<IEnumerable<TenantViewModel>>
{
    public int HouseId { get; set; }
}
