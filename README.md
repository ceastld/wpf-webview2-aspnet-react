
# TodoApp - WPF + WebView2 + ASP.NET + React 混合应用

一个现代化的桌面应用程序，结合了 WPF、WebView2、ASP.NET Core 和 React 技术栈，提供跨平台的桌面应用体验。

## 🏗️ 项目架构

```
TodoApp/
├── client/                 # React 前端应用
│   ├── src/               # React 源代码
│   ├── dist/              # 构建输出
│   └── package.json       # 前端依赖
├── server/                # .NET 后端服务
│   ├── TodoApp/           # WPF 主应用程序
│   └── TodoApp.Api/       # ASP.NET Core Web API
├── publish/               # 生产构建输出
└── docs/                  # 项目文档
```

## 🚀 快速开始

### 环境要求

- **.NET 8.0 SDK** 或更高版本
- **Node.js 18+** 和 **pnpm** 包管理器
- **Windows 10/11** (WebView2 要求)
- **Visual Studio 2022** 或 **VS Code**

### 安装依赖

1. **安装 .NET 8.0 SDK**
   ```bash
   # 下载并安装 .NET 8.0 SDK
   # https://dotnet.microsoft.com/download/dotnet/8.0
   ```

2. **安装 Node.js 和 pnpm**
   ```bash
   # 安装 Node.js (推荐使用 nvm)
   # 然后安装 pnpm
   npm install -g pnpm
   ```

### 开发环境运行

#### 方法一：标准开发流程 (推荐)

1. **启动前端开发服务器**
   ```bash
   # 在项目根目录
   cd client
   pnpm install
   pnpm dev
   ```
   前端开发服务器将在 `http://localhost:5173` 启动

2. **启动 WPF 应用程序**
   ```bash
   # 新开一个终端窗口，在项目根目录
   cd server/TodoApp
   dotnet run
   ```
   WPF 应用会自动启动内嵌的 API 服务，无需单独启动后端

#### 方法二：仅启动 API 服务进行调试

如果需要单独调试 API 服务：
```bash
# 在项目根目录
cd server/TodoApp.Api
dotnet run
```

#### 方法二：使用 Visual Studio

1. 打开 `TodoApp.sln` 解决方案文件
2. 设置启动项目为 `TodoApp`
3. 按 F5 运行

### 生产环境构建

使用提供的 PowerShell 脚本进行一键构建：

```powershell
# 在项目根目录执行
.\publish.ps1
```

构建完成后，可执行文件位于 `publish/` 目录中。

## 📋 功能特性

- ✅ **现代化 UI**: 基于 React + Material-UI 的响应式界面
- 🔄 **实时更新**: 使用 SignalR 实现实时数据同步
- 🖥️ **桌面集成**: WPF + WebView2 提供原生桌面体验
- 🌐 **Web API**: RESTful API 和 Swagger 文档
- 📱 **响应式设计**: 支持不同屏幕尺寸
- 🎨 **主题支持**: 深色/浅色主题切换
- ⚡ **热重载**: 开发时支持前端热重载

## 🛠️ 开发指南

### 项目结构说明

- **client/**: React 前端应用，使用 Vite 构建工具
- **server/TodoApp/**: WPF 主应用程序，集成 WebView2
- **server/TodoApp.Api/**: ASP.NET Core Web API
- **publish/**: 生产构建输出目录

### 开发工作流

1. **启动开发环境**: 
   - 先启动 React 前端开发服务器 (`pnpm dev`)
   - 再启动 WPF 应用程序 (`dotnet run`)
   - WPF 会自动启动内嵌的 API 服务

2. **前端开发**: 在 `client/` 目录下进行 React 开发，支持热重载
3. **后端开发**: 在 `server/TodoApp.Api/` 目录下进行 API 开发
4. **集成测试**: 使用 WPF 应用程序测试完整功能

### API 文档

开发环境下，Swagger 文档可通过以下地址访问：
- `http://localhost:5000/swagger` (当 API 服务运行时)

### 测试 API 连接

使用提供的测试脚本：

```powershell
.\test-api.ps1
```

## 🔧 配置说明

### 端口配置

- **前端开发服务器**: 5173 (Vite 默认，用于开发时热重载)
- **后端 API 服务**: 5000+ (WPF 启动时自动分配可用端口)
- **WPF 应用**: 集成在桌面应用中，通过 WebView2 加载前端页面

### 环境变量

- `ASPNETCORE_ENVIRONMENT`: 开发/生产环境标识
- `ASPNETCORE_URLS`: API 服务监听地址

## 📦 部署说明

### 生产构建

```powershell
# 执行生产构建脚本
.\publish.ps1
```

构建过程包括：
1. 安装前端依赖
2. 构建 React 应用
3. 发布 WPF 应用程序
4. 复制静态文件到输出目录

### 分发说明

构建完成后，`publish/` 目录包含所有必要的文件：
- `TodoApp.exe`: 主应用程序
- `wwwroot/`: 前端静态文件
- 依赖的 .NET 运行时文件

## 🐛 故障排除

### 常见问题

1. **WebView2 运行时未安装**
   - 下载并安装 Microsoft Edge WebView2 运行时
   - https://developer.microsoft.com/en-us/microsoft-edge/webview2/

2. **端口冲突**
   - 检查 5000 和 5173 端口是否被占用
   - 使用 `netstat -ano | findstr :5000` 检查端口使用情况

3. **前端构建失败**
   - 确保 Node.js 和 pnpm 已正确安装
   - 删除 `node_modules` 和 `pnpm-lock.yaml`，重新安装依赖

4. **API 连接失败**
   - 确保后端 API 服务正在运行
   - 检查防火墙设置

### 调试技巧

- 使用浏览器开发者工具调试前端
- 使用 Visual Studio 调试 WPF 应用
- 查看控制台输出获取详细错误信息

## 📚 技术栈

- **前端**: React 19, TypeScript, Vite, Material-UI, Tailwind CSS
- **后端**: ASP.NET Core 8, SignalR, Swagger
- **桌面**: WPF, WebView2
- **构建工具**: .NET CLI, pnpm, Vite

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 本项目需要 Windows 环境运行，因为使用了 WPF 和 WebView2 技术。
