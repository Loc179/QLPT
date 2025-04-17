using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels.ServicePackage;

public class ServicePackageViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Duration { get; set; } // in days
    public double Price { get; set; }
    public DateTime CreatedAt { get; set; }
}
