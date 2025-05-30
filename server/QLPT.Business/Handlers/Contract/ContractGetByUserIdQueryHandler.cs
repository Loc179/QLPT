using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class ContractGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<ContractGetByUserIdQuery, PaginatedResult<ContractViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<PaginatedResult<ContractViewModel>> Handle(ContractGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryContract = from c in _unitOfWork.ContractRepository.GetQuery(c => c.UserId == request.UserId)
                           join ct in _unitOfWork.ContractTenantRepository.GetQuery() on c.Id equals ct.ContractId
                           join t in _unitOfWork.TenantRepository.GetQuery() on ct.TenantId equals t.Id
                           where t.IsRepresentative == true
                           orderby c.CreatedAt descending
                           select new ContractViewModel
                           {
                                Id = c.Id,
                                UserId = c.UserId,
                                StartDate = c.StartDate,
                                EndDate = c.EndDate,
                                DepositAmount = c.DepositAmount,
                                Status = c.Status,
                                Notes = c.Notes,
                                TenantId = t.Id,
                                TenantName = t.FullName,
                               // Map other properties as needed
                           };
            
        int total = await queryContract.CountAsync(cancellationToken);
        var result = await queryContract.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync(cancellationToken);

        var viewmodels = _mapper.Map<IEnumerable<ContractViewModel>>(result);

        return new PaginatedResult<ContractViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
