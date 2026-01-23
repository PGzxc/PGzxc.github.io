---
title: NET开发之——.NET 技术体系
categories:
  - 开发
  - E-桌面开发
  - .NET
tags:
  - .NET
abbrlink: '65109158'
date: 2025-07-07 15:22:45
---
## 一 概述

```
.NET 技术体系是微软打造的一套跨平台、跨设备的开发平台，
用于构建 Web、桌面、移动、云、游戏、物联网（IoT）等各种应用。
它涵盖了语言、运行时、开发框架、工具链等多个维度，具有统一性、灵活性与可扩展性
```

<!--more-->

## 二 .NET 技术体系整体结构图

```
┌──────────────────────────────────────────┐
│                .NET 技术体系总览                │
├──────────────────────────────────────────┤
│ 1. 运行时层（Runtime）                     │
│    └── CoreCLR / Mono / NativeAOT         │
│                                            │
│ 2. 语言层（Languages）                    │
│    └── C#, VB.NET, F#, Razor 等            │
│                                            │
│ 3. 开发框架（Application Models）         │
│    ├── ASP.NET Core（Web 应用）            │
│    ├── Blazor（Web UI，C#写前端）          │
│    ├── WinForms / WPF（桌面）              │
│    ├── MAUI / Xamarin（跨平台客户端）      │
│    ├── Worker Service（后台服务）          │
│    └── Unity（游戏）                       │
│                                            │
│ 4. 标准库（Base Class Library, BCL）      │
│    └── System.* 命名空间，统一 API         │
│                                            │
│ 5. 工具链 & 平台（Tooling）               │
│    ├── Visual Studio / VS Code             │
│    ├── CLI（dotnet）                       │
│    ├── NuGet 包管理                         │
│    └── DevOps：Azure DevOps / GitHub CI    │
└──────────────────────────────────────────┘

```

## 三 关键组成模块说明

### 3.1 运行时 Runtime

| 运行时名称 |                   用途与特点                    |
| :--------: | :---------------------------------------------: |
|  CoreCLR   |      .NET 核心运行时，运行托管代码，跨平台      |
|    Mono    |            更轻量、用于移动端和 IoT             |
| NativeAOT  | 提前编译成本地代码（原 AOT 模式），提升启动性能 |

### 3.2 编程语言

|   语言   |              特点与应用               |
| :------: | :-----------------------------------: |
|    C#    | 最主流语言，面向对象，适用于所有场景  |
|    F#    |  函数式编程，适合数据处理、科学计算   |
|  VB.NET  |   面向对象，语法接近 VB 老用户群体    |
|  Razor   | 类似 HTML 的 C# 模板语法，用于 Blazor |
| Q#(独立) |         用于量子计算(非主流)          |

### 3.3 应用开发模型

|      类型      |         框架          |         场景          |
| :------------: | :-------------------: | :-------------------: |
|      Web       | ASP.NET Core, Blazor  | 构建 Web API / Web UI |
|      桌面      |     WinForms, WPF     |   构建 Windows GUI    |
|  跨平台客户端  | MAUI(新)、Xamarin(旧) | 构建 Android/iOS/桌面 |
|    后台任务    |    Worker Service     | 守护进程、计划任务等  |
|    游戏开发    |     Unity(用 C#)      |   2D/3D 跨平台游戏    |
| IoT / 微控制器 | Meadow, nanoFramework |    嵌入式设备开发     |

### 3.4 标准类库 BCL(Base Class Library)——提供统一的 API

```
文件操作（System.IO）
网络请求（System.Net.Http）
LINQ 查询（System.Linq）
多线程（System.Threading）
JSON、XML（System.Text.Json）
```

### 3.5 工具与生态

|      工具/平台      |            说明             |
| :-----------------: | :-------------------------: |
|    Visual Studio    |     最强 IDE，功能齐全      |
|       VS Code       | 跨平台轻量编辑器，支持插件  |
|     dotnet CLI      | 命令行工具，如 `dotnet new` |
|        NuGet        |         包管理系统          |
| Azure DevOps/GitHub |  CI/CD、部署、DevOps 支持   |

## 四 跨平台能力

|  系统/平台  |     是否支持     |
| :---------: | :--------------: |
|   Windows   |        ✅         |
|    Linux    |        ✅         |
|    macOS    |        ✅         |
| Android/iOS |    ✅（MAUI）     |
| Web（前端） |   ✅（Blazor）    |
|   IoT设备   | ✅（Mono/Meadow） |

## 五 演进路线

|          版本          |          说明          |
| :--------------------: | :--------------------: |
| .NET Framework（2002） | Windows-only 桌面、Web |
|   .NET Core（2016）    |  跨平台、轻量、模块化  |
|     .NET 5（2020）     |  统一平台，替代前两个  |
|  .NET 6（2021，LTS）   |    首个稳定统一版本    |
|     .NET 7（2022）     |     新特性快速迭代     |
|  .NET 8（2023，LTS）   | 更强性能、更全面 MAUI  |
|     .NET 9（2024）     |         计划中         |

## 六 总结

```
.NET 是一个支持多语言、跨平台、多应用形态的统一开发平台，
从传统桌面到现代 Web、移动、游戏、云服务都可以用 .NET 构建，
是企业级开发、现代应用、云原生架构的主流选项之一。
```

