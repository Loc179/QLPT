using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class HouseSearchCommandHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<HouseSearchCommand, PaginatedResult<HouseViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<HouseViewModel>> Handle(HouseSearchCommand request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryHouse = _unitOfWork.HouseRepository.GetQuery(r => r.UserId == request.UserId);
        
        if (!string.IsNullOrWhiteSpace(request.keyword))
        {
            var keywordLower = request.keyword.ToLower();
            queryHouse = queryHouse.Where(h =>
                h.Name.ToLower().Contains(keywordLower) ||
                (!string.IsNullOrEmpty(h.Address) && h.Address.ToLower().Contains(keywordLower))
            );
        }

        int total = await queryHouse.CountAsync(cancellationToken);
        
        var result = await queryHouse.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<HouseViewModel>>(result);

        return new PaginatedResult<HouseViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
