using System;
using QLPT.Business.ViewModels.SupportRequest;

namespace QLPT.Business.Handlers;

public class SupportRequestCreateUpdateCommand : BaseCreateUpdateCommand<SupportRequestViewModel>
{
    public string Content { get; set; } = string.Empty;
    public string? AdminReply { get; set; }
    public int Status { get; set; } = 0;

    public int UserId { get; set; }
}
