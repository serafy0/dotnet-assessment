using backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class StockHub : Hub
    {
        public async Task SendUpdates(List<Stock> stocks)
        {
            await Clients.All.SendAsync("PriceUpdates", stocks);
            await Clients.All.SendAsync("transferStockData", stocks);

        }
    }
}