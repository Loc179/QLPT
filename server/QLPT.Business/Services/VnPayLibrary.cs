using System;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace QLPT.Business.Services;

public class VnPayLibrary
{
    private readonly SortedList<string, string> _requestData = new();

    public void AddRequestData(string key, string value)
    {
        _requestData[key] = value;
    }

    public string CreateRequestUrl(string baseUrl, string hashSecret)
    {
        var queryString = new StringBuilder();
        foreach (var kv in _requestData)
        {
            queryString.AppendFormat("{0}={1}&", WebUtility.UrlEncode(kv.Key), WebUtility.UrlEncode(kv.Value));
        }

        var rawData = queryString.ToString().TrimEnd('&');
        var secureHash = HmacSHA512(hashSecret, rawData);
        return $"{baseUrl}?{rawData}&vnp_SecureHash={secureHash}";
    }

    private static string HmacSHA512(string key, string inputData)
    {
        var keyBytes = Encoding.UTF8.GetBytes(key);
        var inputBytes = Encoding.UTF8.GetBytes(inputData);
        using var hmac = new HMACSHA512(keyBytes);
        var hashBytes = hmac.ComputeHash(inputBytes);
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }
}
