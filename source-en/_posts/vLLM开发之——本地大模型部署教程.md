---
title: vLLM开发之——本地大模型部署教程
categories:
  - AI
  - AI开发
  - 本地部署
  - vLLM
tags:
  - vLLM
abbrlink: 981ceb12
date: 2026-04-03 20:36:43
---
## 一 概述

```
本文介绍：
 -本地大模型vLLM
```

<!--more-->

## 二  vLLM介绍

### 2.1   vLLM 是什么？

```
vLLM 是一个由 UC Berkeley 推出的高性能 LLM 推理引擎，主打：

 -高吞吐
 -低延迟
 -支持大规模并发
 -OpenAI API 兼容
```

### 2.2 核心能力

| 能力           | 说明               |
| -------------- | ------------------ |
| PagedAttention | 显存优化核心技术   |
| 高并发推理     | 支持多请求同时生成 |
| 连续批处理     | 动态 batching      |
| OpenAI API     | 可直接替代 GPT API |
### 2.3 一句话理解

```
vLLM = 企业级 / 服务端版 Ollama
```

### 2.4 对比其他方案

|     方案     |    定位     |
| :----------: | :---------: |
|  LM Studio   |  本地 GUI   |
|    Ollama    |  本地 CLI   |
|     vLLM     | 服务端推理  |
| TensorRT-LLM | GPU极致优化 |

## 三 环境准备

### 3.1 硬件要求

| 项目 |        建议        |
| :--: | :----------------: |
| GPU  | NVIDIA（强烈推荐） |
| 显存 |  ≥16GB（7B模型）   |
| CPU  |        8核+        |
| 内存 |       ≥32GB        |

### 3.2 软件环境

```
- Python ≥ 3.9
- CUDA ≥ 11.8
- pip / conda
```

### 3.3 安装 vLLM

```
pip install vllm
```

## 四 启动模型服务

### 4.1 启动 OpenAI 兼容服务

```
python -m vllm.entrypoints.openai.api_server \
  --model mistralai/Mistral-7B-Instruct \
  --port 8000
```

参数说明：

|           参数           |       说明       |
| :----------------------: | :--------------: |
|         --model          | HuggingFace 模型 |
|          --port          |     服务端口     |
|         --dtype          | 精度（float16）  |
| --gpu-memory-utilization |    显存利用率    |

### 4.2 访问地址

```
http://localhost:8000/v1
```

### 4.3 测试 API

```
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistralai/Mistral-7B-Instruct",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

## 五 接入开发(OpenAI 兼容)

### 5.1 Node.js 示例

```
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:8000/v1",
  apiKey: "EMPTY"
});

const res = await client.chat.completions.create({
  model: "mistralai/Mistral-7B-Instruct",
  messages: [
    { role: "user", content: "Explain vLLM" }
  ]
});

console.log(res.choices[0].message);
```

### 5.2 Python 示例

```
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="EMPTY"
)

res = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct",
    messages=[{"role": "user", "content": "Hello"}]
)

print(res.choices[0].message)
```

## 六 核心技术解析

### 6.1 PagedAttention(重点)

```
1.类似操作系统分页机制：
传统：KV Cache 连续占用显存 → 容易爆
vLLM：KV Cache 分页管理 → 动态分配

2.优势：
- 显存利用率提升 2~4 倍
- 支持更多并发请求
```

### 6.2 Continuous Batching

```
1.动态批处理：
- 新请求无需等待批次结束
- 自动加入推理队列

2.效果：
-吞吐提升显著
```

### 6.3 高并发能力

```
vLLM 可以：
- 同时处理几十 ~ 上百请求
- 适合 API 服务
```

## 七 模型选择建议—推荐模型HuggingFace

### 7.1 入门

```
- TinyLlama
- Phi-2
```

### 7.2 主流

```
- Mistral-7B
- Llama-3-8B
```

### 7.3  中文优化

```
- Qwen
- Yi
```

### 7.4 注意

```
vLLM 使用：HuggingFace Transformers 模型
不是 GGUF（区别于 LM Studio / Ollama）
```

## 八 性能优化

### 8.1 显存控制

```
--gpu-memory-utilization 0.9
```

### 8.2 并发控制

```
--max-num-batched-tokens
```

### 8.3 精度优化

```
--dtype float16
```

### 8.4 多 GPU

```
--tensor-parallel-size 2
```

## 九 架构搭配(企业级)

### 9.1 推荐架构

```
前端（Web / App）
        ↓
API 网关（New API）
        ↓
vLLM（推理层）
        ↓
模型（HF）
```

### 9.2 加入 RAG

```
用户问题
↓
向量检索（FAISS / Milvus）
↓
上下文拼接
↓
vLLM
```

### 9.3 生产级增强

```
- Redis（缓存）
- Kafka（队列）
- Prometheus（监控）
```

## 十 常见问题

### 10.1 CUDA 不兼容

```
检查：nvidia-smi
```

### 10.2 显存不足

```
解决：

- 换小模型
- 降精度
- 使用多 GPU
```

### 10.3 启动慢

```
原因：
- 模型加载

解决：
预热（warmup）
```

## 十一 一句话总结

```
 vLLM = 当前最强开源 LLM 推理引擎之一（高并发场景首选）
```

