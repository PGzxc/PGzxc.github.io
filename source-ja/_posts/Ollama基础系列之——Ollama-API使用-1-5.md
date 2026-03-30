---
title: Ollama基础系列之——Ollama API使用(1.5)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: feff9514
date: 2026-03-30 16:26:18
---
## 一 概述

```
本文介绍：
 - 文本生成
 - Chat 对话
 - 开发集成
```

<!--more-->

## 二 API使用

Ollama 提供 OpenAI 风格 API

### 2.1 文本生成

```
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "hello"
}'
```

### 2.2 Chat 对话

```
curl http://localhost:11434/api/chat -d '{
  "model": "llama3",
  "messages": [
    { "role": "user", "content": "hello" }
  ]
}'

说明：
默认端口：11434
```

### 2.3 开发集成

```
支持：
 -Python
 -Node.js
 -LangChain
 -自建 API 网关
```

