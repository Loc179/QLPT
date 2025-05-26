using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class HouseSearchCommandHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<HouseSearchCommand, IEnumerable<HouseViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<HouseViewModel>> Handle(HouseSearchCommand request, CancellationToken cancellationToken)
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

        var houseList = await queryHouse.ToListAsync(cancellationToken);
        var result = _mapper.Map<IEnumerable<HouseViewModel>>(houseList);

        return result;
    }
}
