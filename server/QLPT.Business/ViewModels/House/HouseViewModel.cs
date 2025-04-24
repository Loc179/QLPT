using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class HouseViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int TotalRooms { get; set; }
    public int Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public int UserId { get; set; }
}
