using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class SeedStocks
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new StockContext(
            serviceProvider.GetRequiredService<DbContextOptions<StockContext>>());

        if (context.Stocks.Any(stock => stock.Name == "Genesis"))
        {
            return;
        }
        string[] stockNames = new string[] {
          "vianet",
          "Agritek",
          "Akamai",
          "Baidu",
          "Blinkx",
          "Blucora",
          "Boingo",
          "Brainybrawn",
          "Carbonite",
          "China Finance",
          "ChinaCache",
          "ADR",
          "ChitrChatr",
          "Cnova",
          "Cogent",
          "Crexendo",
          "CrowdGather",
          "EarthLink",
          "Eastern",
          "ENDEXX",
          "Envestnet",
          "Epazz",
          "FlashZero",
          "Genesis",
          "InterNAP",
          "MeetMe",
          "Netease",
          "Qihoo"
        };
        foreach (var stockName in stockNames)
        {

            context.Stocks.Add(
                new Stock
                {
                    Name = stockName,
                }

            );
        }
        context.SaveChanges();
    }
}
