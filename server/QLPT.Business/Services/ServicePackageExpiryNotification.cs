using System;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Services;

public class ServicePackageExpiryNotification(IServiceProvider serviceProvider, ILogger<ServicePackageExpiryNotification> logger) : BackgroundService
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;
    private readonly ILogger<ServicePackageExpiryNotification> _logger = logger;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWorks>();
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();
                var vnPayService = scope.ServiceProvider.GetRequiredService<IVnPayService>();

                var today = DateTime.UtcNow.Date;

                var invoices = await unitOfWork.ServicePackageInvoiceRepository.GetQuery()
                    .Include(i => i.User)
                    .Where(i =>
                        i.PaymenNexttDate.Date > today && // chưa hết hạn
                        EF.Functions.DateDiffDay(today, i.PaymenNexttDate.Date) <= 3 // còn <= 3 ngày
                    )
                    .ToListAsync(stoppingToken);


                foreach (var invoice in invoices)
                {
                    var fakeContext = new DefaultHttpContext();
                    fakeContext.Connection.RemoteIpAddress = System.Net.IPAddress.Parse("127.0.0.1");


                    var invoiceInfo = new
                    {
                        invoice.UserId,
                    };

                    var json = System.Text.Json.JsonSerializer.Serialize(invoiceInfo);
                    var base64Data = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));

                    var paymentModel = new VnPaymentRequestModel
                    {
                        OrderInfo = base64Data,
                        ServicePackageId = invoice.User!.ServicePackageId,
                    };

                    string paymentUrl = vnPayService.CreatePaymentUrl(fakeContext, paymentModel, GetAmountByServiceId((int)invoice.User.ServicePackageId!), "http://localhost:4200/servicepackageinvoice");

                    var daysLeft = (invoice.PaymenNexttDate.Date - today).Days;
                    var userEmail = invoice.User?.Email;

                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        var subject = "Gói dịch vụ sắp hết hạn";
                        var body = $@"
                            <p>Chào {invoice.User.FullName},</p>
                            <p>Gói dịch vụ của bạn sẽ hết hạn trong <strong>{daysLeft} ngày</strong>, vào ngày <strong>{invoice.PaymenNexttDate:dd/MM/yyyy}</strong>.</p>
                            <p>Để tránh gián đoạn dịch vụ, vui lòng gia hạn sớm.</p>
                            <p>Bạn có thể tiến hành thanh toán tại đường dẫn sau:</p>
                            <p><a href=""{paymentUrl}"" style=""color: #1a73e8;"">👉 Nhấn vào đây để thanh toán</a></p>
                            <p>Trân trọng,<br/>Hệ thống quản lý phòng trọ</p>";


                        await emailService.SendEmailAsync(userEmail, subject, body);
                    }
                }

                _logger.LogInformation("[ServicePackageExpiryNotificationJob] Đã gửi thông báo đến {0} người dùng.", invoices.Count);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[ServicePackageExpiryNotificationJob] Gặp lỗi trong quá trình gửi email.");
            }

            // Chờ đến ngày hôm sau (24h)
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
        }
    }

    private double GetAmountByServiceId(int servicePackageId)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWorks>();
            var entity = unitOfWork.ServicePackageRepository.GetById(servicePackageId);
            if (entity == null)
            {
                throw new Exception("Not found service package");
            }
            return entity.Price;
        }
    }

}
