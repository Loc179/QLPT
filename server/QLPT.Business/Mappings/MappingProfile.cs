using System;
using AutoMapper;
using QLPT.Business.ViewModels;
using QLPT.Models.Entities;

namespace QLPT.Business.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<HouseViewModel, House>().ReverseMap();
    }
}
