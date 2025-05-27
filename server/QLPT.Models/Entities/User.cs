using System;
using Microsoft.AspNetCore.Identity;

namespace QLPT.Models.Entities;

public class User : IdentityUser<int>
{
    public string FullName { get; set; } = string.Empty;
    public int Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public int? ServicePackageId { get; set; }
    public ServicePackage? ServicePackage { get; set; }

    public ICollection<SupportRequest> SupportRequests { get; set; } = new List<SupportRequest>();
    public ICollection<Advertisement> Advertisements { get; set; } = new List<Advertisement>();
    public ICollection<House> Houses { get; set; } = new List<House>();
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
