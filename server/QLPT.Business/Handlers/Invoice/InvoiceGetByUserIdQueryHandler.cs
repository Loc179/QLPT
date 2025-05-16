using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class InvoiceGetByUserIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork, UserManager<User> userManager) : IRequestHandler<InvoiceGetByUserIdQuery, IEnumerable<InvoiceListViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;
    private readonly UserManager<User> _userManager = userManager;

    public async Task<IEnumerable<InvoiceListViewModel>> Handle(InvoiceGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if(queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var queryInvoice = _unitOfWork.InvoiceRepository.GetQuery(r => r.Room.House.UserId == request.UserId);
        
        var result = await queryInvoice
            .Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable()
            .ToListAsync();

        return _mapper.Map<IEnumerable<InvoiceListViewModel>>(result);
    }
}
