using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicePackageInvoiceController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Dictionary<string, string> vnpayData)
        {
            var result = await _mediator.Send(new ServicePackageInvoiceCreateCommand(vnpayData));

            if (!result) return BadRequest(false);

            return Ok(true);
        }
    }
}
