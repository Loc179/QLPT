using System;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.DTO;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class GetStatsQueryHandler(IUnitOfWorks unitOfWork) : IRequestHandler<GetStatsQuery, DashboardStatsDto>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<DashboardStatsDto> Handle(GetStatsQuery request, CancellationToken cancellationToken)
    {
        var months = GetMonthsOfQuarter(request.Quarter);
        var year = request.Year;

        var labels = months.Select(m => $"Tháng {m}").ToList();

        // Doanh thu
        var revenues = new List<decimal>();
        foreach (var month in months)
        {
            var revenue = await _unitOfWork.InvoiceRepository.GetQuery(i => i.Room.House.UserId == request.UserId)
                .Where(i => i.PaymentDate.HasValue &&
                            i.PaymentDate.Value.Year == year &&
                            i.PaymentDate.Value.Month == month)
                .SumAsync(i => (decimal?)i.Total, cancellationToken) ?? 0;
            revenues.Add(revenue);
        }

        // Người thuê
        var tenants = new List<int>();
        foreach (var month in months)
        {
            var count = await _unitOfWork.TenantRepository.GetQuery(i => i.Room.House.UserId == request.UserId)
                .Where(t => t.CreatedAt.Year == year && t.CreatedAt.Month == month)
                .CountAsync(cancellationToken);
            tenants.Add(count);
        }

        // Tình trạng phòng
        var roomsOccupied = await _unitOfWork.RoomRepository.GetQuery(r => r.OccupancyStatus == 1 && r.House.UserId == request.UserId).CountAsync(cancellationToken);
        var roomsVacant = await _unitOfWork.RoomRepository.GetQuery(r => r.OccupancyStatus == 0 && r.House.UserId == request.UserId).CountAsync(cancellationToken);

        return new DashboardStatsDto
        {
            Labels = labels,
            Revenues = revenues,
            Tenants = tenants,
            RoomsOccupied = roomsOccupied,
            RoomsVacant = roomsVacant
        };
    }

    private List<int> GetMonthsOfQuarter(int quarter) => quarter switch
    {
        1 => new() { 1, 2, 3 },
        2 => new() { 4, 5, 6 },
        3 => new() { 7, 8, 9 },
        4 => new() { 10, 11, 12 },
        _ => throw new ArgumentOutOfRangeException(nameof(quarter), "Quý không hợp lệ.")
    };
}
