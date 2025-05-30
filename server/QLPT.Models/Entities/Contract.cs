using System;

namespace QLPT.Models.Entities;

public class Contract
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = default!;

    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public double DepositAmount { get; set; }

    public int Status { get; set; }

    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<ContractTenant> ContractTenants { get; set; } = new List<ContractTenant>();
}
