using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomServiceGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomServiceGetByIdQuery, RoomServiceViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<RoomServiceViewModel> Handle(RoomServiceGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.RoomServiceRepository.GetByIdAsync(request.Id);

        return _mapper.Map<RoomServiceViewModel>(query);
    }
}
