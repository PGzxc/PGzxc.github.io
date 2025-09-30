---
title: Flutter开发之——MCP服务
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e442d53
date: 2025-09-30 09:34:37
---
## 一 概述

```
MCP(Model Context Protocol)，用以增强 Flutter 和 Dart 应用程序的 AI 辅助开发体验。
支持开发工具：Visual Studio(VSCode)、JetBrains IDEs、Xcode、Eclipse等
AI 编码助手：如 Cursor、Claude、Cline、RooCode 等
MCP能与您的 Flutter 应用程序交互，提供错误分析、UI 检查和动态工具注册等功能
```

<!--more-->

## 二 集成环境

* 系统：Windows 11 专业版 24H2
* 开发工具：VSCode
* AI助手：Copilot 
* 关联账号：Github
* 应用程序开发语言：Flutter(3.35.4)+Dart(3.9.2)
* 示例程序：[mcp_flutter](https://github.com/Arenukvern/mcp_flutter)

## 三 IDE集成(VSCode为例)

### 3.1 关联Github

| 1-找到Github | 2-登录 | 3-关联授权 |
| :----------: | :----: | :--------: |
|    ![][1]    | ![][2] |   ![][3]   |

### 3.2 安装插件

| 1-安装Copilot | 2-安装Dart | 3-安装MCP |
| :-----------: | :--------: | :-------: |
|    ![][4]     |   ![][5]   |  ![][6]   |

### 3.3 启用MCP服务

1、依次点击：View ——>Command Palette，输入以下内容`Preferences: Open User Settings`

![][7]

2、配置文件(settings.json)添加如下配置

```
"dart.mcpServer": true
```

##  四 运行示例项目

### 4.1 下载示例项目

1、mcp_flutter项目说明

```
https://github.com/Arenukvern/mcp_flutter
```

说明：

* flutter_test_app：测试项目
* mcp_server_dart：mcp服务端(本文已添加，忽略)
* mcp_server_dart：flutter_test_app引用的本地文件，使用仓库引用并修改

2、MCP Toolkit集成说明

```
1、添加依赖项： 在 pubspec.yaml 中添加 mcp_toolkit：
dependencies:
  mcp_toolkit: ^0.2.3
  
  
2、初始化 MCP Toolkit： 在您的 Flutter 应用程序中初始化 mcp_toolkit：
import 'package:mcp_toolkit/mcp_toolkit.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MCPToolkitBinding.instance.initialize();
  runApp(MyApp());
}


3、注册自定义工具： 使用 MCPToolkitBinding 注册自定义工具或资源：
MCPToolkitBinding.instance.addEntries([
  MCPCallEntry(
    id: 'custom_tool',
    type: MCPCallType.tool,
    description: 'A custom tool for AI interaction',
    handler: (params) async {
      return {'result': 'Custom tool executed!'};
    },
  ),
]);

4、验证工具注册： 使用 listClientToolsAndResources 命令检查工具是否正确注册
```

### 4.2 VSCode打开项目

1、VSCode打开mcp_flutter项目后，结构如下(mcp_toolkit依赖已修改)

![][8]

2、运行项目

```
flutter run //暂时使用web端替代
```

![][9]

3、运行效果图(web端)

![][10]

## 五 MCP调试应用

MCP 服务器提供了多种工具来增强 AI 辅助开发。以下是一些核心功能及其用法：

### 5.1 获取应用程序错误

```
1、功能：检索 Flutter 应用程序中的错误信息。

2、用法：

确保您的 Flutter 应用程序在调试模式下运行。
AI 助手Copilot内容输入：检索 Flutter 应用程序中的错误信息
MCP 服务器将通过 Error Monitor 捕获错误并返回简短的错误描述
```

![][11]

###  5.2 捕获屏幕截图

```
1、功能：捕获运行中应用程序的屏幕截图。

2、配置：

启动 MCP 服务器时启用 --https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter 标志：
dart run mcp_server_dart --https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter

可选：使用 --save-https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter 标志将截图保存为文件（自动清理旧截图）：
dart run mcp_server_dart --https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter --save-https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter

3、用法： 使用 AI 客户端提示：

捕获当前 Flutter 应用程序的屏幕截图。
```

### 5.3 获取视图详情

```
1、功能：返回应用程序视图的详细信息（如屏幕大小、像素比率）。
2、用法： 使用 AI 客户端提示：
获取 Flutter 应用程序的视图详细信息
```

### 5.4 动态工具注册

```
1、功能：允许 Flutter 应用程序在运行时注册自定义工具。

2、用法：

在您的 Flutter 应用程序中按照说明注册工具。
使用 AI 客户端提示调用自定义工具：执行自定义工具 'custom_tool'。
```

## 六 参考

* [Github—mcp_flutter](https://github.com/Arenukvern/mcp_flutter)
* [Install GitHub MCP Server in Copilot IDEs](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-other-copilot-ides.md)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/setup#_set-up-copilot-in-vs-code)
* [MCP developer guide](https://code.visualstudio.com/api/extension-guides/ai/mcp)
* [Dart中文官网—Dart and Flutter MCP server](https://dart.cn/tools/mcp-server)
* [pub.dev—mcp_toolkit](https://pub.dev/packages/mcp_toolkit)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-vs-login-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-author-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-author-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-copilot-install-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-dart-install-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-install-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-setting-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-struct-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-run-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-run-view-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mcp-error-11.png