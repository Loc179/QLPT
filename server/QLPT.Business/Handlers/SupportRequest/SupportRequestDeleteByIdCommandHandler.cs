using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(SupportRequestDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.SupportRequestRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("SupportRequest not found");
        }

        _unitOfWork.SupportRequestRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
