using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;
using QLPT.Data.Repositories;
using QLPT.Models.Entities;

namespace QLPT.Data.UnitOfWorks;

public class UnitOfWorks(QlptDbContext context) : IUnitOfWorks
{
    private readonly QlptDbContext _context = context;
    private bool _disposed = false;

    public QlptDbContext context => _context;

    public IGenericRepository<RefreshToken> RefreshTokenRepository => new GenericRepository<RefreshToken>(_context);

    private IGenericRepository<Advertisement>? _advertisement;
    public IGenericRepository<Advertisement> AdvertisementRepository => _advertisement ??= new GenericRepository<Advertisement>(_context);

    private IGenericRepository<AdvertisementImage>? _advertisementImage;
    public IGenericRepository<AdvertisementImage> AdvertisementImageRepository => _advertisementImage ??= new GenericRepository<AdvertisementImage>(_context);

    private IGenericRepository<House>? _house;
    public IGenericRepository<House> HouseRepository => _house ??= new GenericRepository<House>(_context);

    private IGenericRepository<Invoice>? _invoice;
    public IGenericRepository<Invoice> InvoiceRepository => _invoice ??= new GenericRepository<Invoice>(_context);

    private IGenericRepository<Room>? _room;
    public IGenericRepository<Room> RoomRepository => _room ??= new GenericRepository<Room>(_context);

    private IGenericRepository<RoomService>? _roomService;
    public IGenericRepository<RoomService> RoomServiceRepository => _roomService ??= new GenericRepository<RoomService>(_context);

    private IGenericRepository<ServicePackage>? _servicePackage;
    public IGenericRepository<ServicePackage> ServicePackageRepository => _servicePackage ??= new GenericRepository<ServicePackage>(_context);

    private IGenericRepository<SupportRequest>? _supportRequest;
    public IGenericRepository<SupportRequest> SupportRequestRepository => _supportRequest ??= new GenericRepository<SupportRequest>(_context);

    private IGenericRepository<Tenant>? _tenant;
    public IGenericRepository<Tenant> TenantRepository => _tenant ??= new GenericRepository<Tenant>(_context);

    private IGenericRepository<Contract>? _contract;
    public IGenericRepository<Contract> ContractRepository => _contract ??= new GenericRepository<Contract>(_context);

    private IGenericRepository<ContractTenant>? _contractTenant;
    public IGenericRepository<ContractTenant> ContractTenantRepository => _contractTenant ??= new GenericRepository<ContractTenant>(_context);

    private IGenericRepository<ServicePackageInvoice>? _servicePackageInvoice;
    public IGenericRepository<ServicePackageInvoice> ServicePackageInvoiceRepository => _servicePackageInvoice ??= new GenericRepository<ServicePackageInvoice>(_context);

    private IGenericRepository<User>? _userRepository;
    public IGenericRepository<User> UserRepository => _userRepository ??= new GenericRepository<User>(_context);

    private IGenericRepository<Role>? _roleRepository;
    public IGenericRepository<Role> RoleRepository => _roleRepository ??= new GenericRepository<Role>(_context);

    private IGenericRepository<ResetPasswordToken>? _resetPasswordTokenRepository;
    public IGenericRepository<ResetPasswordToken> ResetPasswordTokenRepository => _resetPasswordTokenRepository ??= new GenericRepository<ResetPasswordToken>(_context);

    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitTransactionAsync()
    {
        await _context.Database.CommitTransactionAsync();
    }

    protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                _disposed = true;
            }
        }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public IGenericRepository<T> GenericRepository<T>() where T : class
    {
        return new GenericRepository<T>(_context);
    }

    public async Task RollbackTransactionAsync()
    {
        await _context.Database.RollbackTransactionAsync();
    }

    public int SaveChanges()
    {
        return _context.SaveChanges();
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    ~UnitOfWorks()
    {
        Dispose(false);
    }
}
