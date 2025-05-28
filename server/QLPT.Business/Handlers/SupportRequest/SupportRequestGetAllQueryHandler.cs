using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestGetAllQuery, PaginatedResult<SupportRequestViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<SupportRequestViewModel>> Handle(SupportRequestGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.SupportRequestRepository.GetQuery();

        int total = await query.CountAsync(cancellationToken);
        var result = await query.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<SupportRequestViewModel>>(result);

        return new PaginatedResult<SupportRequestViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
