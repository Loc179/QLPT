using System;
using MediatR;
using QLPT.Business.ViewModels.SupportRequest;

namespace QLPT.Business.Handlers;

public class SupportRequestGetByUserIdQuery : BaseGetAllQuery<SupportRequestViewModel>
{
    public int UserId { get; set; }
    public int? Status { get; set; }
}
