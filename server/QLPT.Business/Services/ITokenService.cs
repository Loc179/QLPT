using System;
using System.IdentityModel.Tokens.Jwt;
using QLPT.Models.Entities;

namespace QLPT.Business.Services;

public interface ITokenService
{
    Task<JwtSecurityToken> GenerateAccessTokenAsync(int userId);

    Task<RefreshToken> GenerateRefreshTokenAsync(int userId);
}
