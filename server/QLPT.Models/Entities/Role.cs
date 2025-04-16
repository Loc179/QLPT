using System;
using Microsoft.AspNetCore.Identity;

namespace QLPT.Models.Entities;

public class Role : IdentityRole<int>
{
    // Navigation
	public ICollection<IdentityUserRole<int>> UserRoles { get; set; } = new List<IdentityUserRole<int>>();
}
