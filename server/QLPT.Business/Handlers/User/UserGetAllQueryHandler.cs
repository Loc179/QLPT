using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class UserGetAllQueryHandler(UserManager<User> userManager, IMapper mapper) : IRequestHandler<UserGetAllQuery, IEnumerable<UserViewModel>>
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<UserViewModel>> Handle(UserGetAllQuery request, CancellationToken cancellationToken)
    {
        var users = await _userManager.Users.ToListAsync(cancellationToken);
        return _mapper.Map<IEnumerable<UserViewModel>>(users);
    }
}
