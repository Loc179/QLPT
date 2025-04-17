using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class AdvertisementImageViewModel
{
    public int Id { get; set; }
    public string ImagePath { get; set; } = string.Empty;

    public int AdvertisementId { get; set; }
}
