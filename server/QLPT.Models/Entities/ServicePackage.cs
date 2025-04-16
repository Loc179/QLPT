using System;

namespace QLPT.Models.Entities;

public class ServicePackage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Duration { get; set; } // in days
    public double Price { get; set; }
    public DateTime CreatedAt { get; set; }

    public ICollection<User> Users { get; set; } = new List<User>();
}
