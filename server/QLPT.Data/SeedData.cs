using System;
using Microsoft.AspNetCore.Identity;
using QLPT.Models.Entities;

namespace QLPT.Data;

public static class SeedData
{
    public static async Task SeedAsync(QlptDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        // Create transaction
		using var transaction = await context.Database.BeginTransactionAsync();

        // === Seed Roles ===
        var roles = new[] { "Admin", "User" };
        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new Role { Name = roleName });
            }
        }

        // === Seed Admin User ===
        var adminEmail = "admin@gmail.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser == null)
        {
            adminUser = new User
            {
                UserName = "admin",
                Email = adminEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(adminUser, "Admin@123");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }

        await context.SaveChangesAsync();

        await transaction.CommitAsync();
    }
}