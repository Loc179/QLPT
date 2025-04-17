using System;
using MediatR;
using QLPT.Business.DTO;

namespace QLPT.Business.Handlers.Auth;

public class LoginCommand : IRequest<LoginResultDto>
{
    public required string Username { get; set; }

    public required string Password { get; set; }
}
