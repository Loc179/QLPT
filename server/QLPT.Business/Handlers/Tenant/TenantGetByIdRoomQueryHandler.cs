using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels.Tenant;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantGetByIdRoomQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<TenantGetByIdRoomQuery, IEnumerable<TenantViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<TenantViewModel>> Handle(TenantGetByIdRoomQuery request, CancellationToken cancellationToken)
    {
        var queryRoom = await _unitOfWork.RoomRepository.GetByIdAsync(request.RoomId);
        if(queryRoom == null)
        {
            throw new Exception("Not found Room");
        }

        var queryTenant = _unitOfWork.TenantRepository.GetQuery(r => r.RoomId == request.RoomId)
            .Include(r => r.Room)
            .ThenInclude(r => r.House)
            .AsNoTracking()
            .AsQueryable();
        
        var result = await queryTenant.ToListAsync();

        return _mapper.Map<IEnumerable<TenantViewModel>>(result);
    }
}
