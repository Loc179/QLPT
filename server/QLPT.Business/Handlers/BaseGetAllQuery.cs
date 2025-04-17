using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class BaseGetAllQuery<T> : IRequest<IEnumerable<T>> where T : class
{

}
