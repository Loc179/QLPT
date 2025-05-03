using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomGetByHouseIdQuery : IRequest<IEnumerable<RoomViewModel>>
{
    public int HouseId { get; set; }
}
