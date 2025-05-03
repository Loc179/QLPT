using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class UserUpdateCommandHandler(UserManager<User> userManager, IMapper mapper) : IRequestHandler<UserUpdateCommand, UserViewModel>
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly IMapper _mapper = mapper;

    public async Task<UserViewModel> Handle(UserUpdateCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        if (string.IsNullOrEmpty(request.UserName))
                throw new ArgumentException("Username is required");

        if (string.IsNullOrEmpty(request.Email))
                throw new ArgumentException("Email is required");
    
        user.UserName = request.UserName;
        user.Email = request.Email;
        user.PhoneNumber = request.PhoneNumber ?? user.PhoneNumber;
        user.FullName = request.FullName ?? user.FullName;
        user.Status = request.Status ?? user.Status;
        user.ServicePackageId = request.ServicePackageId ?? user.ServicePackageId;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            throw new Exception(string.Join("; ", result.Errors.Select(e => e.Description)));
        }

        return _mapper.Map<UserViewModel>(user);
        
    }
}
