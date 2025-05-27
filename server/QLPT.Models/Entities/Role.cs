using System;
using Microsoft.AspNetCore.Identity;

namespace QLPT.Models.Entities;

public class Role : IdentityRole<int>
{
    // Navigation
	public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
