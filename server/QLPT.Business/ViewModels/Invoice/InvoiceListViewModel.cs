using System;

namespace QLPT.Business.ViewModels;

public class InvoiceListViewModel
{
    public int Id { get; set; }
    public string InvoiceCode { get; set; } = default!;
    public double Total { get; set; }
    public double TaxRate { get; set; }
    public double TaxAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsPaid { get; set; } = false;
    public DateTime? PaymentDate { get; set; }
    public int RoomId { get; set; }
    public int RoomNumber { get; set; }
    public int HouseId { get; set; }
    public string HouseName { get; set; } = default!;
    public int TenantId { get; set; }
    public string TenantName { get; set; } = default!;
    public string TenantPhoneNumber { get; set; } = default!;
}
