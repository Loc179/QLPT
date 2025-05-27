using System;
using MediatR;
using QLPT.Business.DTO;

namespace QLPT.Business.Handlers;

public class GetStatsQuery : IRequest<DashboardStatsDto>
{
    public int UserId { get; set; }
    public int Quarter { get; set; }
    public int Year { get; set; }
}
