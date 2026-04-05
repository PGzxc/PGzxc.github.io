---
title: OpenRouter开发之——快速开始(2)
categories:
  - AI
  - AI模型
  - 聚合平台
  - OpenRouter
tags:
  - OpenRouter
abbrlink: 80111e7f
date: 2026-04-05 21:04:57
---
## 一 概述

```
本文介绍：
 - OpenRouter获取API Key
 - OpenRouter调用示例
 - OpenRouter注意事项
```

<!--more-->

## 二 快速开始

### 2.1 获取 API Key

```
1.获取地址：
https://openrouter.ai/keys

2.步骤：
 -注册账号
 -创建 API Key
 -充值（按量计费）
```

### 2.2 基础调用(OpenAI兼容)

1-接口：

```
https://openrouter.ai/api/v1/chat/completions
```

2-示例(curl)：

```
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openrouter/openai/gpt-4o",
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'
```

### 2.3 关键点(官方)

```
- 使用 Bearer Token 认证
- 完全兼容 OpenAI SDK
- 只需修改：baseURL = "https://openrouter.ai/api/v1"


即可复用所有 OpenAI 代码 
```

