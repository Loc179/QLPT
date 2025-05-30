using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class ContractDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<ContractDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(ContractDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.ContractRepository.GetByIdAsync(request.Id);
        if (entity == null)
        {
            return false;
        }

        _unitOfWork.ContractRepository.Delete(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        return result > 0;
    }
}
