using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class ContractGetByUserIdQuery : BaseGetAllQuery<ContractViewModel>
{
    public int UserId { get; set; }
}
