using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomCreateUpdateCommand : BaseCreateUpdateCommand<RoomViewModel>
{
    public int RoomNumber { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int MaxOccupants { get; set; }
    public int OccupancyStatus { get; set; }
    public DateTime CreatedAt { get; set; }

    public int HouseId { get; set; }
}
