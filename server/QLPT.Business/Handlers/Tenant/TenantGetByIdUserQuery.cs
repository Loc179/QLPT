using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantGetByIdUserQuery : BaseGetAllQuery<TenantViewModel>
{
    public int UserId { get; set; }
}
