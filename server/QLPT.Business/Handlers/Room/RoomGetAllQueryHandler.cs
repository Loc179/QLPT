using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomGetAllQuery, IEnumerable<RoomViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<RoomViewModel>> Handle(RoomGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomRepository.GetQuery();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<RoomViewModel>>(result);
    }
}
