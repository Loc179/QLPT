using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class BaseDeleteByIdCommand<T> : IRequest<T>
{
    public int Id { get; set; }
}
