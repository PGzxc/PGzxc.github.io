---
title: Ollama开发系列之——高级能力与AI工程实践(2.7)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 5a8c0e86
date: 2026-03-31 16:52:28
---
## 一 概述

```
本文介绍：
 - Ollama高级能力与AI工程实践
 - RAG + Agent 实战
 - 用 Ollama 构建可落地 AI 系统(RAG + Agent)
```

<!--more-->

## 二 什么是 AI 工程

### 2.1 现代 AI 应用架构

```
用户问题
   ↓
LLM（Ollama）
   ↓
RAG（知识检索）
   ↓
Tool（函数调用）
   ↓
最终答案
```

### 2.2 核心能力 3 件套

| 能力  |   能力   |
| :---: | :------: |
|  LLM  | 生成答案 |
|  RAG  | 提供知识 |
| Agent | 执行动作 |

## 三 Embedding + RAG

### 3.1 RAG 是什么？

```
1. 概念
Retrieval-Augmented Generation（检索增强生成）

2.流程：
问题 → 向量 → 检索 → 拼接上下文 → LLM回答
```

### 3.2 Ollama Embedding

```
curl http://localhost:11434/api/embed -d '{ "model": "gemma3", "input": "Ollama 是什么？" }'
```

### 3.3 Python RAG 最小实现(可直接运行)

```
1. Python RAG 最小实现
import requests
import numpy as np

def embed(text):
    res = requests.post(
        "http://localhost:11434/api/embed",
        json={"model": "gemma3", "input": text}
    )
    return res.json()["embedding"]

docs = [
    "Ollama 是本地大模型运行工具",
    "RAG 是一种结合检索和生成的方法"
]

doc_embeddings = [embed(d) for d in docs]

def search(query):
    q_emb = embed(query)
    scores = [np.dot(q_emb, d) for d in doc_embeddings]
    return docs[np.argmax(scores)]

context = search("Ollama 是什么")

res = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "gemma3",
        "prompt": f"基于以下内容回答：{context}"
    }
)

print(res.json())

2.功能已经实现：本地知识库问答(RAG)
```

## 四 Tool Calling(Agent 核心)

### 4.1 什么是 Tool Calling？

```
让 AI 调用函数，而不是只会“说话”
```

### 4.2 示例：查天气工具

```
def get_weather(city): return f"{city} 今天 25°C 晴天"
```

### 4.3 Agent 执行流程

```
用户：广州天气
↓
AI：调用 get_weather
↓
返回结果
↓
AI总结
```

### 4.4 简化实现(核心逻辑)

```
1. 简化实现
query = "广州天气"

if "天气" in query:
    result = get_weather("广州")

    res = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma3",
            "prompt": f"用户问：{query}，工具结果：{result}"
        }
    )

    print(res.json())

2.说明：这就是最基础 Agent
```

## 五 多模态与上下文

### 5.1 多模态能力(图像理解)

```
1  使用模型
-运行：ollama run llava
-能力：图片描述/OCR/视觉问答

2.应用场景
-发票识别
-UI 分析
-图片问答
```

### 5.2 上下文(Context)优化

```
1. 什么是 Context Length？
模型一次能“记住”的内容长度

2. 优化策略
-限制输入长度
-使用 RAG 替代长上下文
-分段处理

3. Modelfile 控制
PARAMETER num_ctx 4096
```

## 六 完整项目：本地 AI 助手(RAG + Agent)

### 6.1 架构

```
用户输入
   ↓
RAG 检索
   ↓
Tool 判断
   ↓
Ollama API
   ↓
返回结果
```

### 6.2 最小项目结构

```
project/
 ├── app.py
 ├── rag.py
 ├── tools.py
```

### 6.3 app.py(核心)

```
from flask import Flask, request
import requests

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    query = request.json["query"]

    # 模拟工具调用
    if "天气" in query:
        context = "广州今天晴天 25°C"
    else:
        context = "Ollama 是本地大模型工具"

    res = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen3:8b",
            "prompt": f"问题：{query}\n参考：{context}"
        }
    )

    return res.json()

app.run(3000)
```

### 6.4 功能实现

```
到这里你已经拥有：

-本地 AI 服务
-知识库能力
-Agent 基础能力
```

## 七 建议

### 7.1 生态集成(推荐)

```
1. AI 编程 Agent
OpenClaw：ollama launch openclaw

2. IDE 集成
IDE：Visual Studio Code
插件：Cline/Continue

3. 自动化
-n8n
-Zapier（类）
```

### 7.2 模型选择(工程实践)

| 场景 |    模型     |
| :--: | :---------: |
| GAG  |   gemma3    |
| 编程 | qwen3-coder |
| 推理 |  deepseek   |

### 7.3 工程建议

```
1. 不要直接用大模型：
先用：gemma3:4b

2. RAG 优先于大模型：
提升效果最明显

3. Agent 慢慢加：
不要一开始就复杂
```

