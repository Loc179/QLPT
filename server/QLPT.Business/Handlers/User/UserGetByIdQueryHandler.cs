using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using QLPT.Business.ViewModels;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class UserGetByIdQueryHandler(UserManager<User> userManager, IMapper mapper) : IRequestHandler<UserGetByIdQuery, UserViewModel>
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly IMapper _mapper = mapper;

    public async Task<UserViewModel> Handle(UserGetByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());
        if (user == null)
        {
            throw new Exception($"User with ID {request.Id} not found.");
        }

        return _mapper.Map<UserViewModel>(user);
    }
}
