using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class HouseGetByUserIdQuery : IRequest<PaginatedResult<HouseViewModel>>
{
    public int UserId { get; set; }

    public int PageNumber { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}

