using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RoomCreateUpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RoomCreateUpdateCommand command)
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
            var request = new RoomDeleteByIdCommand{ Id = id};
            var result = await _mediator.Send(request);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new RoomGetByIdQuery { Id = id });

            if (result == null)
            {
                return NotFound($"Room with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-house/{id}")]
        public async Task<IActionResult> GetByHouseId(int id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new RoomGetByHouseIdQuery { HouseId = id, PageNumber = page, PageSize = pageSize });

            if (result == null)
            {
                return NotFound($"Room with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-user/{id}")]
        public async Task<IActionResult> GetByUserId(int id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new RoomGetByUserIdQuery { UserId = id, PageNumber = page, PageSize = pageSize });

            if (result == null)
            {
                return NotFound($"Room with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new RoomGetAllQuery{ PageNumber = page, PageSize = pageSize });
            return Ok(result);
        }
    }
}
