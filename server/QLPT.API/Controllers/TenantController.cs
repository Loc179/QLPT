using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TenantCreateUpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TenantCreateUpdateCommand command)
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
            var request = new TenantDeleteByIdCommand{ Id = id};
            var result = await _mediator.Send(request);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new TenantGetByIdQuery { Id = id });

            if (result == null)
            {
                return NotFound($"Tenant with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-room/{id}")]
        public async Task<IActionResult> GetByRoomId(int id)
        {
            var result = await _mediator.Send(new TenantGetByIdRoomQuery { RoomId = id });

            if (result == null)
            {
                return NotFound($"Tenant with RoomId {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-house/{id}")]
        public async Task<IActionResult> GetByHouseId(int id)
        {
            var result = await _mediator.Send(new TenantGetByIdHouseQuery { HouseId = id });

            if (result == null)
            {
                return NotFound($"Tenant with houseId {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-user/{id}")]
        public async Task<IActionResult> GetByUserId(int id)
        {
            var result = await _mediator.Send(new TenantGetByIdUserQuery { UserId = id });

            if (result == null)
            {
                return NotFound($"Tenant with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("search/{id}")]
        public async Task<IActionResult> GetSearch(int id, [FromQuery] string? keyword = "")
        {
            var result = await _mediator.Send(new TenantSearchCommand { UserId = id, keyword = keyword });

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new TenantGetAllQuery());
            return Ok(result);
        }
    }
}
