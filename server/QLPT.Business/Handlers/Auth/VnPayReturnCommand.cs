using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class VnPayReturnCommand : IRequest<bool>
{
    public Dictionary<string, string> VnPayData { get; set; }

    public VnPayReturnCommand(Dictionary<string, string> vnPayData)
    {
        VnPayData = vnPayData;
    }
}
