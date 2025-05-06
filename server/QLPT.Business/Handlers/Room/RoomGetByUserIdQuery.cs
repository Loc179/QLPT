using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomGetByUserIdQuery : IRequest<IEnumerable<RoomViewModel>>
{
    public int UserId { get; set; }
}
