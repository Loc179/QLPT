using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class TenantExportExcelCommand : IRequest<byte[]>
{
    public string? Keyword { get; set; }
    public int? Status { get; set; }
    public int? HouseId { get; set; }
    public int? RoomId { get; set; }
    public int UserId { get; set; }
}
