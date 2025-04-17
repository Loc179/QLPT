using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Services;

public class TokenService(IConfiguration configuration, IUnitOfWorks unitOfWorks, UserManager<User> userManager) : ITokenService
{
    private readonly IConfiguration _configuration = configuration;

    private readonly IUnitOfWorks _unitOfWorks = unitOfWorks;

    private readonly UserManager<User> _userManager = userManager;

    public async Task<JwtSecurityToken> GenerateAccessTokenAsync(int userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.NameId, user!.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var roles = await _userManager.GetRolesAsync(user);

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role ?? string.Empty)));

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:ValidIssuer"],
            audience: _configuration["Jwt:ValidAudience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpirationInMinutes"])),
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

		return token;
    }

    public async Task<RefreshToken> GenerateRefreshTokenAsync(int userId)
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        var token = Convert.ToBase64String(randomBytes);

        var duration = Convert.ToDouble(_configuration["Jwt:RefreshDuration"]!);

        var refreshToken = new RefreshToken
        {
            Token = token,
            UserId = userId,
            ExpiryDate = DateTime.Now.AddDays(duration)
        };
        
        _unitOfWorks.RefreshTokenRepository.Add(refreshToken);
        await _unitOfWorks.SaveChangesAsync();

        return refreshToken;
    }
}
