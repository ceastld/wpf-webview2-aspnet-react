# 测试 API 连接脚本
Write-Host "🔍 Testing API Connection..." -ForegroundColor Green

# 测试端口 5000
Write-Host "`n📡 Testing port 5000..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/demo" -TimeoutSec 5
    Write-Host "✅ Port 5000: Status $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Port 5000: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试端口 5001
Write-Host "`n📡 Testing port 5001..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5001/api/demo" -TimeoutSec 5
    Write-Host "✅ Port 5001: Status $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Port 5001: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试 Todo API
Write-Host "`n📡 Testing Todo API on port 5000..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/todo" -TimeoutSec 5
    Write-Host "✅ Todo API: Status $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Todo API: $($_.Exception.Message)" -ForegroundColor Red
}

# 检查进程
Write-Host "`n🔍 Checking running processes..." -ForegroundColor Yellow
$processes = Get-Process | Where-Object { $_.ProcessName -like "*TodoApp*" -or $_.ProcessName -like "*dotnet*" }
if ($processes) {
    Write-Host "Found processes:" -ForegroundColor Green
    $processes | ForEach-Object { Write-Host "  - $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor White }
} else {
    Write-Host "❌ No TodoApp or dotnet processes found" -ForegroundColor Red
}

# 检查端口占用
Write-Host "`n🔍 Checking port usage..." -ForegroundColor Yellow
$ports = @(5000, 5001, 5173)
foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        Write-Host "✅ Port $port is in use" -ForegroundColor Green
    } else {
        Write-Host "❌ Port $port is not in use" -ForegroundColor Red
    }
}
