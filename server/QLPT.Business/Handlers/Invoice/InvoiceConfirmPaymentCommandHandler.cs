using System;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceConfirmPaymentCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceConfirmPaymentCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(InvoiceConfirmPaymentCommand request, CancellationToken cancellationToken)
    {
        var invoice = await _unitOfWork.InvoiceRepository.GetQuery(r => r.InvoiceCode == request.InvoiceCode).FirstOrDefaultAsync(cancellationToken);

        if (invoice == null)
            return false;

        if (invoice.IsPaid)
        {
            return true;
        }

        invoice.IsPaid = true;
        invoice.PaymentDate = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();

        return true;
    }
}
