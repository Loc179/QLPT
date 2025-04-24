using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels.ServicePackage;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class ServicePackageGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<ServicePackageGetAllQuery, IEnumerable<ServicePackageViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<ServicePackageViewModel>> Handle(ServicePackageGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ServicePackageRepository.GetQuery();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<ServicePackageViewModel>>(result);
    }
}
