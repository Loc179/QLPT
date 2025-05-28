using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestGetByUserIdQuery, PaginatedResult<SupportRequestViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<SupportRequestViewModel>> Handle(SupportRequestGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queries = _unitOfWork.SupportRequestRepository.GetQuery(s => s.UserId == request.UserId);

        if (request.Status != null)
        {
            queries = queries.Where(r => r.Status == request.Status);
        }

        int total = await queries.CountAsync(cancellationToken);
        var result = await queries.OrderByDescending(s => s.CreatedAt)
            .Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync(cancellationToken);

        var viewmodels = _mapper.Map<IEnumerable<SupportRequestViewModel>>(result);

        return new PaginatedResult<SupportRequestViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }

}
