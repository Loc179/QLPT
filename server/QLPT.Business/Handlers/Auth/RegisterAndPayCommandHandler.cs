using System;
using System.Text;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Bcpg;
using QLPT.Business.Services;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class RegisterAndPayCommandHandler(IUnitOfWorks unitOfWorks, UserManager<User> userManager, IVnPayService vnPayService, IHttpContextAccessor httpContextAccessor) : IRequestHandler<RegisterAndPayCommand, string>
{
    private readonly IUnitOfWorks _unitOfWorks = unitOfWorks;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IVnPayService _vnPayService = vnPayService;
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public async Task<string> Handle(RegisterAndPayCommand request, CancellationToken cancellationToken)
    {
        // Check trùng username/email
        if (await _userManager.FindByNameAsync(request.Username) != null || 
            await _userManager.FindByEmailAsync(request.Email) != null)
        {
            throw new Exception("Username or Email already exists.");
        }



        var httpContext = _httpContextAccessor.HttpContext;

         // 2. Encode toàn bộ thông tin đăng ký thành chuỗi Base64
        var registrationInfo = new
        {
            request.Username,
            request.Password,
            request.FullName,
            request.Email,
            request.PhoneNumber,
            request.ServicePackageId
        };
        var json = System.Text.Json.JsonSerializer.Serialize(registrationInfo);
        var base64Data = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));

        // 3. Gửi base64Data đó vào OrderInfo
        var paymentModel = new VnPaymentRequestModel
        {
            OrderInfo = base64Data, // mới
            ServicePackageId = request.ServicePackageId,
            // Các thông tin cần thiết khác nếu có
        };

        // Tạo URL thanh toán
        string paymentUrl = _vnPayService.CreatePaymentUrl(httpContext, paymentModel, GetAmountByServiceId(request.ServicePackageId));

        return paymentUrl;
    }

    private double GetAmountByServiceId(int servicePackageId)
    {
        var entity = _unitOfWorks.ServicePackageRepository.GetById(servicePackageId);
        if(entity == null)
        {
            throw new Exception("Not found service package");
        }
        return entity.Price;
    }
}
