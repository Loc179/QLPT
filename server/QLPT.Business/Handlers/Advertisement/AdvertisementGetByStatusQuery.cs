using System;
using MediatR;
using QLPT.Business.ViewModels;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByStatusQuery : BaseGetAllQuery<AdvertisementViewModel>
{
    public int Status { get; set; }
}
