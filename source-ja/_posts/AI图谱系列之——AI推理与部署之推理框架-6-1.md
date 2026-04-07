---
title: AI图谱系列之——AI推理与部署之推理框架(6.1)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 1df5c1d9
date: 2026-04-07 19:14:12
---
## 一 概述

```
本文介绍：
 -AI推理与部署之推理框架
```

<!--more-->

## 二 核心

```
如何让模型“跑得快 + 成本低 + 可上线”
```

## 三  推理框架(Serving层核心)

### 3.1 什么是推理框架？

```
1.推理框架用于将训练好的模型高效部署并提供服务，

2.核心目标：
-降低延迟（Latency）
-提高吞吐（Throughput）
-降低成本（GPU利用率）

3.本质：
“让模型跑得更快、更便宜”
```

### 3.2 主流推理框架有哪些？

1-vLLM(2026推理王者)

```
1.核心定位：高吞吐 + 低延迟 + 专为LLM设计

2.核心技术(必考)
-PagedAttention（核心创新）
-KV Cache 管理优化
-Continuous Batching（连续批处理）

3.优势

-吞吐量极高（比 HuggingFace 提升数倍）
-显存利用率高
-支持多用户并发

4.使用场景
-ChatGPT类应用
-RAG系统
-SaaS服务

5.一句话总结
vLLM = LLM 推理服务器的事实标准
```

2-TensorRT-LLM(NVIDIA生态)

```
1.特点：
-NVIDIA官方
-GPU极致优化
-延迟最低

2.适合：
高性能生产环境
```

3-DeepSpeed(微软)

```
1.特点：
-微软出品
-训练 + 推理一体
-支持 ZeRO
```

4-Triton Inference Server(工业级)

```
1.特点：
-多模型服务
-支持 HTTP/gRPC
-工业级部署
```

5-SGLang(新趋势)

```
1.特点：
-结构化生成优化
-Prompt编排能力强
```

### 3.3 vLLM 为什么这么快？

```
两个核心技术：

1、PagedAttention（核心）

思想：
-KV Cache 分页管理（类似操作系统内存分页）
-避免内存碎片

优势：
-支持更多并发请求
-显存利用率极高

2、Continuous Batching

思想：
动态把不同请求拼成 batch

对比传统：
方式	      问题
静态Batch	 浪费资源
动态Batch	 利用率高

面试总结：
“vLLM 通过 KV Cache 管理 + 动态批处理，把 GPU 利用率拉满”
```

### 3.4 Triton vs vLLM？

1-对比

|  维度  |    Triton    |  vLLM   |
| :----: | :----------: | :-----: |
|  类型  | 通用推理服务 | LLM专用 |
|  性能  |     稳定     |  更高   |
| 灵活性 |      高      |   中    |

2-实际

```
“Triton + vLLM 组合部署”
```

## 四 推理框架对比(面试重点)

```
vLLM           → 通用推理首选（最主流）
TensorRT-LLM   → GPU极致性能
DeepSpeed      → 超大模型
Triton         → 企业部署
SGLang         → Agent优化
```

