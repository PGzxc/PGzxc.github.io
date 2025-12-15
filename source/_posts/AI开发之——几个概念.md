---
title: AI开发之——几个概念
categories:
  - 开发
  - R-AI开发助手
  - 基础
tags:
  - 基础
abbrlink: 7c5fbb8e
date: 2025-12-15 10:42:02
---
## 一 概述

```
本文介绍AI中的两个概念：
-Augment
-MCP
```

<!--more-->

## 二 Augment

### 2.1 Augment 是什么？

```
-Augment 更像一个 AI 高级工程师/Tech Lead
-Augment 不是一个具体技术标准，而是一类 AI 编程理念
-让 AI 不只是“写代码”，而是“理解整个工程并长期参与开发”
-代表产品：Augment Code(也常被拿来和 Cursor、Copilot 对比)
```

### 2.2 Augment 和 Copilot/Cursor 的区别

|    对比项     | Copilot | Cursor | Augment  |
| :-----------: | :-----: | :----: | :------: |
|   代码补全    |   强    |   强   |    强    |
|  跨文件理解   |  一般   |   好   |  非常强  |
| 项目级上下文  |    X    |  局部  | 长期记忆 |
| 架构分析能力  |    X    |  一般  | 核心能力 |
| 重构/技术决策 |    X    |  部分  |   强项   |

### 2.3 Augment 解决什么问题

```
特别适合：
-大型项目 / Monorepo
-老项目、历史包袱重的代码
-新人接手项目
-架构调整、跨端改造
```

### 2.4 一句话总结

```
Augment = 站在“工程全局”角度思考的 AI 编程助手
```

## 三 MCP(Model Context Protocol)

### 3.1 MCP 的定义

```
-MCP = Model Context Protocol(模型上下文协议)
-由 Anthropic（Claude）提出的开放标准
-1句话解释：用统一协议，把外部世界安全地接入 AI
```

### 3.2 MCP 解决了什么问题

```
1、传统 AI 的问题：
-只能聊天
-看不到你的真实项目
-无法访问本地工具、数据库、文件

2、MCP
MCP让AI 具备“连接现实系统”的能力
```

### 3.3 MCP 能接入哪些东西

|   类型   |         示例          |
| :------: | :-------------------: |
| 本地文件 |  项目代码、配置文件   |
| Git 仓库 |    提交记录、Diff     |
|  数据库  |    SQLite / MySQL     |
| 系统工具 | ffmpeg / adb / docker |
| 私有系统 |     NAS、内部 API     |

说明： MCP 相当于 AI 的“标准化扩展接口(USB)

### 3.4 MCP 架构(简化)

```
AI 模型(Claude/GPT)
        ↓
    MCP Client
        ↓
    MCP Server
        ↓
文件/工具/数据/系统
```

### 3.5 MCP 和 Plugin / Tool Calling 的区别

|    对比项    | Plugin | Tool Calling |  MCP   |
| :----------: | :----: | :----------: | :----: |
|  是否标准化  | 不支持 |    不支持    |  支持  |
| 支持本地资源 | 不支持 |     部分     |  支持  |
|   扩展能力   |  一般  |     一般     |  极强  |
|   安全隔离   |  一般  |     一般     | 更完善 |

### 3.6 一句话总结 

```
MCP = 让 AI 从“能说”变成“能做”的关键基础设施
```

## 四 Augment + MCP

### 4.1  **理想组合形态**

```
-Augment：负责理解工程、分析架构、做技术决策
-MCP：负责接入真实代码、工具和系统执行
```

### 4.2 使用场景

```
AI 通过 MCP 读取你的 Android 项目
-分析音视频模块
-调用 ffmpeg / gradle / adb
-给出可落地的重构方案
```

## 五 最终一句话总结

```
Augment：AI 变成“工程级搭档”
MCP：AI 拥有“连接现实世界的手和脚”
```

