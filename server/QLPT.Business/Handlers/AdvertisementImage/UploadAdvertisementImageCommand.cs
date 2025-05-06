using System;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace QLPT.Business.Handlers;

public class UploadAdvertisementImageCommand : IRequest<int>
{
    public int AdvertisementId { get; set; }
    public IFormFile Image { get; set; } = default!;
}
