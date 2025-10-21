using Microsoft.AspNetCore.SignalR;

namespace TodoApp.Api.Hubs
{
    public class ClockHub : Hub
    {
        private static Timer? _timer;
        private static IHubContext<ClockHub>? _hubContext;

        public ClockHub(IHubContext<ClockHub> hubContext)
        {
            _hubContext = hubContext;
        }

        // When a client connects
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            
            // Start the timer if it's not already started
            _timer ??= new Timer(SendTimeToAllClients, null, TimeSpan.Zero, TimeSpan.FromSeconds(1));
        }

        // Method to send the time to all clients
        private static void SendTimeToAllClients(object? state)
        {
            _hubContext?.Clients.All.SendAsync("ReceiveTime", DateTime.Now.ToString("HH:mm:ss"));
        }

        // When a client disconnects
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}
