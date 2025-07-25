﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QLPT.Models.Entities;

namespace QLPT.Data;

public class QlptDbContext : IdentityDbContext<
    User, Role, int,
    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
    IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public QlptDbContext(DbContextOptions<QlptDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserRole>(ur =>
        {
            ur.HasKey(x => new { x.UserId, x.RoleId });

            ur.HasOne(x => x.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(x => x.UserId);

            ur.HasOne(x => x.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(x => x.RoleId);
        });

        builder.Entity<ContractTenant>(ct =>
        {
            ct.HasKey(ct => new { ct.ContractId, ct.TenantId });

            ct.HasOne(ct => ct.Contract)
                .WithMany(c => c.ContractTenants)
                .HasForeignKey(ct => ct.ContractId)
                .OnDelete(DeleteBehavior.Cascade);

            ct.HasOne(ct => ct.Tenant)
                .WithMany(t => t.ContractTenants)
                .HasForeignKey(ct => ct.TenantId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }


    public DbSet<Advertisement> Advertisements { get; set; }
    public DbSet<AdvertisementImage> AdvertisementImages { get; set; }
    public DbSet<SupportRequest> SupportRequests { get; set; }
    public DbSet<ServicePackage> ServicePackages { get; set; }
    public DbSet<House> Houses { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<RoomService> RoomServices { get; set; }
    public DbSet<ServicePackageInvoice> ServicePackageInvoices { get; set; }
    public DbSet<Contract> Contracts { get; set; }
    public DbSet<ContractTenant> ContractTenants { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<ResetPasswordToken> ResetPasswordTokens { get; set; }

}
