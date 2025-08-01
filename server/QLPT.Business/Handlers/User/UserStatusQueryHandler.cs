using System;
using MediatR;
using Microsoft.AspNetCore.Identity;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class UserStatusQueryHandler(UserManager<User> userManager) : IRequestHandler<UserStatusQuery, bool>
{
    private readonly UserManager<User> _userManager = userManager;

    public async Task<bool> Handle(UserStatusQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        user.Status = request.Status;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return false;
        }

        return true;
    }
}
