using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class InvoiceSearchCommandHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceSearchCommand, IEnumerable<InvoiceViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<IEnumerable<InvoiceViewModel>> Handle(InvoiceSearchCommand request, CancellationToken cancellationToken)
    {
        var queryUser = await _userManager.FindByIdAsync(request.UserId.ToString());
        if (queryUser == null)
        {
            throw new Exception("Not found User");
        }

        var query = _unitOfWork.InvoiceRepository.GetQuery(r => r.Room.House.UserId == request.UserId);

        if (request.FromDate.HasValue)
        {
            query = query.Where(i => i.CreatedAt >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(i => i.CreatedAt <= request.ToDate.Value);
        }

        if (request.HouseId.HasValue)
        {
            query = query.Where(i => i.Room.HouseId == request.HouseId.Value);
        }

        if (request.RoomId.HasValue)
        {
            query = query.Where(i => i.RoomId == request.RoomId.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.Keyword))
        {
            var keyword = request.Keyword.Trim().ToLower();
            query = query.Where(i =>
                i.Room.Tenants.Any(t => t.FullName.ToLower().Contains(keyword)) ||
                i.Room.RoomNumber.ToString().Contains(keyword));
        }

        if (request.IsPad != null)
        {
            query = query.Where(i => i.IsPaid == request.IsPad);
        }

        var invoices = await query
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants)
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<InvoiceViewModel>>(invoices);
    }
}
