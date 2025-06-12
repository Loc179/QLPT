using System;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantExportExcelCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<TenantExportExcelCommand, byte[]>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<byte[]> Handle(TenantExportExcelCommand request, CancellationToken cancellationToken)
    {
        ExcelPackage.License.SetNonCommercialPersonal("Nguyen tat");

        var query = _unitOfWork.TenantRepository.GetQuery(t => t.Room.House.UserId == request.UserId);
        if (request.HouseId.HasValue)
        {
            query = query.Where(t => t.Room.HouseId == request.HouseId.Value);
        }
        if (request.RoomId.HasValue)
        {
            query = query.Where(t => t.RoomId == request.RoomId.Value);
        }
        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }
        if (!string.IsNullOrWhiteSpace(request.Keyword))
        {
            var keyword = request.Keyword.Trim().ToLower();
            query = query.Where(t => t.FullName.ToLower().Contains(keyword) || t.PhoneNumber.Contains(keyword) ||
                t.Email.ToLower().Contains(keyword) || t.Room.RoomNumber.ToString().Contains(keyword));
        }
        var tenants = await query
            .Include(t => t.Room)
            .ThenInclude(r => r.House)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync(cancellationToken);

        using var package = new ExcelPackage();
        var sheet = package.Workbook.Worksheets.Add("Tenants");

        sheet.Cells[1, 1].Value = "Id";
        sheet.Cells[1, 2].Value = "Tenant Name";
        sheet.Cells[1, 3].Value = "Room Number";
        sheet.Cells[1, 4].Value = "House Name";
        sheet.Cells[1, 5].Value = "Phone Number";
        sheet.Cells[1, 6].Value = "Email";
        sheet.Cells[1, 7].Value = "Status";

        sheet.Row(1).Style.Font.Bold = true;

        int row = 2;
        foreach (var tenant in tenants)
        {
            sheet.Cells[row, 1].Value = tenant.Id;
            sheet.Cells[row, 2].Value = tenant.FullName;
            sheet.Cells[row, 3].Value = tenant.Room?.RoomNumber;
            sheet.Cells[row, 4].Value = tenant.Room?.House?.Name;
            sheet.Cells[row, 5].Value = tenant.PhoneNumber;
            sheet.Cells[row, 6].Value = tenant.Email;
            sheet.Cells[row, 7].Value = tenant.Status;
            row++;
        }

        sheet.Cells[sheet.Dimension.Address].AutoFitColumns();

        return await package.GetAsByteArrayAsync();
    }
}
