using System;

namespace QLPT.Models.Entities;

public class Invoice
{
    public int Id { get; set; }
    public double Total { get; set; }
    public double TaxRate { get; set; } = 0.1;
    public double TaxAmount { get; set; }
    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
    public Room Room { get; set; } = default!;
}
