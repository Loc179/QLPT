using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementImageController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] UploadAdvertisementImageCommand command)
        {
            var id = await _mediator.Send(command);
            return Ok(new { id });
        }
    }
}
