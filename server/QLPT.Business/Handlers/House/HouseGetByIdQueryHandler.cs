using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class HouseGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<HouseGetByIdQuery, HouseViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<HouseViewModel> Handle(HouseGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.HouseRepository.GetByIdAsync(request.Id);

        return _mapper.Map<HouseViewModel>(query);
    }
}
