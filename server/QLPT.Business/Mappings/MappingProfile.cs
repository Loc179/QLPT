using System;
using AutoMapper;
using QLPT.Business.Handlers;
using QLPT.Business.ViewModels;
using QLPT.Business.ViewModels.ServicePackage;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Models.Entities;

namespace QLPT.Business.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<AdvertisementCreateUpdateCommand, Advertisement>()
            .ForMember(dest => dest.Images, opt => opt.Ignore());
        CreateMap<AdvertisementViewModel, Advertisement>();
        CreateMap<Advertisement, AdvertisementViewModel>()
            .ForMember(dest => dest.Username, otp => otp.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.Fullname, otp => otp.MapFrom(src => src.User.FullName))
            .ForMember(dest => dest.Email, otp => otp.MapFrom(src => src.User.Email))
            .ForMember(dest => dest.Phonenumber, otp => otp.MapFrom(src => src.User.PhoneNumber))
            .ForMember(dest => dest.imagesPath, opt => opt.MapFrom(src => src.Images.Select(img => img.ImagePath)));
        CreateMap<Contract, ContractViewModel>()
            .AfterMap((src, dest) =>
            {
                var rep = src.ContractTenants?.FirstOrDefault(ct => ct.Tenant != null && ct.Tenant.IsRepresentative);
                if (rep != null)
                {
                    dest.TenantId = rep.TenantId;
                    dest.TenantName = rep.Tenant.FullName;
                }
            });
        CreateMap<ContractRequestViewModel, Contract>();
        CreateMap<Contract, ContractRequestViewModel>()
            .ForMember(dest => dest.TenantIds, opt => opt.MapFrom(src => src.ContractTenants.Select(ct => ct.TenantId)))
            .ForMember(dest => dest.TenantNames, opt => opt.MapFrom(src => src.ContractTenants.Select(ct => ct.Tenant.FullName)));
        CreateMap<User, UserViewModel>()
            .ForMember(dest => dest.ServicePackageName, opt => opt.MapFrom(src => src.ServicePackage.Name));
        CreateMap<HouseViewModel, House>().ReverseMap();
        CreateMap<HouseCreateUpdateCommand, House>().ReverseMap();
        CreateMap<ContractViewModel, Contract>().ReverseMap();
        CreateMap<RoomViewModel, Room>().ReverseMap();
        CreateMap<RoomCreateUpdateCommand, Room>().ReverseMap();
        CreateMap<RoomServiceViewModel, RoomService>().ReverseMap();
        CreateMap<RoomServiceCreateUpdateCommand, RoomService>().ReverseMap();
        CreateMap<ServicePackageViewModel, ServicePackage>().ReverseMap();
        CreateMap<ServicePackageCreateUpdateCommand, ServicePackage>().ReverseMap();
        CreateMap<SupportRequestViewModel, SupportRequest>();
        CreateMap<SupportRequest, SupportRequestViewModel>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
            .ForMember(dest => dest.UserFullName, opt => opt.MapFrom(src => src.User.FullName));
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
