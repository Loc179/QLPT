using System;
using QLPT.Models.Entities;

namespace QLPT.Business.ViewModels;

public class AdvertisementViewModel
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double Cost { get; set; }
    public double Area { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int MaxOccupants { get; set; }
    public int Status { get; set; }
    public int Type { get; set; } // Type of ad
    public DateTime CreatedAt { get; set; }

    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Fullname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phonenumber { get; set; } = string.Empty;

    public List<string> imagesPath { get; set; } = [];

}
