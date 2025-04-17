using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class BaseDeleteByIdCommand<T> : IRequest<T> where T : class
{
    public int Id { get; set; }
}
