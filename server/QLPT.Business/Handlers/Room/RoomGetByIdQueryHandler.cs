using System;
using AutoMapper;
using MediatR;
using QLPT.Business.ViewModels;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomGetByIdQueryHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<RoomGetByIdQuery, RoomViewModel>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<RoomViewModel> Handle(RoomGetByIdQuery request, CancellationToken cancellationToken)
    {
        var query = await _unitOfWork.RoomRepository.GetByIdAsync(request.Id);

        return _mapper.Map<RoomViewModel>(query);
    }
}
