using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class AdvertisementFilterQuery : BaseGetAllQuery<AdvertisementViewModel>
{
    public string Address { get; set; } = string.Empty;
    public int AreaMin { get; set; }
    public int AreaMax { get; set; }
    public double PriceMin { get; set; }
    public double PriceMax { get; set; }
}
