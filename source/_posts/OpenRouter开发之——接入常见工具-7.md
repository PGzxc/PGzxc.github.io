---
title: OpenRouter开发之——接入常见工具(7)
categories:
  - AI
  - AI模型
  - 聚合平台
  - OpenRouter
tags:
  - OpenRouter
abbrlink: 8b4b01d3
date: 2026-04-05 21:08:59
---
## 一 概述

```
本文介绍：
 - VSCode / Cline / Continue
 - OpenAI SDK 复用
 - Agent 工具接入
```

<!--more-->

## 二 接入常见工具

### 2.1 VSCode / Cline / Continue

```
支持方式：

- 直接填 OpenRouter Key
- 或配置 baseURL
```

### 2.2 OpenAI SDK 复用-Node.js 示例

```
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});
```

### 2.3 Agent 工具接入

```
适配：
- Cline
- OpenCode
- OpenClaw

统一模型来源
```

## 三 OpenRouter vs 其他方案

### 3.1 对比

|    方案    |   类型    |    特点    |
| :--------: | :-------: | :--------: |
| OpenRouter | 云API网关 | 多模型统一 |
|   Ollama   | 本地运行  |    离线    |
|    vLLM    | 推理框架  |   高性能   |
|  LiteLLM   | 开源网关  |   可自建   |

### 3.2 结论

```
小团队 / 快速开发：OpenRouter
企业 / 数据敏感：自建网关
本地推理：Ollama
```

