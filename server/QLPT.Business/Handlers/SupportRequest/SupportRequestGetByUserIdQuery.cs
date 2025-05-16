using System;
using MediatR;
using QLPT.Business.ViewModels.SupportRequest;

namespace QLPT.Business.Handlers;

public class SupportRequestGetByUserIdQuery : IRequest<IEnumerable<SupportRequestViewModel>>
{
    public int UserId { get; set; }
}
