using System;
using System.Text;
using MediatR;
using Microsoft.AspNetCore.Http;
using QLPT.Business.Services;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoicePaymentUrlCommandHandler(IUnitOfWorks unitOfWorks, IVnPayService vnPayService, IHttpContextAccessor httpContextAccessor) : IRequestHandler<InvoicePaymentUrlCommand, string>
{
    private readonly IUnitOfWorks _unitOfWorks = unitOfWorks;
    private readonly IVnPayService _vnPayService = vnPayService;
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public async Task<string> Handle(InvoicePaymentUrlCommand request, CancellationToken cancellationToken)
    {
        var httpContext = _httpContextAccessor.HttpContext;

        var paymentUrlInfo = new
        {
            request.InvoiceCode,
            request.Total,
            request.CreateAt,
            request.RoomId,
        };

        var json = System.Text.Json.JsonSerializer.Serialize(paymentUrlInfo);
        var base64Data = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));

        var paymentModel = new VnPaymentRequestModel
        {
            OrderInfo = base64Data,
        };

        string paymentUrl = _vnPayService.CreatePaymentUrl(httpContext, paymentModel, request.Total, "https://qlpt-six.vercel.app/invoice/vnpay-return", request.InvoiceCode);

        return paymentUrl;
    }
}
