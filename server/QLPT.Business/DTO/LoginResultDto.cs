using System;

namespace QLPT.Business.DTO;

public class LoginResultDto
{
    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }

    public required UserInfo UserInfo { get; set; }

    public required DateTime ExpiresAt { get; set; }
}
