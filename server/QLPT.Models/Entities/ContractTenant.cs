using System;

namespace QLPT.Models.Entities;

public class ContractTenant
{
    public int ContractId { get; set; }
    public Contract Contract { get; set; } = default!;
    public int TenantId { get; set; }
    public Tenant Tenant { get; set; } = default!;
}
