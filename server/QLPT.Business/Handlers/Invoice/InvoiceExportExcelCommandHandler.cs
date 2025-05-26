using System;
using System.ComponentModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceExportExcelCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceExportExcelCommand, byte[]>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<byte[]> Handle(InvoiceExportExcelCommand request, CancellationToken cancellationToken)
    {
        ExcelPackage.License.SetNonCommercialPersonal("Nguyen tat");

        var query = _unitOfWork.InvoiceRepository.GetQuery(); // IQueryable<Invoice>

        query = query.Where(i => i.Room.House.UserId == request.UserId);

        if (request.FromDate.HasValue)
        {
            query = query.Where(i => i.CreatedAt >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(i => i.CreatedAt <= request.ToDate.Value);
        }

        if (request.HouseId.HasValue)
        {
            query = query.Where(i => i.Room.HouseId == request.HouseId.Value);
        }

        if (request.RoomId.HasValue)
        {
            query = query.Where(i => i.RoomId == request.RoomId.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.Keyword))
        {
            var keyword = request.Keyword.Trim().ToLower();
            query = query.Where(i =>
                i.Room.Tenants.Any(t => t.FullName.ToLower().Contains(keyword)) ||
                i.Room.RoomNumber.ToString().Contains(keyword));
        }

        if (request.IsPad != null)
        {
            query = query.Where(i => i.IsPaid == request.IsPad);
        }

        var invoices = await query
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants)
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync(cancellationToken);

        using var package = new ExcelPackage();
        var sheet = package.Workbook.Worksheets.Add("Invoices");

        sheet.Cells[1, 1].Value = "Invoice Code";
        sheet.Cells[1, 2].Value = "Tenant Name";
        sheet.Cells[1, 3].Value = "Room Number";
        sheet.Cells[1, 4].Value = "Total Amount";
        sheet.Cells[1, 5].Value = "Create Date";
        sheet.Cells[1, 6].Value = "Payment Date";
        sheet.Cells[1, 7].Value = "Status";

        sheet.Row(1).Style.Font.Bold = true;

        int row = 2;
        foreach (var invoice in invoices)
        {
            sheet.Cells[row, 1].Value = invoice.InvoiceCode;
            sheet.Cells[row, 2].Value = invoice.Room?.Tenants?.FirstOrDefault(t => t.IsRepresentative)?.FullName;
            sheet.Cells[row, 3].Value = invoice.Room?.RoomNumber;
            sheet.Cells[row, 4].Value = invoice.Total;
            sheet.Cells[row, 5].Value = invoice.CreatedAt.ToString("dd/MM/yyyy");
            sheet.Cells[row, 6].Value = invoice.PaymentDate?.ToString("dd/MM/yyyy");
            sheet.Cells[row, 7].Value = invoice.IsPaid;
            row++;
        }

        sheet.Cells[sheet.Dimension.Address].AutoFitColumns();

        return await package.GetAsByteArrayAsync();
    }
}
