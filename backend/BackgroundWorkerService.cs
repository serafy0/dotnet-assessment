using backend.Hubs;
using backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.BackgroundWorkerService;
public class BackgroundWorkerService : BackgroundService
{
    readonly ILogger<BackgroundWorkerService> _logger;

    private readonly IServiceProvider _serviceProvider;
    private readonly IHubContext<StockHub> _hubContext;


    public BackgroundWorkerService(IHubContext<StockHub> hubContext, ILogger<BackgroundWorkerService> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _hubContext = hubContext;

    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Service Started");
        while (!stoppingToken.IsCancellationRequested)
        {

            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<StockContext>();

            var stocks = await dbContext.Stocks.ToListAsync(stoppingToken);

            foreach (var stock in stocks)
            {
                var randomNum = (float)((new Random().NextDouble()) * 99) + 1;
                stock.Price = randomNum;
                stock.Prices.Add(new Price { Value = randomNum });
            }

            dbContext.UpdateRange(stocks);

            await dbContext.SaveChangesAsync(stoppingToken);

            await _hubContext.Clients.All.SendAsync("PriceUpdates", stocks);
            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }

    }
}