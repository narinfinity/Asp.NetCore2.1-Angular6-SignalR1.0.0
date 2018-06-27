using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace my_new_app
{
    //[Authorize]
    public class ChatHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("Connected", "started");
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("Disconnected", ex.Message);
        }

        public async Task MyMethod(object data)
        {
            await Clients.AllExcept(Context.ConnectionId).SendAsync("MyMethod", data);
        }
    }
}