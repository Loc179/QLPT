using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantGetByIdHouseQuery : BaseGetAllQuery<TenantViewModel>
{
    public int HouseId { get; set; }
}
