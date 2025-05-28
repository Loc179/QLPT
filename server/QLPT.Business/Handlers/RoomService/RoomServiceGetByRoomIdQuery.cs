using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomServiceGetByRoomIdQuery : BaseGetAllQuery<RoomServiceViewModel>
{
    public int RoomId { get; set; }
}
