using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class HouseGetByUserIdQueryHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<HouseGetByUserIdQuery, PaginatedResult<HouseViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<HouseViewModel>> Handle(HouseGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if(queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryHouse = _unitOfWork.HouseRepository.GetQuery(r => r.UserId == request.UserId);

        int total = await queryHouse.CountAsync(cancellationToken);
        
        var result = await queryHouse.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<HouseViewModel>>(result);

        return new PaginatedResult<HouseViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
