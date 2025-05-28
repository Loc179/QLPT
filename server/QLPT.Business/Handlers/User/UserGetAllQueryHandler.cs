using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class UserGetAllQueryHandler(UserManager<User> userManager, IMapper mapper) : IRequestHandler<UserGetAllQuery, PaginatedResult<UserViewModel>>
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly IMapper _mapper = mapper;

    public async Task<PaginatedResult<UserViewModel>> Handle(UserGetAllQuery request, CancellationToken cancellationToken)
    {
        var users = _userManager.Users.AsQueryable();

        int total = await users.CountAsync(cancellationToken);
        var result = await users.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<UserViewModel>>(result);

        return new PaginatedResult<UserViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
