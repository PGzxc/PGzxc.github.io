---
title: MimiClaw开发之——保姆级教程
categories:
  - AI
  - 养虾
  - MimiClaw
tags:
  - MimiClaw
abbrlink: e21e6580
date: 2026-04-03 21:20:49
---
## 一 概述

```
本文介绍：
 - 芯片上的口袋 AI 助理MimiClaw
 - 把 AI 跑在一块 5 美元的芯片上
```

<!--more-->

## 二 MimiClaw是什么？

```
MimicLaw（又叫 MimiClaw） 是一个开源项目，它可以：
在 ESP32-S3 微控制器（约 5 美元）上运行 AI Agent

而且：
-不需要 Linux
-不需要 Node.js
-不需要服务器 / VPS
-不需要树莓派

直接“裸机运行”（Bare Metal）
简单理解：
它把一个“AI助手”塞进了一块像 U 盘一样的小芯片里
```

## 三 核心能力

### 3.1 AI Agent

```
MimiClaw 实现了类似 LangChain / AutoGPT 的能力：

-LLM推理（Claude / GPT）
-工具调用（搜索 / 任务 / IO）
-记忆系统（长期上下文）
-自主任务调度

本质：一个完整 Agent 系统跑在单片机上
```

### 3.2 本地记忆

```
1.MimiClaw 的记忆不是数据库，而是：

SOUL.md      # AI人格
USER.md      # 用户信息
MEMORY.md    # 长期记忆

2.特点：

-可读可改（Markdown）
-断电不丢
-本地存储（隐私安全）

这其实就是“轻量版 RAG + Memory
```

### 3.3 超低资源运行

```
1.运行环境：
芯片：ESP32-S3
功耗：约 0.5W
语言：C
代码量：约 5000 行

2.比一个浏览器标签还轻
```

### 3.4 通信方式

```
1.支持：
-Telegram Bot
-WebSocket
-HTTP API

2.可以：
手机发消息 → 芯片 → AI回复
```

## 四 架构解析

### 4.1 整体架构

```
用户（Telegram）
        ↓
ESP32-S3（MimiClaw）
        ↓
Agent循环（ReAct）
        ↓
调用LLM（Claude / GPT / Ollama）
        ↓
工具执行（搜索 / 定时任务）
        ↓
写入本地记忆（SPIFFS）
```

### 4.2 关键点

```
1. 本地执行 Agent
-不是服务器，是芯片在跑逻辑

2. LLM 可云可本地
-默认：Claude / OpenAI API
-进阶：接 Ollama（本地模型）

3. 存储在 Flash

使用：
-SPIFFS 文件系统
-NVS 持久化
```

## 五  能做什么？(真实应用)

### 5.1 智能家居中枢

```
控制 GPIO 设备
自动化规则执行
本地记忆用户习惯
```

### 5.2  随身 AI 助理

```
插充电宝就能用
24 小时在线
Telegram 随时对话
```

### 5.3 工业边缘 AI

```
数据采集
自动判断异常
定时上报

适合无人值守场景
```

### 5.4 嵌入式 + AI 学习项目

```
非常适合这种背景:客户端 + AI + 嵌入式：
这是一个顶级实战项目
```

## 六 MimicLaw vs Ollama

### 6.1 对比

|    对比项    |   MimiClaw   |   Ollama    |
| :----------: | :----------: | :---------: |
|   运行环境   |  ESP32 芯片  | PC / 服务器 |
|   资源需求   |     极低     |    较高     |
| 是否本地推理 |    不支持    |    支持     |
|  Agent能力   |     支持     |   需框架    |
|    便携性    |    5颗星     |    1颗星    |
|   使用门槛   | 高（嵌入式） |     低      |

### 6.2 一句话总结

```
Ollama = 本地模型工具
MimiClaw = 嵌入式 AI Agent
```

## 七 优缺点分析

### 7.1  优点

```
极低成本（≈￥30硬件）
隐私安全（本地存储）
可离线扩展（接 Ollama）
真正“AI硬件化”
```

### 7.2 缺点

```
需要嵌入式基础（ESP32）
默认依赖云 API（Claude / GPT）
性能受限（不能本地跑大模型）
```

## 八 安装方式

### 8.1 官方安装

```
openclaw install memovai/mimiclaw
```

### 8.2  实际流程

```
准备 ESP32-S3 开发板
安装 ESP-IDF
编译固件
烧录设备
配置 WiFi + API Key
绑定 Telegram
```

## 九 进阶玩法

### 9.1 接入 Ollama(本地大模型)

```
实现：
-芯片 = Agent
-本地电脑 = 推理

完全摆脱云 API
```

### 9.2 做一个 AI IoT 系统

```
组合：
MimiClaw（控制层）
Home Assistant（自动化）
NAS（数据存储）
```

### 9.3 自定义 Agent

```
你可以扩展：
自定义工具（Tool）
自定义记忆结构
自定义行为逻辑
```

## 十 总结一句话

```
MimicLaw = AI Agent 的“嵌入式版本”
```

