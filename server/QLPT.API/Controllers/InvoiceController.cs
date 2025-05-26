using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QLPT.Business.Handlers;

namespace QLPT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InvoiceCreateUpdateCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] InvoiceCreateUpdateCommand command)
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
            var request = new InvoiceDeleteByIdCommand { Id = id };
            var result = await _mediator.Send(request);
            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _mediator.Send(new InvoiceGetByIdQuery { Id = id });

            if (result == null)
            {
                return NotFound($"Invoice with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-room/{id}")]
        public async Task<IActionResult> GetByRoomId(int id)
        {
            var result = await _mediator.Send(new InvoiceGetByRoomIdQuery { RoomId = id });

            if (result == null)
            {
                return NotFound($"Invoice with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-house/{id}")]
        public async Task<IActionResult> GetByHouseId(int id)
        {
            var result = await _mediator.Send(new InvoiceGetByHouseIdQuery { HouseId = id });

            if (result == null)
            {
                return NotFound($"Invoice with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpGet("by-user/{id}")]
        public async Task<IActionResult> GetByUserId(int id)
        {
            var result = await _mediator.Send(new InvoiceGetByUserIdQuery { UserId = id });

            if (result == null)
            {
                return NotFound($"Invoice with ID {id} not found.");
            }

            return Ok(result);
        }

        [HttpPost("paymenturl")]
        public async Task<IActionResult> PaymentUrl([FromBody] InvoicePaymentUrlCommand command)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string paymentUrl = await _mediator.Send(command);
            return Ok(new { paymentUrl });

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new InvoiceGetAllQuery());
            return Ok(result);
        }

        [HttpPost("vnpay-return")]
        public async Task<IActionResult> VnPayReturn([FromBody] Dictionary<string, string> vnpayData)
        {
            var responseCode = vnpayData["vnp_ResponseCode"];
            var invoiceCode = vnpayData["vnp_TxnRef"];

            Console.WriteLine($"Response Code: {responseCode}");
            Console.WriteLine($"Invoice Code: {invoiceCode}");

            if (responseCode == "00" && !string.IsNullOrEmpty(invoiceCode))
            {
                var command = new InvoiceConfirmPaymentCommand
                {
                    InvoiceCode = invoiceCode
                };

                var result = await _mediator.Send(command);

                if (result)
                    return Ok(new { message = "Thanh toán thành công và đã cập nhật trạng thái hóa đơn." });
                else
                    return BadRequest(new { message = "Thanh toán thành công nhưng không thể cập nhật trạng thái hóa đơn." });
            }

            return BadRequest(new { message = "Thanh toán thất bại hoặc dữ liệu không hợp lệ." });
        }

        [HttpPost("export")]
        public async Task<IActionResult> ExportToExcel([FromBody] InvoiceExportExcelCommand command)
        {
            var result = await _mediator.Send(command);

            // Trả về file Excel dạng byte[]
            return File(result,
                contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileDownloadName: $"invoices_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
        }
        
        [HttpGet("search")]
        public async Task<IActionResult> SearchInvoices(
            [FromQuery] int userId,
            [FromQuery] string? keyword,
            [FromQuery] bool? isPad,
            [FromQuery] int? houseId,
            [FromQuery] DateTime? fromDate,
            [FromQuery] DateTime? toDate,
            [FromQuery] int? roomId)
        {
            var result = await _mediator.Send(new InvoiceSearchCommand
            {
                UserId = userId,
                Keyword = keyword,
                IsPad = isPad,
                HouseId = houseId,
                RoomId = roomId,
                FromDate = fromDate,
                ToDate = toDate
            });

            return Ok(result);
        }
    }
}
