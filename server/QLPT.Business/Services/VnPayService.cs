using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Services;

public class VnPayService(IOptions<VNPayConfig> config) : IVnPayService
{
    private readonly VNPayConfig _config = config.Value;

    public string CreatePaymentUrl(HttpContext httpContext, VnPaymentRequestModel model, double amount, string returnUrl = null, string invoiceCode = null)
    {
        var tick = DateTime.UtcNow.Ticks.ToString();

        var pay = new VnPayLibrary();
        pay.AddRequestData("vnp_Version", "2.1.0");
        pay.AddRequestData("vnp_Command", "pay");
        pay.AddRequestData("vnp_TmnCode", _config.TmnCode);
        pay.AddRequestData("vnp_Amount", (amount * 100).ToString()); // nhân 100 vì VNPAY dùng đơn vị là đồng
        pay.AddRequestData("vnp_CreateDate", DateTime.UtcNow.ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_ExpireDate", DateTime.UtcNow.AddDays(1).ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_CurrCode", "VND");
        pay.AddRequestData("vnp_IpAddr", httpContext.Connection.RemoteIpAddress.ToString());
        pay.AddRequestData("vnp_Locale", "vn");
        pay.AddRequestData("vnp_BankCode", "NCB");
        pay.AddRequestData("vnp_OrderInfo", model.OrderInfo);
        pay.AddRequestData("vnp_OrderType", "other");
        if(returnUrl == null)
        {
            returnUrl = _config.ReturnUrl;
        }
        pay.AddRequestData("vnp_ReturnUrl", returnUrl);
        if(invoiceCode == null)
        {
            invoiceCode = tick;
        }
        pay.AddRequestData("vnp_TxnRef", invoiceCode); // Mã giao dịch duy nhất

        var paymentUrl = pay.CreateRequestUrl(_config.BaseUrl, _config.HashSecret);
        return paymentUrl;
    }
    
}
