using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomServiceGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomServiceGetAllQuery, IEnumerable<RoomServiceViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<RoomServiceViewModel>> Handle(RoomServiceGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomServiceRepository.GetQuery();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<RoomServiceViewModel>>(result);
    }
}
