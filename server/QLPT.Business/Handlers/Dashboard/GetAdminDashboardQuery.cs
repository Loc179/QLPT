using System;
using MediatR;
using QLPT.Business.DTO;

namespace QLPT.Business.Handlers;

public class GetAdminDashboardQuery : IRequest<AdminDashboardDto>
{
    public int? Month { get; set; }
    public int? Year { get; set; }
}
