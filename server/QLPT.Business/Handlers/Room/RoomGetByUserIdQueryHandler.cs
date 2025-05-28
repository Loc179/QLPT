using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class RoomGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<RoomGetByUserIdQuery, PaginatedResult<RoomViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<PaginatedResult<RoomViewModel>> Handle(RoomGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if(queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryRoom = _unitOfWork.RoomRepository.GetQuery(r => r.House.UserId == request.UserId);
        
        int total = await queryRoom.CountAsync(cancellationToken);
        var result = await queryRoom.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<RoomViewModel>>(result);

        return new PaginatedResult<RoomViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
