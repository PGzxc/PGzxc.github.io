---
title: AI知识图谱知识点之——AI开发框架(5)
categories:
  - AI
  - AI图谱
  - AI知识点
tags:
  - AI知识点
abbrlink: c8bc5602
date: 2026-04-06 21:45:20
---
## 一 概述

```
本文介绍：
1.LLM开发框架
2.Agent框架
3.本地AI运行
4.深度学习框架
```

<!--more-->

## 二 AI开发框架

### 2.1 LLM 开发框架

```
作用：把 RAG、检索、Prompt、模型调用 串成流水线

1.LangChain
最老牌、最通用、生态最大

2.LangGraph
2026 多 Agent/工作流标配，状态管理、循环、分支最强

3.LlamaIndex
RAG 专用王者，数据索引、分块、检索、重排最强

4.Haystack
德国深度学习研究所出品，企业级稳定 RAG

5.Semantic Kernel
微软官方，C# /.NET 生态首选，和 Azure 深度集成
```

### 2.2 Agent 框架

```
作用：让 AI 自己思考、规划、调用工具、多角色协作

1.LangGraph
2026 多 Agent 事实标准，最稳、最工程化

2.AutoGen
微软多 Agent，多角色对话、协作强

3.CrewAI
简单易用、快速做 “AI 团队”，2026 极火

4.Semantic Kernel
微软轻量 Agent，适合企业集成

5.OpenAI Swarm
官方轻量多代理，极简、高性能

6.Letta（原 MemGPT）
记忆增强 Agent，长期记忆、拟人对话强
```

### 2.3 本地 AI 运行

```
作用：一键跑开源模型（Llama、Qwen、GLM 等）

1.Ollama
命令行一键启动，2026 本地部署事实标准

2.LM Studio
UI 最友好，拖拽下载、调试、测试最强

3.
4.LocalAI
兼容 OpenAI 接口，本地替代云服务

4.Jan / GPT4All / Pinokio / Faraday.dev
桌面端轻量化、开箱即用
```

### 2.4 深度学习框架

```
训练模型用的底层基建

1.PyTorch
学术界 + 工业界 绝对第一

2.TensorFlow
企业部署、生产稳定

3.JAX
Google 训练框架，科研、大模型训练常用

4.ONNX
模型格式标准，跨平台推理通用
```

## 三 一句话总结

```
RAG：LlamaIndex
Agent / 工作流：LangGraph
本地运行：Ollama + LM Studio
训练：PyTorch
企业微软系：Semantic Kernel
```

