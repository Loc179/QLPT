using System;
using MediatR;
using QLPT.Business.ViewModels.Tenant;

namespace QLPT.Business.Handlers;

public class TenantGetByIdUserQuery : IRequest<IEnumerable<TenantViewModel>>
{
    public int UserId { get; set; }
}
