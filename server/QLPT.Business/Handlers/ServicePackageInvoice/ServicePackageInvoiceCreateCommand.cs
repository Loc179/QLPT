using System;
using MediatR;

namespace QLPT.Business.Handlers;

public class ServicePackageInvoiceCreateCommand : IRequest<bool>
{
    public Dictionary<string, string> VnPayData { get; set; }

    public ServicePackageInvoiceCreateCommand(Dictionary<string, string> vnPayData)
    {
        VnPayData = vnPayData;
    }

}
