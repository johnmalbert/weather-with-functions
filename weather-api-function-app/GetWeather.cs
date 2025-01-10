using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

public static class GetWeather
{
    private static readonly HttpClient httpClient = new HttpClient();

    [FunctionName("GetWeather")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        string city = req.Query["city"];
        
        if (string.IsNullOrEmpty(city))
        {
            return new BadRequestObjectResult("Please provide a city in the query string.");
        }

        string apiKey = Environment.GetEnvironmentVariable("OPENWEATHER_API_KEY");
        string apiUrl = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric";

        HttpResponseMessage response = await httpClient.GetAsync(apiUrl);
        if (!response.IsSuccessStatusCode)
        {
            return new BadRequestObjectResult("Error fetching weather data");
        }

        string result = await response.Content.ReadAsStringAsync();
        return new OkObjectResult(result);
    }
}
