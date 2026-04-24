---
title: OpenClaw开发之——本地LLM+在线API混合配置指南(2.9)
categories:
  - AI
  - 养虾
  - OpenClaw
tags:
  - OpenClaw
abbrlink: e45bd4f3
date: 2026-04-24 08:55:55
---
## 一 概述

```
本文适用于：
- 已完成 openclaw onboard / init 的用户

目标：
- 配置本地模型（Ollama）
- 配置在线模型（Gemini）
- 实现主模型 + 备用模型（fallback）机制
```

<!--more-->

## 二 配置本地 LLM(Ollama)

### 2.1 安装 & 启动

```
1.Ollama官网：
https://ollama.com/

2.启动服务
-macOS/Linux：ollama serve 
-Windows：启动 Ollama 桌面版(自动运行)
```

### 2.2 下载模型(推荐)

```
# 通用模型（推荐）
ollama pull llama3.3

# 代码模型（可选）
ollama pull deepseek-coder-v2

# 中文优化（可选）
ollama pull qwen2.5
```

### 2.3 验证是否成功

```
ollama list
或：
curl http://127.0.0.1:11434/api/tags
```

### 2.4 配置 OpenClaw 使用 Ollama

```
1.设置本地“伪 Key”(必须有)
openclaw config set models.providers.ollama.apiKey "ollama-local"

2.或环境变量(推荐)
export OLLAMA_API_KEY=ollama-local #macOS/Linux
setx OLLAMA_API_KEY ollama-local #Windows(PowerShell)

3.默认地址：
http://127.0.0.1:11434
```

## 三 配置在线 LLM(Gemini)

### 3.1 获取 API Key

```
1.平台：Google AI Studio

2.步骤：
-登录 Google 账号
-点击 Create API Key
-复制 Key
```

### 3.2 配置 Gemini

```
方式1(推荐)
 openclaw onboard --auth-choice gemini-api-key

方式二(命令行)
 openclaw config set models.providers.google.apiKey "你的API_KEY"

方式三(环境变量，推荐)
 export GEMINI_API_KEY=your_key # macOS / Linux
 setx GEMINI_API_KEY your_key # Windows
```

### 3.3 多 Key(防限流)

```
openclaw config set models.providers.google.apiKeys '["key1","key2"]'
```

## 四 混合模型配置

### 4.1 混合策略

```
1.混合策略
主模型（Primary）：→ 本地 Ollama（免费 / 隐私 / 无网络依赖）
后备模型（Fallbacks）：→ Gemini（高智能 / 长上下文 / 复杂任务）

2.一句话理解
简单任务 → 本地跑
复杂任务 → 自动切 Gemini

3.支持系统
Windows / macOS / Linux
```

### 4.2 设置主模型 + fallback

```
# 主模型（本地）
openclaw config set agents.defaults.model.primary "ollama/llama3.3"

# 后备模型（在线）
openclaw config set agents.defaults.model.fallbacks '[
  "google/gemini-2.0-flash",
  "google/gemini-1.5-pro"
]'
```

### 4.3 设置模型别名(可选)

```
openclaw config set agents.defaults.model.models.ollama/llama3.3.alias "本地模型"
openclaw config set agents.defaults.model.models.google/gemini-2.0-flash.alias "Gemini快速"
```

### 4.4 模型格式说明

```
1.格式：
provider/model_name

2.常用模型
本地：
ollama/llama3.3
ollama/qwen2.5

在线：
google/gemini-2.0-flash
google/gemini-1.5-pro
```

## 五 重启与验证

### 5.1 重启服务

```
openclaw gateway restart
```

### 5.2 查看状态

```
openclaw gateway status --verbose
```

### 5.3 测试混合效果

```
openclaw chat "用中文介绍一下自己"

预期行为：
简单问题 → Ollama
复杂问题 → 自动切 Gemini

3.查看日志：
openclaw gateway logs --follow
```

