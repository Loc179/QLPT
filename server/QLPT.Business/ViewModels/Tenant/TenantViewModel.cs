using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class TenantViewModel
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsRepresentative { get; set; }

    public int RoomId { get; set; }
    public int RoomNumber { get; set; }

    public int HouseId { get; set; }
    public string HouseName { get; set; } = string.Empty;
}
