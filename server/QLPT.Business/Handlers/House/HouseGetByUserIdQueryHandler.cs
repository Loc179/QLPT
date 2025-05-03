using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class HouseGetByUserIdQueryHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<HouseGetByUserIdQuery, IEnumerable<HouseViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<HouseViewModel>> Handle(HouseGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if(queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryHouse = _unitOfWork.HouseRepository.GetQuery(r => r.UserId == request.UserId);
        
        var result = await queryHouse.ToListAsync();

        return _mapper.Map<IEnumerable<HouseViewModel>>(result);
    }
}
