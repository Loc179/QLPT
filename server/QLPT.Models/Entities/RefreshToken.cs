using System;

namespace QLPT.Models.Entities;

public class RefreshToken
{
    public int Id { get; set; }
    public required string Token { get; set; }

    public DateTime ExpiryDate { get; set; }

    public int UserId { get; set; }
}
