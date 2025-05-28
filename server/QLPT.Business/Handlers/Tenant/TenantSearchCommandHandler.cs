using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class TenantSearchCommandHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<TenantSearchCommand, PaginatedResult<TenantViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<TenantViewModel>> Handle(TenantSearchCommand request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryTenant = _unitOfWork.TenantRepository.GetQuery(r => r.Room.House.UserId == request.UserId);
        
        if (!string.IsNullOrWhiteSpace(request.keyword))
        {
            var keywordLower = request.keyword.ToLower();
            queryTenant = queryTenant.Where(h =>
                h.FullName.ToLower().Contains(keywordLower) ||
                h.Email.ToLower().Contains(keywordLower) ||
                h.PhoneNumber.ToLower().Contains(keywordLower) ||
                h.Room.House.Name.ToLower().Contains(keywordLower)
            );
        }

        queryTenant = queryTenant
            .Include(r => r.Room)
            .ThenInclude(r => r.House)
            .AsNoTracking()
            .AsQueryable();

        int total = await queryTenant.CountAsync(cancellationToken);
        var result = await queryTenant.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<TenantViewModel>>(result);

        return new PaginatedResult<TenantViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
