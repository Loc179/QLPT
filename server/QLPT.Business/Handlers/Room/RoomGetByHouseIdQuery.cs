using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class RoomGetByHouseIdQuery : BaseGetAllQuery<RoomViewModel>
{
    public int HouseId { get; set; }
}
