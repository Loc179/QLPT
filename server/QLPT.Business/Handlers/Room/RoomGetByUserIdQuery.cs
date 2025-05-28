using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomGetByUserIdQuery : BaseGetAllQuery<RoomViewModel>
{
    public int UserId { get; set; }
}
