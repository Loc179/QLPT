using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantSearchCommand : BaseGetAllQuery<TenantViewModel>
{
    public int UserId { get; set; }
    public string? keyword { get; set; }
}
