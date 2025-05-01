using System;
using System.Text;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Bcpg;
using QLPT.Business.Services;
using QLPT.Business.ViewModels;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class RegisterAndPayCommandHandler(UserManager<User> userManager, IVnPayService vnPayService, IHttpContextAccessor httpContextAccessor) : IRequestHandler<RegisterAndPayCommand, string>
{
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

        // Tạo user
        var user = new User
        {
            UserName = request.Username,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            FullName = request.FullName,
            Status = 0,
            CreatedAt = DateTime.UtcNow,
            ServicePackageId = request.ServicePackageId
        };

        // var result = await _userManager.CreateAsync(user, request.Password);
        // if (!result.Succeeded)
        // {
        //     var errorMessage = string.Join(", ", result.Errors.Select(e => e.Description));
        //     throw new Exception($"Failed to create user: {errorMessage}");
        // }

        // var createdUser = await _userManager.FindByNameAsync(user.UserName);

        var httpContext = _httpContextAccessor.HttpContext;
        // var paymentModel = new VnPaymentRequestModel
        // {
        //     UserId = createdUser.Id,
        //     ServicePackageId = request.ServicePackageId
        // };

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
        string paymentUrl = _vnPayService.CreatePaymentUrl(httpContext, paymentModel);

        return paymentUrl;
    }
}
