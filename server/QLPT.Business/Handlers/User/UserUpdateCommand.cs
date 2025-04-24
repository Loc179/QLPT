using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class UserUpdateCommand : IRequest<UserViewModel>
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? FullName { get; set; }
    public int? Status { get; set; }
    public int? ServicePackageId { get; set; }
}
