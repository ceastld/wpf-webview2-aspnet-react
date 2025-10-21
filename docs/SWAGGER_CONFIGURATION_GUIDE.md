# ASP.NET Core Swagger 配置指南

## 问题描述

在 ASP.NET Core 混合应用（WPF + WebView2 + ASP.NET Core + React）中，Swagger 无法正常访问，即使代码配置正确。

## 根本原因

**缺少 `Properties/launchSettings.json` 文件**，导致环境变量 `ASPNETCORE_ENVIRONMENT` 未正确设置。

## 关键发现

### 1. Swagger 依赖环境变量
```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

### 2. 环境变量设置
- 需要 `ASPNETCORE_ENVIRONMENT=Development`
- 通过 `launchSettings.json` 文件设置

### 3. 文件位置
```
Properties/launchSettings.json
```

## 解决方案

### 1. 创建 launchSettings.json 文件

在项目根目录创建 `Properties/launchSettings.json` 文件：

```json
{
  "profiles": {
    "TodoApp": {
      "commandName": "Project",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "applicationUrl": "http://localhost:5000"
    }
  }
}
```

### 2. 关键配置说明

| 配置项 | 说明 | 示例值 |
|--------|------|--------|
| `commandName` | 启动命令类型 | `"Project"` |
| `launchBrowser` | 是否自动打开浏览器 | `true` |
| `environmentVariables` | 环境变量设置 | `{"ASPNETCORE_ENVIRONMENT": "Development"}` |
| `applicationUrl` | 应用监听地址 | `"http://localhost:5000"` |

### 3. 多环境配置示例

```json
{
  "profiles": {
    "Development": {
      "commandName": "Project",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "applicationUrl": "http://localhost:5000"
    },
    "Staging": {
      "commandName": "Project",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Staging"
      },
      "applicationUrl": "http://localhost:5001"
    },
    "Production": {
      "commandName": "Project",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Production"
      },
      "applicationUrl": "http://localhost:5002"
    }
  }
}
```

## 项目结构

```
server/
├── TodoApp/                    # WPF 桌面应用
│   ├── Properties/
│   │   └── launchSettings.json    # WPF 项目的启动配置
│   ├── WebServer.cs               # 内嵌 Web 服务器
│   └── MainWindow.xaml.cs         # 主窗口
├── TodoApp.Api/               # ASP.NET Core API
│   ├── Properties/
│   │   └── launchSettings.json    # API 项目的启动配置
│   ├── Controllers/
│   │   └── TodoController.cs      # API 控制器
│   └── Program.cs                 # 应用程序入口
└── client/                     # React 前端
    └── src/
        └── components/
```

## 混合应用架构

### 1. WPF 项目
- **作用**：桌面应用程序容器
- **组件**：WebView2 控件显示 Web 内容
- **服务器**：内嵌 ASP.NET Core Web 服务器

### 2. ASP.NET Core API
- **作用**：提供 RESTful API 服务
- **功能**：Swagger 文档、数据接口
- **端口**：动态端口分配

### 3. React 前端
- **作用**：用户界面
- **开发**：Vite 开发服务器 (端口 5173)
- **生产**：静态文件服务

## 开发流程

### 1. 开发环境
```bash
# 启动 React 开发服务器
cd client
npm run dev

# 启动 WPF 应用
cd server/TodoApp
dotnet run
```

### 2. 生产环境
```bash
# 构建 React 应用
cd client
npm run build

# 发布 WPF 应用
cd server/TodoApp
dotnet publish -c Release
```

## 常见问题

### 1. Swagger 无法访问
**原因**：缺少 `launchSettings.json` 文件
**解决**：创建 `Properties/launchSettings.json` 并设置环境变量

### 2. 端口冲突
**原因**：多个应用使用相同端口
**解决**：使用动态端口分配或配置不同端口

### 3. 环境变量未设置
**原因**：`ASPNETCORE_ENVIRONMENT` 未正确设置
**解决**：在 `launchSettings.json` 中明确设置环境变量

## 最佳实践

### 1. 配置文件管理
- **版本控制**：将 `launchSettings.json` 纳入版本控制
- **环境区分**：开发/测试/生产环境使用不同配置
- **团队协作**：统一开发环境配置

### 2. 端口管理
- **动态分配**：使用 `GetAvailablePort()` 方法
- **冲突避免**：检查端口占用情况
- **配置统一**：确保 WPF 和 API 项目端口一致

### 3. 环境变量
- **明确设置**：不要依赖默认值
- **环境区分**：不同环境使用不同配置
- **安全考虑**：生产环境不暴露敏感信息

## 部署注意事项

### 1. 生产环境
- **删除配置文件**：生产部署时删除 `launchSettings.json`
- **环境变量**：通过系统环境变量设置
- **端口配置**：使用生产环境端口

### 2. 安全考虑
- **Swagger 禁用**：生产环境禁用 Swagger
- **错误信息**：简化错误信息暴露
- **日志级别**：调整日志输出级别

## 总结

`launchSettings.json` 文件是 ASP.NET Core 项目开发的重要配置文件，特别是对于混合应用：

1. **环境管理**：开发/测试/生产环境切换
2. **端口管理**：避免端口冲突，统一端口配置
3. **调试支持**：调试器配置，断点设置
4. **部署准备**：生产环境配置验证
5. **团队协作**：统一开发环境设置

这个经验对于 ASP.NET Core 混合应用开发非常重要，能够避免常见的配置问题，提高开发效率。
