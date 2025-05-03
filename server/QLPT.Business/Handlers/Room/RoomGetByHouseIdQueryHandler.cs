using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomGetByHouseIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomGetByHouseIdQuery, IEnumerable<RoomViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<RoomViewModel>> Handle(RoomGetByHouseIdQuery request, CancellationToken cancellationToken)
    {
        var queryHouse = await _unitOfWork.HouseRepository.GetByIdAsync(request.HouseId);
        if(queryHouse == null)
        {
            throw new Exception("Not found House");
        }

        var queryRoom = _unitOfWork.RoomRepository.GetQuery(r => r.HouseId == request.HouseId);
        
        var result = await queryRoom.ToListAsync();

        return _mapper.Map<IEnumerable<RoomViewModel>>(result);
    }
}
