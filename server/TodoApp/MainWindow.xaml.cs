using System.Windows;

namespace TodoApp;

public partial class MainWindow : Window
{
    private readonly WebServer _server = new WebServer();

    public MainWindow()
    {
        InitializeComponent();
        Loaded += MainWindow_Loaded;
        Closed += (sender, e) => _server.Stop();
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        Console.WriteLine("Starting web server...");
        var port = _server.Start();
        await webView.EnsureCoreWebView2Async();

        if (port > 0)
        {
            Console.WriteLine($"Web server started on port {port}");
            Console.WriteLine($"Swagger UI: http://localhost:{port}/swagger");
            Console.WriteLine($"API: http://localhost:{port}/api");
        }

#if DEBUG
        webView.CoreWebView2.Navigate("http://localhost:5173");
#else
        webView.CoreWebView2.Navigate($"http://localhost:{port}");
#endif
    }
}