using System.Diagnostics;
using System.Net;
using System.Net.NetworkInformation;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using TodoApp.Api.Hubs;

namespace TodoApp.Api
{
    public class Program
    {
        public static int port = 0;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy
#if DEBUG
                        .WithOrigins("http://localhost:5173")
#endif
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });

            builder
                .Services.AddControllers()
                .PartManager.ApplicationParts.Add(new AssemblyPart(typeof(Program).Assembly));

            builder.Services.AddSignalR();

#if DEBUG
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
#endif

            var app = builder.Build();

#if DEBUG
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
#endif

            // Dynamic port assignment for both DEBUG and RELEASE
            port = GetAvailablePort(5000);
            builder.WebHost.UseUrls($"http://localhost:{port}");

            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();
            app.UseDefaultFiles(); // Serve index.html by default
            app.UseStaticFiles();  // Serve files from wwwroot

            // Map SignalR Hub
            app.MapHub<ClockHub>("/hub/clock");

            // Demo API endpoint
            app.MapGet("/api/demo", () => new { message = "It works! 🎉" });

            if (args.Any(x => x == "run_async"))
                app.RunAsync();
            else
                app.Run();
        }

        public static int GetAvailablePort(int startingPort)
        {
            IPEndPoint[] endPoints;
            List<int> portArray = new List<int>();

            IPGlobalProperties properties = IPGlobalProperties.GetIPGlobalProperties();

            // Get active connections
            TcpConnectionInformation[] connections = properties.GetActiveTcpConnections();
            portArray.AddRange(
                from n in connections
                where n.LocalEndPoint.Port >= startingPort
                select n.LocalEndPoint.Port
            );

            // Get active TCP listeners
            endPoints = properties.GetActiveTcpListeners();
            portArray.AddRange(from n in endPoints where n.Port >= startingPort select n.Port);

            // Get active UDP listeners
            endPoints = properties.GetActiveUdpListeners();
            portArray.AddRange(from n in endPoints where n.Port >= startingPort select n.Port);

            portArray.Sort();

            for (int i = startingPort; i < UInt16.MaxValue; i++)
                if (!portArray.Contains(i))
                    return i;

            return 0;
        }
    }
}