using System;
using AutoMapper;
using MediatR;
using QLPT.Data.UnitOfWorks;

namespace QLPT.Business.Handlers;

public class SupportRequestReplyCommandHandler(IMapper mapper, IUnitOfWorks unitOfWork) : IRequestHandler<SupportRequestReplyCommand, bool>
{
    private readonly IMapper _mapper = mapper;
    private readonly IUnitOfWorks _unitOfWork = unitOfWork;

    public async Task<bool> Handle(SupportRequestReplyCommand request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.SupportRequestRepository.GetByIdAsync(request.Id);

        if (entity == null)
        {
            throw new Exception("SupportRequest not found");
        }

        entity.AdminReply = request.AdminReply;
        entity.Status = 1;

        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}
