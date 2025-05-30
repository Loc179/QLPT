using System;

namespace QLPT.Business.ViewModels;

public class ContractViewModel
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }

    public double DepositAmount { get; set; }

    public int Status { get; set; }

    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int TenantId { get; set; }

    public string TenantName { get; set; } = string.Empty;
}
