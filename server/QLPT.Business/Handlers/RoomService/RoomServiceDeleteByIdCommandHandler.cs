using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class RoomServiceDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<RoomServiceDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(RoomServiceDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.RoomServiceRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("RoomService not found");
        }

        _unitOfWork.RoomServiceRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
