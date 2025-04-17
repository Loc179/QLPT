using System;

namespace QLPT.Business.Services;

public interface IEmailService
{
    Task SendEmailAsync(string toEmail, string subject, string message);
}
