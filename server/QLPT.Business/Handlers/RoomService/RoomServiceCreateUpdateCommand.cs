using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomServiceCreateUpdateCommand : BaseCreateUpdateCommand<RoomServiceViewModel>
{
    public string Name { get; set; } = string.Empty;
    public double Cost { get; set; }
    public int Unit { get; set; } // e.g., per month
    public DateTime CreatedAt { get; set; }

    public int RoomId { get; set; }
}
