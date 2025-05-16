using System;
using AutoMapper;
using QLPT.Business.Handlers;
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
        CreateMap<AdvertisementViewModel, Advertisement>().ReverseMap();
        CreateMap<UserViewModel, User>().ReverseMap();
        CreateMap<HouseViewModel, House>().ReverseMap();
        CreateMap<HouseCreateUpdateCommand, House>().ReverseMap();
        CreateMap<RoomViewModel, Room>().ReverseMap();
        CreateMap<RoomCreateUpdateCommand, Room>().ReverseMap();
        CreateMap<RoomServiceViewModel, RoomService>().ReverseMap();
        CreateMap<ServicePackageViewModel, ServicePackage>().ReverseMap();
        CreateMap<SupportRequestViewModel, SupportRequest>().ReverseMap();
        CreateMap<SupportRequestCreateUpdateCommand, SupportRequest>().ReverseMap();
        CreateMap<InvoiceViewModel, Invoice>().ReverseMap();
        CreateMap<Invoice, InvoiceListViewModel>()
            .ForMember(dest => dest.RoomNumber, opt => opt.MapFrom(src => src.Room.RoomNumber))
            .ForMember(dest => dest.HouseId, opt => opt.MapFrom(src => src.Room.HouseId))
            .ForMember(dest => dest.HouseName, opt => opt.MapFrom(src => src.Room.House.Name))
            .ForMember(dest => dest.TenantId, opt => opt.MapFrom(src => src.Room.Tenants.FirstOrDefault(t => t.IsRepresentative)!.Id))
            .ForMember(dest => dest.TenantName, opt => opt.MapFrom(src => src.Room.Tenants.FirstOrDefault(t => t.IsRepresentative)!.FullName))
            .ForMember(dest => dest.TenantPhoneNumber, opt => opt.MapFrom(src => src.Room.Tenants.FirstOrDefault(t => t.IsRepresentative)!.PhoneNumber));
        CreateMap<TenantCreateUpdateCommand, Tenant>().ReverseMap();
        CreateMap<Tenant, TenantViewModel>()
            .ForMember(dest => dest.RoomNumber, opt => opt.MapFrom(src => src.Room.RoomNumber))
            .ForMember(dest => dest.HouseId, opt => opt.MapFrom(src => src.Room.HouseId))
            .ForMember(dest => dest.HouseName, opt => opt.MapFrom(src => src.Room.House.Name));

    }
}
