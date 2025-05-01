using System.Text;
using System.Text.Json;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;
using QLPT.Models.Entities;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<User> userManager, IMediator mediator) : ControllerBase
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly IMediator _mediator = mediator;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpPost("register-and-pay")]
        public async Task<IActionResult> RegisterAndPay([FromBody] RegisterAndPayCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string paymentUrl = await _mediator.Send(command);
            return Ok(new { paymentUrl });
            
        }

        [HttpPost("vnpay-return")]
        public async Task<IActionResult> VnPayReturn([FromBody] Dictionary<string, string> vnpayData)
        {
            if (!vnpayData.ContainsKey("vnp_ResponseCode") || !vnpayData.ContainsKey("vnp_OrderInfo"))
            {
                return BadRequest("Dữ liệu VNPay không hợp lệ.");
            }
            var responseCode = vnpayData["vnp_ResponseCode"];
            var orderInfoBase64 = vnpayData["vnp_OrderInfo"];

            if (responseCode == "00") // 00 = Thành công
            {
                // Giải mã OrderInfo
                var json = Encoding.UTF8.GetString(Convert.FromBase64String(orderInfoBase64));
                var registrationInfo = JsonSerializer.Deserialize<RegisterAndPayCommand>(json);

                // Tạo user
                var user = new User
                {
                    UserName = registrationInfo.Username,
                    Email = registrationInfo.Email,
                    PhoneNumber = registrationInfo.PhoneNumber,
                    FullName = registrationInfo.FullName,
                    Status = 1, // Kích hoạt tài khoản
                    CreatedAt = DateTime.UtcNow,
                    ServicePackageId = registrationInfo.ServicePackageId
                };

                var result = await _userManager.CreateAsync(user, registrationInfo.Password);
                if (!result.Succeeded)
                {
                    return BadRequest(false);
                }

                return Ok(true);
            }

            return BadRequest(false);
        }


    }
}
