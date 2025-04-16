using System;

namespace QLPT.Models.Entities;

public class Invoice
{
    public int Id { get; set; }
    public double Total { get; set; }
    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
    public Room Room { get; set; } = default!;
}
