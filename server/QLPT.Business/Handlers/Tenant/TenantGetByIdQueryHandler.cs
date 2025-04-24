using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels.Tenant;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<TenantGetByIdQuery, TenantViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<TenantViewModel> Handle(TenantGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.TenantRepository.GetByIdAsync(request.Id);

        return _mapper.Map<TenantViewModel>(query);
    }
}
