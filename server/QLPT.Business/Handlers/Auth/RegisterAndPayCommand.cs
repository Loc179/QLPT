using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class RegisterAndPayCommand : IRequest<string>
{
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public int ServicePackageId { get; set; }
}
