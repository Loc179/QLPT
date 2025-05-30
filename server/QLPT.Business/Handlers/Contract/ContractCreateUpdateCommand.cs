using System;
using System.Diagnostics.Contracts;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class ContractCreateUpdateCommand : BaseCreateUpdateCommand<ContractRequestViewModel>
{
    public int UserId { get; set; }
    public List<int> TenantIds { get; set; } = new List<int>();
    public List<string> TenantNames { get; set; } = new List<string>();
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public double DepositAmount { get; set; }
    public int Status { get; set; }
    public string? Notes { get; set; }
    public DateTime? CreatedAt { get; set; }
}
