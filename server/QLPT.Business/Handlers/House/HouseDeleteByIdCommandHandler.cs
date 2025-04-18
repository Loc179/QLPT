using System;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class HouseDeleteByIdCommandHandler(IUnitOfWorks unitOfWork) : IRequestHandler<HouseDeleteByIdCommand, bool>
{
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(HouseDeleteByIdCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.HouseRepository.GetByIdAsync(request.Id);

        if(entity == null)
        {
            throw new Exception("House not found");
        }

        _unitOfWork.HouseRepository.Delete(entity);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
