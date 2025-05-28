using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomServiceGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomServiceGetAllQuery, PaginatedResult<RoomServiceViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<RoomServiceViewModel>> Handle(RoomServiceGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.RoomServiceRepository.GetQuery();

        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<RoomServiceViewModel>>(result);

        return new PaginatedResult<RoomServiceViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
