using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class BaseGetAllQuery<T> : IRequest<PaginatedResult<T>> where T : class
{
    public int PageNumber { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}
