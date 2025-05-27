using System;
using System.Text;
using System.Text.Json;
using MediatR;
using Microsoft.AspNetCore.Identity;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class VnPayReturnCommandHandler(UserManager<User> userManager, RoleManager<Role> roleManager, IUnitOfWorks unitOfWorks) : IRequestHandler<VnPayReturnCommand, bool>
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly RoleManager<Role> _roleManager = roleManager;
    private readonly IUnitOfWorks _unitOfWorks = unitOfWorks;

    public async Task<bool> Handle(VnPayReturnCommand request, CancellationToken cancellationToken)
    {
        var vnpayData = request.VnPayData;

        if (!vnpayData.ContainsKey("vnp_ResponseCode") || !vnpayData.ContainsKey("vnp_OrderInfo"))
        {
            return false;
        }

        var responseCode = vnpayData["vnp_ResponseCode"];
        var orderInfoBase64 = vnpayData["vnp_OrderInfo"];

        if (responseCode != "00") return false;

        // Giải mã thông tin từ VNPay
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(orderInfoBase64));
        var registrationInfo = JsonSerializer.Deserialize<RegisterAndPayCommand>(json);

        var user = new User
        {
            UserName = registrationInfo.Username,
            Email = registrationInfo.Email,
            PhoneNumber = registrationInfo.PhoneNumber,
            FullName = registrationInfo.FullName,
            Status = 1,
            CreatedAt = DateTime.UtcNow,
            ServicePackageId = registrationInfo.ServicePackageId
        };

        var result = await _userManager.CreateAsync(user, registrationInfo.Password);

        if (!result.Succeeded)
            return false;

        var servicePackageInvoice = new ServicePackageInvoice
        {
            UserId = user.Id,
            Amount = GetAmountByServiceId(registrationInfo.ServicePackageId),
            PaymentDate = DateTime.UtcNow,
            PaymenNexttDate = DateTime.UtcNow.AddMonths(1),
        };

        _unitOfWorks.ServicePackageInvoiceRepository.Add(servicePackageInvoice);
        var result1 = await _unitOfWorks.SaveChangesAsync();
        if (result1 <= 0)
            return false;

        // Gán role cho user (ví dụ: Host)
        const string roleName = "User";

        // Đảm bảo role tồn tại trước khi gán
        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            await _roleManager.CreateAsync(new Role { Name = roleName });
        }

        var addToRoleResult = await _userManager.AddToRoleAsync(user, roleName);

        return addToRoleResult.Succeeded;
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
