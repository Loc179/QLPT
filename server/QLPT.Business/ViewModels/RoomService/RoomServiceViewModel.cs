using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class RoomServiceViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Cost { get; set; }
    public int Unit { get; set; } // e.g., per month
    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
}
