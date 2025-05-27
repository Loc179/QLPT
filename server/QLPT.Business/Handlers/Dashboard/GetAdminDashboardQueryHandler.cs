using System;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.DTO;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class GetAdminDashboardQueryHandler(IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<GetAdminDashboardQuery, AdminDashboardDto>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<AdminDashboardDto> Handle(GetAdminDashboardQuery request, CancellationToken cancellationToken)
    {
        // Tổng số chủ trọ
        var totalLandlords = await _unitOfWork.UserRepository.GetQuery()
            .Include(u => u.UserRoles)
            .Where(u => u.UserRoles.Any(r => r.RoleId == 2))
            .CountAsync(cancellationToken);

        // Tổng số quảng cáo
        var totalAds = await _unitOfWork.AdvertisementRepository.GetQuery(ad => ad.Status == 1)
            .CountAsync(cancellationToken);

        // Tổng doanh thu hệ thống (các giao dịch thành công)
        var totalRevenue = await _unitOfWork.ServicePackageInvoiceRepository.GetQuery()
            .SumAsync(p => p.Amount, cancellationToken);

        // Doanh thu theo tháng
        var revenueByMonthRaw = await _unitOfWork.ServicePackageInvoiceRepository.GetQuery()
            .GroupBy(p => new { p.PaymentDate.Year, p.PaymentDate.Month })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                Revenue = g.Sum(p => p.Amount)
            })
            .OrderBy(x => x.Year).ThenBy(x => x.Month)
            .ToListAsync(cancellationToken);

        // Format lại sau khi đã lấy dữ liệu về memory
        var revenueByMonth = revenueByMonthRaw
            .Select(g => new MonthlyRevenueDto
            {
                Month = $"{g.Month:D2}/{g.Year}",
                Revenue = (decimal)g.Revenue
            })
            .ToList();

        return new AdminDashboardDto
        {
            TotalLandlords = totalLandlords,
            TotalAds = totalAds,
            TotalRevenue = (decimal)totalRevenue,
            MonthlyRevenue = revenueByMonth
        };
    }
}
