using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class InvoiceGetAllQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceGetAllQuery, IEnumerable<InvoiceViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<InvoiceViewModel>> Handle(InvoiceGetAllQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.InvoiceRepository.GetQuery();

        var result = await query.ToListAsync();

        return _mapper.Map<IEnumerable<InvoiceViewModel>>(result);
    }
}
