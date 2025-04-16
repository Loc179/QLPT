using System;

namespace QLPT.Models.Entities;

public class SupportRequest
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? AdminReply { get; set; }
    public int Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = default!;
}
