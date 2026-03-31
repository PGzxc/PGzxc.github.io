---
title: Ollama开发系列之——生产部署与性能优化(2.8)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: f36d746c
date: 2026-03-31 16:52:58
---
## 一 概述

```
本文介绍：
 - 生产部署
 - 性能优化
 - 常见问题终极指南
```

<!--more-->

## 二 生产部署

### 2.1 生产部署架构

```
1. 一个标准的本地 AI 服务架构：
客户端
   ↓
API Gateway（你的服务）
   ↓
Ollama API（11434）
   ↓
模型推理层

2. 推荐架构（企业级）

[Web / App]
     ↓
[FastAPI / Node API]
     ↓
[Ollama Cluster]
     ↓
[模型层（qwen / gemma / deepseek）]
```

### 2.2 Docker 生产部署(推荐)

```
1. 基础部署

docker run -d \
  --name ollama \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama


2. GPU 加速(NVIDIA)

docker run -d \
  --gpus all \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama

3. 多实例部署(负载均衡)
ollama-1 → GPU0
ollama-2 → GPU1
ollama-3 → CPU fallback
```

## 三 优化相关

### 3.1 性能优化

1-模型选择优化

| 场景 |  推荐模型   |
| :--: | :---------: |
| 聊天 |   Gemma 3   |
| 编程 | Qwen3-Coder |
| 推理 | DeepSeek-R1 |

2-显存优化

```
1. 使用量化模型
ollama run qwen3:8b-q4_K_M

2.优点：

-显存 ↓ 50%+
-速度 ↑
-稳定性 ↑
```

3-上下文优化

```
1.配置
PARAMETER num_ctx 2048

2.原则：

-不要无限加 context
-RAG 替代长记忆
```

4-并发优化

```
建议：
- CPU：1请求/核
- GPU：按显存分配
```

### 3.2 API 性能优化

```
1. 使用 streaming
stream=True
优点：降低延迟/提升体验

2. 复用连接
requests.Session()

3. 控制 token
{
  "num_predict": 200
}
```

## 四 网关及安全

### 4.1 生产级 API 网关(推荐架构)

```
1. FastAPI 示例：
from fastapi import FastAPI
import requests
app = FastAPI()

@app.post("/chat")
def chat(q: str):

    res = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": "qwen3:8b",
            "messages": [
                {"role": "user", "content": q}
            ]
        }
    )

    return res.json()

2.已经拥有：
-AI API 服务
-可扩展后端
-可部署架构
```

### 4.2 安全与稳定性

```
1. 限流（必须做）
每用户：10 req/min

2. 超时控制
timeout = 30s

3. 模型隔离
chat模型 ≠ code模型
```

## 五 常见问题(FAQ)

```
1. 模型很慢
原因：模型太大/CPU 推理
解决：ollama run gemma3:4b

2. GPU 不生效
检查：NVIDIA driver/CUDA/docker --gpus all

3. 内存爆炸
解决：降低 num_ctx/使用 q4 量化

4. 端口冲突
默认端口：11434
```

## 六 企业级最佳实践

```
1. 模型分层

小模型 → chat
中模型 → coding
大模型 → reasoning

2. RAG 优先
永远优先：RAG > 直接大模型

3. Agent 不要过早复杂化
先稳定，再增强

4. 日志监控
必须记录：prompt/latency/token/error
```

## 七 完整生产架构

```
用户
 ↓
API Gateway
 ↓
RAG层
 ↓
Ollama Cluster
 ↓
GPU池
```

