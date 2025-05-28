using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<AdvertisementGetByUserIdQuery, PaginatedResult<AdvertisementViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<PaginatedResult<AdvertisementViewModel>> Handle(AdvertisementGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryAdvertisement = _unitOfWork.AdvertisementRepository.GetQuery(r => r.UserId == request.UserId)
            .Include(ad => ad.User)
            .Include(i => i.Images);

        int total = await queryAdvertisement.CountAsync(cancellationToken);
        var result = await queryAdvertisement.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<AdvertisementViewModel>>(result);

        return new PaginatedResult<AdvertisementViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
