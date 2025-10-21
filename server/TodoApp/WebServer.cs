using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Windows;
using System.Diagnostics;

namespace TodoApp
{
    public class WebServer
    {
        private WebApplication? _app;

        public int Start()
        {
            try
            {
                Trace.WriteLine("Starting web server...");
                TodoApp.Api.Program.Main(new string[] { "run_async" });

                var port = TodoApp.Api.Program.port;
                Trace.WriteLine($"Started on port {port}");
                Trace.WriteLine($"Swagger UI available at: http://localhost:{port}/swagger");
                return port;
            }
            catch (Exception ex)
            {
                Trace.WriteLine($"Server error: {ex.Message}");
                MessageBox.Show($"Server error: {ex.Message}");
                return 0;
            }
        }

        public void Stop() => _app?.StopAsync();
    }
}
