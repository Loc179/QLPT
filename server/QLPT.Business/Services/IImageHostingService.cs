using System;
using Microsoft.AspNetCore.Http;

namespace QLPT.Business.Services;

public interface IImageHostingService
{
    Task<string> UploadImageAsync(IFormFile file);
}
