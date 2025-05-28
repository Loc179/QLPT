using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class TenantGetByIdRoomQuery : BaseGetAllQuery<TenantViewModel>
{
    public int RoomId { get; set; }
}
