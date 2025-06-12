using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class RefreshTokenCommand : IRequest<string>
{
    public string RefreshToken { get; set; } = string.Empty;
}
