using System;

namespace QLPT.Models.Entities;

public class Room
{
    public int Id { get; set; }
    public int RoomNumber { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int MaxOccupants { get; set; }
    public int OccupancyStatus { get; set; }
    public DateTime CreatedAt { get; set; }

    public int HouseId { get; set; }
    public House House { get; set; } = default!;

    public ICollection<Tenant> Tenants { get; set; } = new List<Tenant>();
    public ICollection<RoomService> RoomServices { get; set; } = new List<RoomService>();
    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}
