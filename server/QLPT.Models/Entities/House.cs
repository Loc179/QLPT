using System;

namespace QLPT.Models.Entities;

public class House
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int TotalRooms { get; set; }
    public int Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }

    public ICollection<Room> Rooms { get; set; } = new List<Room>();
}
