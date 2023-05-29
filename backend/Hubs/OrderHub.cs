using backend.Models;
using Microsoft.AspNetCore.SignalR;

namespace backend.Hubs
{
    public class OrderHub : Hub
    {
        public async Task SendUpdates(List<Order> order)
        {
            await Clients.All.SendAsync("SendOrder", order);

        }
    }
}