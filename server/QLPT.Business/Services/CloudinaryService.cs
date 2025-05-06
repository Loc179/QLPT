using System;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using QLPT.API.Config;

namespace QLPT.Business.Services;

public class CloudinaryService : IImageHostingService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IOptions<CloudinarySettings> config)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(acc);
    }
    public async Task<string> UploadImageAsync(IFormFile file)
    {
        if (file.Length <= 0) throw new ArgumentException("Empty file");

        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "advertisement-images" // Tùy chỉnh thư mục
        };

        var result = await _cloudinary.UploadAsync(uploadParams);
        if (result.StatusCode != System.Net.HttpStatusCode.OK)
            throw new Exception("Cloudinary upload failed");

        return result.SecureUrl.ToString();
    }
}
