using System;
using MediatR;

namespace QLPT.Business.Handlers.Auth;

public class RegisterAndPayCommand : IRequest<string>
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public int ServicePackageId { get; set; }
}
