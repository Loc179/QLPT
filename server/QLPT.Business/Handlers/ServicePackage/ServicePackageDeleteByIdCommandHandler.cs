using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class ServicePackageDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<ServicePackageDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(ServicePackageDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.ServicePackageRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("ServicePackage not found");
        }

        _unitOfWork.ServicePackageRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
