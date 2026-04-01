---
title: Ollama实战之——Ollama微服务架构实战(3.9)
categories:
  - AI
  - AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 49243db8
date: 2026-03-31 17:13:24
---
## 一 概述

```
本文介绍：

 - 把“单体 AI 系统”拆成真正可扩展的微服务架构
```

<!--more-->

## 二 AI 微服务

### 2.1 为什么要做微服务？

```
当 AI 系统进入生产环境后，会遇到：

* 并发变高
* 模型变多
* 工具变复杂
* RAG 变重
* Workflow 变长

单体架构会迅速崩溃
```

### 2.2 单体问题

```
* 改一个功能要全量部署
* 模型和业务耦合
* 扩容困难
* 容易宕机连锁反应
```

### 2.3 微服务优势

|   能力   | 单体 | 微服务 |
| :------: | :--: | :----: |
|  扩展性  |  不  |   稳   |
| 独立部署 |  不  |   稳   |
| 故障隔离 |  不  |   稳   |
| 弹性扩容 |  不  |   稳   |

### 2.4 AI微服务整体架构

```
            ┌──────────────┐
            │ API Gateway  │
            └──────┬───────┘
                   │
   ┌───────────────┼────────────────┐
   │               │                │
┌──▼───┐      ┌────▼────┐     ┌────▼────┐
│LLM   │      │ RAG     │     │ Tool    │
│Service│      │ Service │     │ Service │
└──┬───┘      └────┬────┘     └────┬────┘
   │               │                │
   └──────┬────────┴───────┬────────┘
          ▼                ▼
     Workflow Engine   Memory DB
```

## 三 核心微服务拆解

### 3.1 LLM Service(模型服务)

```
1.说明：
专门负责推理

2.依赖：
* Ollama API
* GPU资源

3.示例：
from fastapi import FastAPI
import ollama
app = FastAPI()

@app.post("/chat")
def chat(prompt: str):
    return ollama.chat(
        model="qwen2.5",
        messages=[{"role": "user", "content": prompt}]
    )
```

### 3.2 RAG Service(检索服务)

```
1.职责：
* 文档切分
* 向量化
* 相似度搜索

2.图示：
Query → Embedding → Vector DB → Context
```

### 3.3  Tool Service(工具服务)

```
1.说明：统一管理所有外部能力：

* SQL查询
* API调用
* 计算器
* Python执行

2.示例
from fastapi import FastAPI
app = FastAPI()

@app.post("/run")
def run_tool(name: str, input: str):
    if name == "calc":
        return eval(input)
    return f"unknown tool: {name}"
```

### 3.4 Workflow Service(编排服务)

```
1. 控制AI流程
Step1 → Step2 → Step3

2.示例：

def workflow(task):
    steps = ["analyze", "retrieve", "generate"]
    return steps
```

### 3.5 Memory Service(记忆服务)

```
1.作用：
* 用户历史记录
* 对话上下文
* 长期记忆

2.数据库：
* Redis（短期）
* PostgreSQL（长期）
```

## 四 进阶

### 4.1 API Gateway设计

```
1.统一入口：
* 鉴权
* 限流
* 路由

2.示例
from fastapi import FastAPI
app = FastAPI()

@app.post("/api/chat")
def gateway(req: dict):
    return {"route": "llm-service"}
```

### 4.2 服务通信方式

```
1. HTTP（简单）
* REST API
* 易实现

2. gRPC（高性能）
适合：
* 模型调用
* 内部通信

3. Message Queue（解耦）
工具：
* Kafka
* RabbitMQ
```

### 4.3 完整请求流程

```
User
 ↓
API Gateway
 ↓
Workflow Service
 ↓
RAG Service → Vector DB
 ↓
LLM Service (Ollama)
 ↓
Tool Service
 ↓
Memory Service
 ↓
Response
```

## 五 部署架构(云原生)

### 5.1 Docker Compose

```
services:
  llm:
    image: ollama/ollama
  rag:
    build: ./rag
  tool:
    build: ./tool
  gateway:
    build: ./gateway
```

### 5.2 Kubernetes(生产级)

```
Deployment → Pod → Service → Ingress
```

## 六 扩展及性能

### 6.1 扩展能力设计

```
1. 自动扩缩容
* CPU / GPU负载
* QPS监控

2. 多模型服务
* qwen2.5
* llama3
* mistral

3. 灰度发布
* A/B测试模型
* 逐步切换流量
```

### 6.2 性能优化

```
1. 缓存层
* prompt cache
* embedding cache

2. 并发优化
* async FastAPI
* batch inference

3. GPU优化
* TensorRT
* KV Cache
```

### 6.3 安全设计

```
1. 服务鉴权
* JWT
* API Key

2. Tool安全隔离
* sandbox执行
* 禁止危险命令

3. Prompt防注入
* 输入过滤
* system prompt保护
```

## 七 企业级应用场景

### 7.1 AI客服系统

```
* 多租户
* 工单自动处理
```

### 7.2 企业知识平台

```
* 内部搜索
* 文档问答
```

### 7.3 AI开发平台

```
* 自动写代码
* 自动测试
```

## 八 架构进化路线

```
单体 → Workflow → Agent → 微服务 → 云原生AI平台
```

## 九 一句话总结

```
 微服务化 = 把 Ollama 从“AI工具”变成“AI平台”
```

