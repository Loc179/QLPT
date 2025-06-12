using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class ResetPasswordCommand : IRequest<string>
{
    public required string Token { get; set; }

    public required string NewPassword { get; set; }

    public required string ConfirmNewPassword { get; set; }
}
