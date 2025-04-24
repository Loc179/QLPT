using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestGetAllQuery, IEnumerable<SupportRequestViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<SupportRequestViewModel>> Handle(SupportRequestGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.SupportRequestRepository.GetQuery();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<SupportRequestViewModel>>(result);
    }
}
