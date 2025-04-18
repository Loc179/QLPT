using System;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class HouseCreateUpdateCommand : BaseCreateUpdateCommand<HouseViewModel>
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int TotalRooms { get; set; }
    public int Status { get; set; }
}
