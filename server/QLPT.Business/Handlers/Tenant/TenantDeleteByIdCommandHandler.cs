using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class TenantDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<TenantDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(TenantDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.TenantRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("Tenant not found");
        }

        _unitOfWork.TenantRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
