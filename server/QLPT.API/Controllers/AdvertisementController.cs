using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Create([FromForm] AdvertisementCreateUpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Update(int id, [FromForm] AdvertisementCreateUpdateCommand command)
        {
            command.Id = id;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPut("update-status")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus([FromBody] AdvertisementUpdateStatusCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _mediator.Send(command);

            return Ok(result);
        }


        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var request = new AdvertisementDeleteById { Id = id };
            var result = await _mediator.Send(request);
            return Ok(result);
        }


        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new AdvertisementGetByIdQuery { Id = id });

            if (result == null)
            {
                return NotFound($"Advertisement with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-user/{id}")]
        [Authorize]
        public async Task<IActionResult> GetByUserId(int id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new AdvertisementGetByUserIdQuery { UserId = id, PageNumber = page, PageSize = pageSize });

            if (result == null)
            {
                return NotFound($"Advertisement with userId {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-status/{status}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByStatus(int status, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new AdvertisementGetByStatusQuery { Status = status, PageNumber = page, PageSize = pageSize });

            if (result == null)
            {
                return NotFound($"Advertisement with {status} not found.");
            }

            return Ok(result);
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByFilter([FromQuery] AdvertisementFilterQuery command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new AdvertisementGetAllQuery { PageNumber = page, PageSize = pageSize });
            return Ok(result);
        }
    }
}
