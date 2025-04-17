using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class BaseGetByIdQuery<T> : IRequest<T> where T : class
{
    public int Id { get; set; }
}
