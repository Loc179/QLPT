using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<AdvertisementGetByUserIdQuery, IEnumerable<AdvertisementViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<IEnumerable<AdvertisementViewModel>> Handle(AdvertisementGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryAdvertisement = _unitOfWork.AdvertisementRepository.GetQuery(r => r.UserId == request.UserId)
            .Include(ad => ad.User)
            .Include(i => i.Images);

        var result = await queryAdvertisement.ToListAsync();

        return _mapper.Map<IEnumerable<AdvertisementViewModel>>(result);
    }
}
