using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class AdvertisementGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<AdvertisementGetByIdQuery, AdvertisementViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<AdvertisementViewModel> Handle(AdvertisementGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.AdvertisementRepository.GetByIdAsync(request.Id);

        return _mapper.Map<AdvertisementViewModel>(query);
    }
}
