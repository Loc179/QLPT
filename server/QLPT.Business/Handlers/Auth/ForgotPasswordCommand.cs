using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class ForgotPasswordCommand : IRequest
{
    public required string Email { get; set; }
}
