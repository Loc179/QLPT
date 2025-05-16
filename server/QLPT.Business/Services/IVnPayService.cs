using System;
using Microsoft.AspNetCore.Http;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Services;

public interface IVnPayService
{
    string CreatePaymentUrl(HttpContext httpContext, VnPaymentRequestModel model, double amount, string returnUrl = null, string invoiceCode = null);
}
