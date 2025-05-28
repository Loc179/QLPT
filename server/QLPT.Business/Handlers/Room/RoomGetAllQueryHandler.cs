using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomGetAllQuery, PaginatedResult<RoomViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<RoomViewModel>> Handle(RoomGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomRepository.GetQuery();

        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<RoomViewModel>>(result);

        return new PaginatedResult<RoomViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
