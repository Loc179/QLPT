using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceGetByIdQuery, InvoiceViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<InvoiceViewModel> Handle(InvoiceGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.InvoiceRepository.GetByIdAsync(request.Id);

        return _mapper.Map<InvoiceViewModel>(query);
    }
}
