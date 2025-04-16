using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QLPT.Models.Entities;

namespace QLPT.Data;

public class QlptDbContext : IdentityDbContext<User, Role, int>
{
    public QlptDbContext(DbContextOptions<QlptDbContext> options) : base(options)
    {
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


}
