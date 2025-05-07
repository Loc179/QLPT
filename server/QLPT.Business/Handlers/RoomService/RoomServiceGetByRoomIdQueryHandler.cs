using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomServiceGetByRoomIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomServiceGetByRoomIdQuery, IEnumerable<RoomServiceViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<RoomServiceViewModel>> Handle(RoomServiceGetByRoomIdQuery request, CancellationToken cancellationToken)
    {
        var queryRoom = await _unitOfWork.RoomRepository.GetByIdAsync(request.RoomId);
        if(queryRoom == null)
        {
            throw new Exception("Not found Room");
        }

        var queryRoomService = _unitOfWork.RoomServiceRepository.GetQuery(r => r.RoomId == request.RoomId);
        
        var result = await queryRoomService.ToListAsync();

        return _mapper.Map<IEnumerable<RoomServiceViewModel>>(result);
    }
}
