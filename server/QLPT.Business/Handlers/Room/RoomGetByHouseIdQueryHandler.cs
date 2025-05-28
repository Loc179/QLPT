using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomGetByHouseIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomGetByHouseIdQuery, PaginatedResult<RoomViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<RoomViewModel>> Handle(RoomGetByHouseIdQuery request, CancellationToken cancellationToken)
    {
        var queryHouse = await _unitOfWork.HouseRepository.GetByIdAsync(request.HouseId);
        if(queryHouse == null)
        {
            throw new Exception("Not found House");
        }

        var queryRoom = _unitOfWork.RoomRepository.GetQuery(r => r.HouseId == request.HouseId);
        
        int total = await queryRoom.CountAsync(cancellationToken);
        var result = await queryRoom.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<RoomViewModel>>(result);

        return new PaginatedResult<RoomViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
