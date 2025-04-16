using System;

namespace QLPT.Models.Entities;

public class AdvertisementImage
{
    public int Id { get; set; }
    public string ImagePath { get; set; } = string.Empty;

    public int AdvertisementId { get; set; }
    public Advertisement Advertisement { get; set; } = default!;
}
