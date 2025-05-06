using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(InvoiceDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.InvoiceRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("Invoice not found");
        }

        _unitOfWork.InvoiceRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
