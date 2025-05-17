using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels.ServicePackage;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class ServicePackageCreateUpdateCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<ServicePackageCreateUpdateCommand, ServicePackageViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public Task<ServicePackageViewModel> Handle(ServicePackageCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        return (request.Id.HasValue && request.Id > 0)
            ? Update(request, cancellationToken)
            : Create(request, cancellationToken);
    }

    private async Task<ServicePackageViewModel> Create(ServicePackageCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = new ServicePackage
        {
            Name = request.Name,
            Description = request.Description,
            Duration = request.Duration,
            Price = request.Price,
            CreatedAt = DateTime.UtcNow
        };

        _unitOfWork.ServicePackageRepository.Add(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Failed to create ServicePackage");
        }

        var createdEntity = await _unitOfWork.ServicePackageRepository.GetByIdAsync(entity.Id);

        return _mapper.Map<ServicePackageViewModel>(createdEntity);
    }

    private async Task<ServicePackageViewModel> Update(ServicePackageCreateUpdateCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.ServicePackageRepository.GetByIdAsync(request.Id!.Value);

        if (entity == null)
        {
            throw new Exception("ServicePackage not found");
        }

        _mapper.Map(request, entity);

        _unitOfWork.ServicePackageRepository.Update(entity);
        var result = await _unitOfWork.SaveChangesAsync();

        if (result <= 0)
        {
            throw new Exception("Update ServicePackage failed");
        }

        return _mapper.Map<ServicePackageViewModel>(entity);
    }
}
