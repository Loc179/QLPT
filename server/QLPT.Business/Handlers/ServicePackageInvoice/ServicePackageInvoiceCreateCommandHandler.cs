using System;
using System.Text;
using System.Text.Json;
using MediatR;
using Microsoft.AspNetCore.Identity;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class ServicePackageInvoiceCreateCommandHandler(IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<ServicePackageInvoiceCreateCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<bool> Handle(ServicePackageInvoiceCreateCommand request, CancellationToken cancellationToken)
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
        using var document = JsonDocument.Parse(json);
        var userId = document.RootElement.GetProperty("UserId").GetInt32();

        var queryUser = await _userManager.FindByIdAsync(userId.ToString());
        if (queryUser == null) return false;

        var entity = new ServicePackageInvoice
        {
            UserId = userId,
            Amount = GetAmountByServiceId((int)queryUser.ServicePackageId!),
            PaymentDate = DateTime.UtcNow,
            PaymenNexttDate = DateTime.UtcNow.AddDays(30),
        };

        _unitOfWork.ServicePackageInvoiceRepository.Add(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }

    private double GetAmountByServiceId(int servicePackageId)
    {
        var entity = _unitOfWork.ServicePackageRepository.GetById(servicePackageId);
        if(entity == null)
        {
            throw new Exception("Not found service package");
        }
        return entity.Price;
    }
}
