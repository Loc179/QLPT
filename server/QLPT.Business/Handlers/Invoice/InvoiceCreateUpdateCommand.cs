using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class InvoiceCreateUpdateCommand : BaseCreateUpdateCommand<InvoiceViewModel>
{
    public double Total { get; set; }
    
    public double TaxRate { get; set; } = 0.1;

    public double TaxAmount { get; set; }

    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
}
