using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HouseCreateUpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HouseCreateUpdateCommand command)
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
            var request = new HouseDeleteByIdCommand { Id = id };
            var result = await _mediator.Send(request);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new HouseGetByIdQuery { Id = id });

            if (result == null)
            {
                return NotFound($"House with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-user/{id}")]
        public async Task<IActionResult> GetByUserId(int id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new HouseGetByUserIdQuery { UserId = id, PageNumber = page, PageSize = pageSize });

            if (result == null)
            {
                return NotFound($"House with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("search/{id}")]
        public async Task<IActionResult> GetSearch(int id, [FromQuery] string? keyword = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new HouseSearchCommand { UserId = id, keyword = keyword, PageNumber = page, PageSize = pageSize });

            return Ok(result);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _mediator.Send(new HouseGetAllQuery{ PageNumber = page, PageSize = pageSize});
            return Ok(result);
        }
    }
}
