using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class InvoiceViewModel
{
    public int Id { get; set; }
    public double Total { get; set; }
    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
}
