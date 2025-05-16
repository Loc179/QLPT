using System;
using Microsoft.AspNetCore.Http;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class AdvertisementCreateUpdateCommand : BaseCreateUpdateCommand<AdvertisementViewModel>
{
    public string Title { get; set; } = string.Empty;
    public string ProvinceName { get; set; } = string.Empty;
    public string DistrictName { get; set; } = string.Empty;
    public string WardName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Cost { get; set; }
    public double Area { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int MaxOccupants { get; set; }
    public int Status { get; set; }
    public int Type { get; set; }
    public int UserId { get; set; }
    public List<IFormFile>? Images { get; set; }
}
