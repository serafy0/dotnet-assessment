using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.BackgroundWorkerService;
public class BackgroundWorkerService : BackgroundService
{
    readonly ILogger<BackgroundWorkerService> _logger;

    private readonly IServiceProvider _serviceProvider;

    public BackgroundWorkerService(ILogger<BackgroundWorkerService> logger, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;

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

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }

    }
}