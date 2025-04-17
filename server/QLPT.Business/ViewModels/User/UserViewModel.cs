using System;

namespace QLPT.Business.ViewModels;

public class UserViewModel
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? FullName { get; set; }
    public DateTime CreatedAt { get; set; }
    public int Status { get; set; }
    public int ServicePackageId { get; set; }
}
