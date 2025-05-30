using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using QLPT.Data.Repositories;
using QLPT.Models.Entities;

namespace QLPT.Data.UnitOfWorks;

public interface IUnitOfWorks : IDisposable
{
    QlptDbContext context { get; }

    IGenericRepository<User> UserRepository { get; }
    IGenericRepository<Role> RoleRepository { get; }
    IGenericRepository<Advertisement> AdvertisementRepository { get; }
    
    IGenericRepository<AdvertisementImage> AdvertisementImageRepository { get; }

    IGenericRepository<House> HouseRepository { get; }

    IGenericRepository<Invoice> InvoiceRepository { get; }

    IGenericRepository<Room> RoomRepository { get; }

    IGenericRepository<RoomService> RoomServiceRepository { get; }

    IGenericRepository<ServicePackage> ServicePackageRepository { get; }
    IGenericRepository<ServicePackageInvoice> ServicePackageInvoiceRepository { get; }

    IGenericRepository<SupportRequest> SupportRequestRepository { get; }

    IGenericRepository<Tenant> TenantRepository { get; }
    IGenericRepository<Contract> ContractRepository { get; }
    IGenericRepository<ContractTenant> ContractTenantRepository { get; }

    IGenericRepository<RefreshToken> RefreshTokenRepository { get; }

    IGenericRepository<T> GenericRepository<T>() where T:class;

    int SaveChanges();

    Task<int> SaveChangesAsync();

    Task<IDbContextTransaction> BeginTransactionAsync();

    Task CommitTransactionAsync();

    Task RollbackTransactionAsync();
}
