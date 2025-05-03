using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class HouseGetByUserIdQuery : IRequest<IEnumerable<HouseViewModel>>
{
    public int UserId { get; set; }
}
