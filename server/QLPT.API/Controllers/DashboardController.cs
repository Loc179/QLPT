using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet("quarterly")]
        public async Task<IActionResult> GetStatsByQuarter([FromQuery] int userId, [FromQuery] int quarter, [FromQuery] int year)
        {
            var result = await _mediator.Send(new GetStatsQuery { UserId = userId, Quarter = quarter, Year = year });
            return Ok(result);
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetDashboard()
        {
            var result = await _mediator.Send(new GetAdminDashboardQuery());
            return Ok(result);
        }
    }
}
