using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantGetWithoutContract : BaseGetAllQuery<TenantViewModel>
{
    public int UserId { get; set; }
}
