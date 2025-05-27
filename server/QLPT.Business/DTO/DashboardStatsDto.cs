using System;

namespace QLPT.Business.DTO;

public class DashboardStatsDto
{
    public List<string> Labels { get; set; } = new();
    public List<decimal> Revenues { get; set; } = new();
    public List<int> Tenants { get; set; } = new();
    public int RoomsOccupied { get; set; }
    public int RoomsVacant { get; set; }
}
