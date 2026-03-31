---
title: Ollama开发系列之——Ollama是什么(2.1)
categories:
  - AI
  - C-AI开发
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 34850ae7
date: 2026-03-31 16:49:20
---
## 一 概述

```
本文介绍：
 - 基础概念
 - 快速体验
 - 核心工作原理
 - 本地模型 vs 云模型
 - 适合哪些人？
```

<!--more-->

## 二 基础概念

### 2.1 什么是 Ollama？

```
1.基础概念
Ollama 是一个开源的本地大语言模型（LLM）运行框架
它可以让你在自己的电脑上运行类似 ChatGPT 的 AI 模型，而不依赖任何云端服务。

2.简单来说：
Ollama = 本地运行 AI 模型的工具（类似 Docker 运行容器）
它把复杂的大模型（如 GGUF 格式）封装成一个“即装即用”的服务

3.你只需要一条命令就能完成：
-下载模型
-启动模型
-与模型对话
```

### 2.2 为什么 Ollama 这么火？

```
在 Ollama 出现之前，我们使用 AI 通常依赖云服务(如 OpenAI API)，但存在几个问题：

1、云端 AI 的痛点：
 -按 Token 收费（长期成本高）
 -数据需要上传（隐私风险）
 必须联网（无法离线使用）
 
2、Ollama 的优势：
 特性	        Ollama
是否免费	    免费
是否离线	    支持
数据隐私	    本地
使用复杂度	    极低

3、优势总结：
让每个人都能在本地运行 AI
```

### 2.3 Ollama 能做什么？

```
安装 Ollama 后，你可以实现：

1、本地 AI 对话
ollama run gemma3
类似 ChatGPT，但完全离线

2、AI 编程助手

搭配编码模型：
Qwen3-Coder
DeepSeek-R1

可替代 Copilot / Cursor

3、本地知识库（RAG）
场景：
-PDF问答
-企业内部文档检索

4、Embedding / 向量计算：

用于：
-搜索
-推荐系统
-AI检索

5、多模态能力：
例如：
ollama run llava
支持图片理解
```

### 2.4 支持哪些模型？

```
1、Ollama 内置一个模型库（类似 Docker Hub）：
https://ollama.com/library

2、常见模型：
-通用模型
-Gemma 3
-Llama 3
-中文 & 编程
-Qwen3

3、推理模型
-DeepSeek-R1
```

## 三 快速体验

### 3.1 安装 Ollama

```
curl -fsSL https://ollama.com/install.sh | sh

Windows 用户直接下载安装包即可
```

### 3.2 运行模型

```
ollama run gemma3

第一次会自动下载模型（约几 GB）
```

### 3.3 开始聊天

```
你好，介绍一下你自己
```

## 四 核心工作原理(开发者必看)

### 4.1 Ollama运行逻辑

```
模型（GGUF）
   ↓
Ollama Runtime
   ↓
CLI / REST API
   ↓
你的应用（Web / App / Agent）
```

### 4.2 关键点

```
Ollama 是一个 本地 AI 服务
默认运行在：http://localhost:11434
```

### 4.3 API 示例

```
curl http://localhost:11434/api/generate -d '{ "model": "gemma3", "prompt": "介绍一下 Ollama" }'
```

## 五 本地模型 vs 云模型

### 5.1 本地模型

```
1.运行模型
ollama run qwen3:8b

2.特点：
-完全离线
-吃硬件（GPU/内存）
```

### 5.2 云模型(Cloud)

```
1.运行模型
ollama run qwen3-coder:480b-cloud

2.特点：
-不占本地资源
-按使用计费
```

### 5.3 如何选择

|    场景    |   场景   |
| :--------: | :------: |
|  本地开发  | 本地开发 |
| 大模型体验 |  Cloud   |

## 六 适合哪些人

```
Ollama 非常适合：

1、开发者
-本地调试 AI
-搭建 AI 应用

2、AI 工程师
-做 RAG / Agent
-模型实验

3、企业
-数据隐私要求高
-内网部署
```

## 七 总结

```
1、一句话总结 Ollama：
它让 AI 从“云服务”变成“本地工具”

2、它的意义：
 -降低 AI 使用门槛
 -保护数据隐私
 -推动本地 AI 生态
```

