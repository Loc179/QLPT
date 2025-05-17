using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByUserIdQuery : IRequest<IEnumerable<AdvertisementViewModel>>
{
    public int UserId { get; set; }
}
