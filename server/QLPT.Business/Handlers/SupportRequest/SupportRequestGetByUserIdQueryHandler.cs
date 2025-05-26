using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestGetByUserIdQuery, IEnumerable<SupportRequestViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<SupportRequestViewModel>> Handle(SupportRequestGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queries = _unitOfWork.SupportRequestRepository.GetQuery(s => s.UserId == request.UserId);

        if (request.Status != null)
        {
            queries = queries.Where(r => r.Status == request.Status);
        }

        var result = await queries.OrderByDescending(s => s.CreatedAt).ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<SupportRequestViewModel>>(result);
    }

}
