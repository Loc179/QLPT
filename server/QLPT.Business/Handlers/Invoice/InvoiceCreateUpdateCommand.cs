using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceCreateUpdateCommand : BaseCreateUpdateCommand<InvoiceViewModel>
{
    public string InvoiceCode { get; set; } = default!;
    public double Total { get; set; }
    
    public double TaxRate { get; set; } = 0.1;
    

    public DateTime CreatedAt { get; set; }
    public bool IsPaid { get; set; } = false;
    public DateTime? PaymentDate { get; set; }

    public int RoomId { get; set; }
}
