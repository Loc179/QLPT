using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class InvoiceViewModel
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
}
