using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels.SupportRequest;

public class SupportRequestViewModel
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? AdminReply { get; set; }
    public int Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }
}
