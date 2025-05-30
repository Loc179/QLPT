using System;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class ContractGetByIdCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<ContractGetByIdCommand, ContractViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<ContractViewModel> Handle(ContractGetByIdCommand request, CancellationToken cancellationToken)
    {
        var contract = await _unitOfWork.ContractRepository.GetQuery(c => c.Id == request.Id).Include(c => c.ContractTenants)
        .ThenInclude(ct => ct.Tenant).FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
        if (contract == null) return null;

        return _mapper.Map<ContractViewModel>(contract);
    }
}
