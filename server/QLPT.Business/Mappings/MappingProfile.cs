using System;
using AutoMapper;
using QLPT.Business.ViewModels;
using QLPT.Business.ViewModels.ServicePackage;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Business.ViewModels.Tenant;
using QLPT.Models.Entities;

namespace QLPT.Business.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<HouseViewModel, House>().ReverseMap();
        CreateMap<RoomViewModel, Room>().ReverseMap();
        CreateMap<RoomServiceViewModel, RoomService>().ReverseMap();
        CreateMap<ServicePackageViewModel, ServicePackage>().ReverseMap();
        CreateMap<SupportRequestViewModel, SupportRequest>().ReverseMap();
        CreateMap<TenantViewModel, Tenant>().ReverseMap();
    }
}
