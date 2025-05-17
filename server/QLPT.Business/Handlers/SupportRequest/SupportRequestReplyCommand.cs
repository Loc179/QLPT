using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class SupportRequestReplyCommand : IRequest<bool>
{
    public int Id { get; set; }
    public string AdminReply { get; set; } = string.Empty;
}
