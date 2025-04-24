using System;
using QLPT.Business.ViewModels.ServicePackage;

namespace QLPT.Business.Handlers;

public class ServicePackageCreateUpdateCommand : BaseCreateUpdateCommand<ServicePackageViewModel>
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Duration { get; set; } // in days
    public double Price { get; set; }
    public DateTime CreatedAt { get; set; }
}
