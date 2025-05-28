using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByUserIdQuery : BaseGetAllQuery<AdvertisementViewModel>
{
    public int UserId { get; set; }
}
