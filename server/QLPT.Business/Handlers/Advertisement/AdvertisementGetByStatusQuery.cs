using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByStatusQuery : IRequest<IEnumerable<AdvertisementViewModel>>
{
    public int Status { get; set; }
}
