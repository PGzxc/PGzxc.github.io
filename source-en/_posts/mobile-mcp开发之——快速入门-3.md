---
title: mobile-mcp开发之——快速入门(3)
categories:
  - 开发
  - R-AI开发助手
  - mobile-mcp
tags:
  - mobile-mcp
abbrlink: 236c3804
date: 2025-12-16 09:00:43
---
## 一 概述

```
本文介绍：mobile-mcp快速入门
```

<!--more-->

## 二 环境要求

### 2.1 环境要求

```
-Node.js ≥18 + npm ≥9
-Android SDK / Platform Tools
-Xcode + Command Line Tools（iOS）
-至少一个模拟器或真机
```

### 2.2 真机开发要求

```
-Android 真机需开启开发者模式和 USB 调试。
-iOS 真机需配置证书和信任。
```

## 三 启动 Mobile-MCP Server

```
npx -y @mobilenext/mobile-mcp@latest

Server 启动后即可通过 MCP 协议接受客户端指令
```

## 四 MCP 客户端配置示例(Cursor / Claude 等)

```
{
  "mcpServers": {
    "mobile-mcp": {
      "command": "npx",
      "args": ["-y", "@mobilenext/mobile-mcp@latest"]
    }
  }
}
```

