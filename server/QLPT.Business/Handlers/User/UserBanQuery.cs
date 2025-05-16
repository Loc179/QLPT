using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class UserBanQuery : IRequest<bool>
{
    public int Id { get; set; }
    public int Status { get; set; }
}
