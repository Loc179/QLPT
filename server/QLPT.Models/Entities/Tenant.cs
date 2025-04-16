using System;

namespace QLPT.Models.Entities;

public class Tenant
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsRepresentative { get; set; }

    public int RoomId { get; set; }
    public Room Room { get; set; } = default!;
}
