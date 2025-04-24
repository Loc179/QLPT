using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels.SupportRequest;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestGetByIdQuery, SupportRequestViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<SupportRequestViewModel> Handle(SupportRequestGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.SupportRequestRepository.GetByIdAsync(request.Id);

        return _mapper.Map<SupportRequestViewModel>(query);
    }
}
