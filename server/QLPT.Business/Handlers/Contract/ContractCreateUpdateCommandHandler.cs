using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class ContractCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<ContractCreateUpdateCommand, bool>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<bool> Handle(ContractCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<bool> Create(ContractCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new Contract
        {
            UserId = request.UserId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            DepositAmount = request.DepositAmount,
            Status = request.Status,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow
        };

        _unitOfWork.ContractRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        foreach (var tenantId in request.TenantIds)
        {
            var contractTenant = new ContractTenant
            {
                ContractId = entity.Id,
                TenantId = tenantId
            };
            _unitOfWork.ContractTenantRepository.Add(contractTenant);
        }

        return await _unitOfWork.SaveChangesAsync() > 0;
    }

    private async Task<bool> Update(ContractCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.ContractRepository.GetByIdAsync(request.Id.Value);
        if (entity == null)
        {
            throw new Exception("Contract not found");
        }

        entity.UserId = request.UserId;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.DepositAmount = request.DepositAmount;
        entity.Status = request.Status;
        entity.Notes = request.Notes;

        _unitOfWork.ContractRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        // Xóa các liên kết Tenant cũ
        var oldContractTenants = _unitOfWork.ContractTenantRepository
            .GetQuery()
            .Where(ct => ct.ContractId == entity.Id);

        foreach (var oldContractTenant in oldContractTenants)
        {
            _unitOfWork.ContractTenantRepository.Delete(oldContractTenant);
        }

        // Tạo mới liên kết Tenant
        foreach (var tenantId in request.TenantIds)
        {
            var contractTenant = new ContractTenant
            {
                ContractId = entity.Id,
                TenantId = tenantId
            };
            _unitOfWork.ContractTenantRepository.Add(contractTenant);
        }

        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
