using System;

namespace QLPT.Models.Entities;

public class Advertisement
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Cost { get; set; }
    public double Area { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int MaxOccupants { get; set; }
    public int Status { get; set; }
    public int Type { get; set; } // Type of ad
    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = default!;

    public ICollection<AdvertisementImage> Images { get; set; } = new List<AdvertisementImage>();
}
