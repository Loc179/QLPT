using System;

namespace QLPT.Business.Services;

public class SendEmailRequest
{
    public string email { get; set; } = default!;
    public string subject { get; set; } = default!;
    public string body { get; set; } = default!;
}
