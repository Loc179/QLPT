using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<RoomDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(RoomDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.RoomRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("Room not found");
        }

        _unitOfWork.RoomRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
