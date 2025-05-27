using System;

namespace QLPT.Business.DTO;

public class AdminDashboardDto
{
    public int TotalLandlords { get; set; }
    public int TotalAds { get; set; }
    public decimal TotalRevenue { get; set; }

    public List<MonthlyRevenueDto> MonthlyRevenue { get; set; } = new();
}
