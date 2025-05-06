using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class InvoiceCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceCreateUpdateCommand, InvoiceViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<InvoiceViewModel> Handle(InvoiceCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return request.Id.HasValue
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<InvoiceViewModel> Create(InvoiceCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new Invoice
        {
            Total = request.Total,
            TaxRate = request.TaxRate,
            TaxAmount = request.TaxAmount,
            CreatedAt = DateTime.UtcNow,
            RoomId = request.RoomId
            
        };

        _unitOfWork.InvoiceRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create invoice");
        }

        var createdEntity = await _unitOfWork.InvoiceRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<InvoiceViewModel>(createdEntity);
    }

    private async Task<InvoiceViewModel> Update(InvoiceCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.InvoiceRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("Invoice not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.InvoiceRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update invoice failed");
        }

        return _mapper.Map<InvoiceViewModel>(entity);
    }
}
