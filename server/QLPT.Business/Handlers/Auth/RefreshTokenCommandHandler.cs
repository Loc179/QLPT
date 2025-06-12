using System;
using System.IdentityModel.Tokens.Jwt;
using MediatR;
using QLPT.Business.Services;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RefreshTokenCommandHandler(ITokenService tokenService, IUnitOfWorks unitOfWorks) : IRequestHandler<RefreshTokenCommand, string>
{
    private readonly ITokenService _tokenService = tokenService;
    private readonly IUnitOfWorks _unitOfWorks = unitOfWorks;

    public async Task<string> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var tokenEntity = _unitOfWorks.RefreshTokenRepository.GetQuery().FirstOrDefault(rt => rt.Token == request.RefreshToken);
        if (tokenEntity == null)
        {
            throw new ArgumentException("Invalid refresh token");
        }

        var newAccessToken = await _tokenService.GenerateAccessTokenAsync(tokenEntity.UserId);
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(newAccessToken);
    }
}
