using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class HouseGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<HouseGetAllQuery, IEnumerable<HouseViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<HouseViewModel>> Handle(HouseGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.HouseRepository.GetQuery();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<HouseViewModel>>(result);

    }
}
