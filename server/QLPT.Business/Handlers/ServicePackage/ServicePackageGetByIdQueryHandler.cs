using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels.ServicePackage;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class ServicePackageGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<ServicePackageGetByIdQuery, ServicePackageViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<ServicePackageViewModel> Handle(ServicePackageGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.ServicePackageRepository.GetByIdAsync(request.Id);

        return _mapper.Map<ServicePackageViewModel>(query);
    }
}
