using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class HouseSearchCommand : IRequest<IEnumerable<HouseViewModel>>
{
    public int UserId { get; set; }
    public string? keyword { get; set; }
}
