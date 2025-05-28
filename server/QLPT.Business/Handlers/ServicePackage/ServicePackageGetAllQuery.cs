using System;
using MediatR;
using QLPT.Business.ViewModels.ServicePackage;

namespace QLPT.Business.Handlers;

public class ServicePackageGetAllQuery : IRequest<IEnumerable<ServicePackageViewModel>>
{
    
}
