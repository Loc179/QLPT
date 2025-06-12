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
            var result = await _mediator.Send(new VnPayReturnCommand(vnpayData));

            if (!result) return BadRequest(false);

            return Ok(true);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _mediator.Send(request);

            return Ok(new { message = "Password reset email has been sent" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _mediator.Send(request);

            if (result.Length > 0)
            {
                return BadRequest(new { message = $"[FAILED] {result}" });
            }

            return Ok(new { message = "[SUCCESS] Your password has been reset." });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenCommand command)
        {
            try
            {
                var accessToken = await _mediator.Send(command);
                return Ok(new { accessToken });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
