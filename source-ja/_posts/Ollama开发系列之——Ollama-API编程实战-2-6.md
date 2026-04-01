---
title: Ollama开发系列之——Ollama API编程实战(2.6)
categories:
  - AI
  - AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 1cd409ee
date: 2026-03-31 16:52:00
---
## 一 概述

```
本文介绍：
 - 使用 Ollama API 构建 AI 应用
 - CLI 只是测试，API 才是生产力
```

<!--more-->

## 二 API 基础概念

### 2.1 服务地址

```
默认地址：http://localhost:11434
```

### 2.2 API 风格

```
Ollama API ≈ OpenAI API(高度兼容)
```

### 2.3 常用接口一览

|     接口      |   作用   |
| :-----------: | :------: |
| /api/generate | 单次生成 |
|   /api/chat   | 多轮对话 |
|  /api/embed   | 向量嵌入 |
|   /api/tags   | 模型列表 |
|    /api/ps    | 运行状态 |

## 三 API请求

### 3.1 第一个 API 请求

```
1. 文本生成
curl http://localhost:11434/api/generate -d '{
  "model": "gemma3",
  "prompt": "介绍一下 Ollama"
}'

2. 返回示例
{
  "response": "Ollama 是..."
}
```

### 3.2 Chat 对话接口(推荐使用)

```
1. 请求示例
curl http://localhost:11434/api/chat -d '{
  "model": "gemma3",
  "messages": [
    { "role": "user", "content": "你好" }
  ]
}'

2. 多轮对话
{
  "messages": [
    { "role": "user", "content": "你好" },
    { "role": "assistant", "content": "你好！" },
    { "role": "user", "content": "介绍一下 AI" }
  ]
}
```

## 四 实战

### 4.1 Python 实战(后端开发)

```
1. 最简单调用

import requests
res = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "gemma3",
        "messages": [
            {"role": "user", "content": "你好"}
        ]
    }
)

print(res.json())

2. Streaming（流式输出）

import requests
res = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "gemma3",
        "prompt": "写一篇文章"
    },
    stream=True
)

for line in res.iter_lines():
    print(line)

3. 适合：
-聊天 UI
-实时输出
```

### 4.2 JavaScript 实战(前端/Node)

```
1. Node.js 示例
const res = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "gemma3",
    messages: [{ role: "user", content: "hello" }]
  })
});

const data = await res.json();
console.log(data);

2. 浏览器调用（注意）
需要解决：CORS/安全限制
建议：用后端转发
```

## 五 功能

### 5.1 Embedding(RAG 核心)

```
1. 请求
curl http://localhost:11434/api/embed -d '{
  "model": "gemma3",
  "input": "Ollama 是什么？"
}'

2. 返回
{
  "embedding": [0.123, 0.456, ...]
}

3.用途：
-向量数据库
-语义搜索
-RAG 系统
```

### 5.2 结构化输出(JSON 控制)

```
方法1：Prompt 控制
请用 JSON 格式返回结果

方法2：Modelfile 固化
SYSTEM Always output JSON

3.用于：后端接口/自动化系统
```

### 5.3 Tool Calling(高级能力)

```
1.说明：
让 AI 调用函数

2.示例流程：
-用户提问
-AI 判断需要调用工具
-返回 function call
-后端执行函数
-返回结果给 AI

3.应用：
-查天气
-查数据库
-自动执行脚本
```

## 六 完整项目示例

```
1.AI 接口服务(最小版)

from flask import Flask, request
import requests
app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    res = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "qwen3:8b",
            "messages": data["messages"]
        }
    )
    return res.json()

app.run(port=3000)

2.已经实现：
-本地 AI API
-类 ChatGPT 服务
```

## 七 开发建议

```
1. 模型选择
对话 → gemma3
编程 → Qwen3-Coder
推理 → DeepSeek-R1

2. API 使用建议
Chat 用 /api/chat
简单任务用 /api/generate

3. 性能优化
使用流式输出
控制上下文长度
```

