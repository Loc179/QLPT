using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantGetByIdRoomQuery : IRequest<IEnumerable<TenantViewModel>>
{
    public int RoomId { get; set; }
}
