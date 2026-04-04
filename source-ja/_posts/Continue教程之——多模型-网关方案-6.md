---
title: Continue教程之——多模型+网关方案(6)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 97c0ff20
date: 2026-04-04 19:28:35
---
## 一 概述

```
本文介绍：
 -Continue + New API/One API/OpenRouter
 -多模型统一管理
 -自动切换模型
 -成本优化
```

<!--more-->

## 二 模型网关

### 2.1 为什么需要“模型网关”？

```
1.当你用 Continue 时，如果直接接多个模型，会遇到问题：

-每个工具都要单独配置 API
-模型切换麻烦
-成本不可控
-无法统一管理

2.解决方案：

模型网关（Model Gateway）
```

### 2.2 什么是模型网关？

```
1-可以理解为：
AI 版 API 网关（类似 Nginx）

2-架构
Continue / CLI
      ↓
模型网关
      ↓
本地模型 + 云模型
```

## 三 网关方案及架构

### 3.1 主流网关方案

```
1.New API(最推荐)

-多模型统一接入
-OpenAI 兼容
-支持计费 / 权限 / 路由


2.OpenRouter

在线聚合平台
特点：
- 多模型市场
- 按需付费

3. One API（旧版）
New API 的前身

4.自建网关
Node / Python 实现
```

### 3.2 核心架构设计

1-标准架构

```
Continue（IDE / CLI）
        ↓
统一入口（New API）
        ↓
    模型池：
```

2-最优方案

```
Continue
   ↓
CC Switch（切换器）
   ↓
New API（网关）
   ↓
多模型
```

3-职责划分

|   层级    |     作用      |
| :-------: | :-----------: |
| Continue  |    使用 AI    |
| CC Switch | 切换 Provider |
|  New API  |   管理模型    |
|  Ollama   |   本地推理    |

## 四 网关接入及切换

### 4.1 Continue 接入网关

```
1-配置方式（统一入口）
{
  "models": [
    {
      "title": "统一模型入口",
      "provider": "openai",
      "model": "gpt-4o-mini",
      "apiBase": "http://localhost:3000/v1",
      "apiKey": "sk-xxx"
    }
  ]
}

2-关键点：
Continue 只连接一个地址
```

### 4.2 多模型智能切换

```
策略 1：按任务分配
 -日常补全：本地（Ollama）
 -复杂逻辑：GPT
 -长文本：Claude
 
策略 2：按成本控制 
-低成本 → 本地模型
-高质量 → 云模型

策略 3：自动降级
GPT 不可用 → 自动切 Ollama

策略 4：负载均衡
多个模型 → 分流请求
```

## 五 实战

### 5.1 New API 配置思路

```
1.添加模型

例如：
- Ollama（本地）
- GPT
- Claude

2.设置路由规则

简单请求 → qwen
复杂请求 → gpt

3.统一 key 管理
Continue → 一个 key
```

### 5.2 结合 CC Switch

```
1、工具：CC Switch
作用：一键切换 Provider

二、推荐玩法：

模式 1：开发模式
全部走本地（Ollama）

模式 2：高质量模式
切换到 GPT / Claude

模式 3：自动模式
CC Switch + New API 自动路由
```

### 5.3 企业级架构

```
1-架构图
开发者（IDE / CLI）
        ↓
Continue
        ↓
网关（New API）
        ↓
模型池（本地 + 云）
        ↓
日志 / 计费 / 权限

2-企业能力
-API 统一管理
-成本统计
-权限控制
-审计日志
-多用户支持
```

## 六 常见问题

```
1.模型切换混乱
解决：统一走网关

2.成本失控
解决：优先本地模型

3.响应慢
解决：本地优先 + 云兜底
```

## 七 本篇总结

```
1-多模型网关的本质
AI 调度系统

2-解决的是：
-模型选择问题
-成本问题
-稳定性问题
-管理问题
```

