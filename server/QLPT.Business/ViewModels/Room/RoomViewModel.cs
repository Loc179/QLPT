using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class RoomViewModel
{
    public int Id { get; set; }
    public int RoomNumber { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int MaxOccupants { get; set; }
    public int OccupancyStatus { get; set; }
    public DateTime CreatedAt { get; set; }

    public int HouseId { get; set; }
}
