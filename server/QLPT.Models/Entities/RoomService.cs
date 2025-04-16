using System;

namespace QLPT.Models.Entities;

public class RoomService
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Cost { get; set; }
    public int Unit { get; set; } // e.g., per month
    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
    public Room Room { get; set; } = default!;
}
