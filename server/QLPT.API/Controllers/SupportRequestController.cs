using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportRequestController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SupportRequestCreateUpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SupportRequestCreateUpdateCommand command)
        {
            command.Id = id;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var request = new SupportRequestDeleteByIdCommand{ Id = id};
            var result = await _mediator.Send(request);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new SupportRequestGetByIdQuery { Id = id });

            if (result == null)
            {
                return NotFound($"SupportRequest with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-user/{id}")]
        public async Task<IActionResult> GetByUserId(int id)
        {
            var result = await _mediator.Send(new SupportRequestGetByUserIdQuery { UserId = id });

            if (result == null || !result.Any())
            {
                return NotFound($"SupportRequest with User ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new SupportRequestGetAllQuery());
            return Ok(result);
        }
    }
}
