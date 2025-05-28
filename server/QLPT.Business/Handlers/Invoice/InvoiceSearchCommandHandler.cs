using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;
using QLPT.Models.Entities;

namespace QLPT.Business.Handlers;

public class InvoiceSearchCommandHandler(IMapper mapper, UserManager<User> userManager, IUnitOfWorks unitOfWork) : IRequestHandler<InvoiceSearchCommand, PaginatedResult<InvoiceListViewModel>>
{
    private readonly IMapper _mapper = mapper;
    private readonly UserManager<User> _userManager = userManager;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<PaginatedResult<InvoiceListViewModel>> Handle(InvoiceSearchCommand request, CancellationToken cancellationToken)
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

        var queryInvoices = query.Include(i => i.Room)
            .ThenInclude(r => r.House)
            .Include(i => i.Room)
            .ThenInclude(r => r.Tenants).Where(i => i.Room.Tenants.Any(t => t.IsRepresentative))
            .AsNoTracking()
            .AsQueryable();

        int total = await queryInvoices.CountAsync(cancellationToken);
        var result = await queryInvoices.Skip(request.PageSize * (request.PageNumber - 1)).Take(request.PageSize).ToListAsync();

        var viewmodels = _mapper.Map<IEnumerable<InvoiceListViewModel>>(result);

        return new PaginatedResult<InvoiceListViewModel>(request.PageNumber, request.PageSize, total, viewmodels);
    }
}
