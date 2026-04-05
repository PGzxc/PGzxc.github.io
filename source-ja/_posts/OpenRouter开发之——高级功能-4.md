---
title: OpenRouter开发之——高级功能(4)
categories:
  - AI
  - AI模型
  - 聚合平台
  - OpenRouter
tags:
  - OpenRouter
abbrlink: 8168ab7b
date: 2026-04-05 21:07:26
---
## 一 概述

```
本文介绍：
 - Structured Output(结构化输出)
 - Function Calling(工具调用)
 - Streaming(流式输出)
 - Reasoning Token(推理模式)
 - Context Caching(缓存)
```

<!--more-->

## 二 高级功能

### 2.1 Structured Output(结构化输出)

```
1.格式：
"response_format": {
  "type": "json_schema"
}

2.说明：
保证输出 JSON 可解析
```

### 2.2 Function Calling(工具调用)

```
1.格式：
"tools": [...]

2.支持：
-自动调用函数
-多工具并行执行
```

### 2.3 Streaming(流式输出)

```
1.格式：
"stream": true

2.说明：
类似 ChatGPT 打字效果
```

### 2.4 Reasoning Token(推理模式)

```
1.适用于：
 -DeepSeek R1
 -GPT reasoning 模型

2.说明：
可控制推理深度
```

### 2.5 Context Caching(缓存)

```
降低成本 + 提升速度
```

