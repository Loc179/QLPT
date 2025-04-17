using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Services;

public class VnPayService(IOptions<VNPayConfig> config) : IVnPayService
{
    private readonly VNPayConfig _config = config.Value;

    public string CreatePaymentUrl(HttpContext httpContext, VnPaymentRequestModel model)
{
    var tick = DateTime.UtcNow.Ticks.ToString();

    var pay = new VnPayLibrary();
    pay.AddRequestData("vnp_Version", "2.1.0");
    pay.AddRequestData("vnp_Command", "pay");
    pay.AddRequestData("vnp_TmnCode", _config.TmnCode);
    pay.AddRequestData("vnp_Amount", (GetAmountByServiceId(model.ServicePackageId) * 100).ToString()); // nhân 100 vì VNPAY dùng đơn vị là đồng
    pay.AddRequestData("vnp_CreateDate", DateTime.UtcNow.ToString("yyyyMMddHHmmss"));
    pay.AddRequestData("vnp_CurrCode", "VND");
    pay.AddRequestData("vnp_IpAddr", httpContext.Connection.RemoteIpAddress?.ToString());
    pay.AddRequestData("vnp_Locale", "vn");
    pay.AddRequestData("vnp_BankCode", "NCB");
    pay.AddRequestData("vnp_OrderInfo", model.UserId.ToString());
    pay.AddRequestData("vnp_OrderType", "other");
    pay.AddRequestData("vnp_ReturnUrl", _config.ReturnUrl);
    pay.AddRequestData("vnp_TxnRef", tick); // Mã giao dịch duy nhất

    var paymentUrl = pay.CreateRequestUrl(_config.BaseUrl, _config.HashSecret);
    return paymentUrl;
}


    private int GetAmountByServiceId(int servicePackageId)
    {
        // TODO: Lấy giá từ DB theo servicePackageId nếu cần
        return servicePackageId switch
        {
            1 => 100000,
            2 => 200000,
            3 => 300000,
            _ => 100000
        };
    }
    
}
