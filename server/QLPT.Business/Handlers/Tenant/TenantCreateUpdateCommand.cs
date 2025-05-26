using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantCreateUpdateCommand : BaseCreateUpdateCommand<TenantViewModel>
{
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsRepresentative { get; set; }

    public int RoomId { get; set; }
}
