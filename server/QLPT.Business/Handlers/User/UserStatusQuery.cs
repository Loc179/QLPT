using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class UserStatusQuery : IRequest<bool>
{
    public int Id { get; set; }
    public int Status { get; set; }
}
