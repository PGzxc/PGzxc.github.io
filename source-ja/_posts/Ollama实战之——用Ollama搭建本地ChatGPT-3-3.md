---
title: Ollama实战之——用Ollama搭建本地ChatGPT(3.3)
categories:
  - AI
  - AI模型
  - 本地部署
  - Ollama
tags:
  - Ollama
abbrlink: 1cd4f0f0
date: 2026-03-31 17:10:31
---
## 一 概述

```
本文介绍：：
 -用Ollama搭建一个本地拥有类似 ChatGPT 的系统
 -用最少步骤，搭建一个“可对话 + 可API + 可扩展”的本地 ChatGPT
```

<!--more-->

## 二 搭建说明

### 2.1 最终效果长什么样？

```
完成后你将拥有：

* 类 ChatGPT 对话界面
* 本地运行大模型
* 支持 API 调用
* 可接入 WebUI / Agent
* 完全离线（可选）
```

### 2.2 整体架构

```
用户
 ↓
WebUI（可选）
 ↓
Ollama API
 ↓
本地模型（Qwen / Llama / Mistral）
```

## 三 搭建步骤

### 3.1 第1步：安装 Ollama

```
1. 官方安装
访问： https://ollama.com

2. macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

3. Windows
直接下载安装包即可（官方支持 GUI 安装）

4. 验证安装
ollama --version
```

### 3.2 第2步：运行第一个模型

```
1. 直接运行
ollama run llama3
你已经在本地和 AI 对话了

2. 推荐中文模型
ollama run qwen2.5
中文能力更强

3. 代码模型（推荐）
ollama run qwen2.5-coder
```

### 3.3 第3步：变成 ChatGPT(API模式)

```
Ollama 默认提供 OpenAI 风格 API：http://localhost:11434

1. API测试（curl）

curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "你好，介绍一下你自己"
}'

2. Chat API模式

curl http://localhost:11434/api/chat -d '{
  "model": "qwen2.5",
  "messages": [
    { "role": "user", "content": "写一个Python排序算法" }
  ]
}'
```

### 3.4 第4步：打造 ChatGPT 界面(关键)

```
虽然 API 已经可用了，但体验还不够 ChatGPT。
我们接入 WebUI：

1. Docker 一键启动

docker run -d \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  ghcr.io/open-webui/open-webui:main


2. 打开网页

http://localhost:3000
现在你拥有：本地 ChatGPT 完整界面
```

### 3.5 第5步：切换模型

1-在 WebUI 或 CLI 中

```
ollama pull qwen2.5
ollama pull llama3
ollama pull mistral
```

2-常用模型建议

| 类型 |     模型      |
| :--: | :-----------: |
| 中文 |    qwen2.5    |
| 英文 |    llama3     |
| 轻量 |    mistral    |
| 编程 | qwen2.5-coder |

### 3.6 第6步：Python接入(开发必备)

```
import requests
url = "http://localhost:11434/api/chat"

data = {
    "model": "qwen2.5",
    "messages": [
        {"role": "user", "content": "写一个快速排序"}
    ]
}

res = requests.post(url, json=data)
print(res.json())
```

### 3.7 第7步：升级成“AI应用系统”

```
当你完成以上步骤，你已经有了基础 ChatGPT。
下一步可以扩展：

1. 加 RAG（知识库）

- PDF问答
- 企业文档
- 本地知识库

2. 加 Agent

- 自动写代码
- 自动查资料
- 自动执行任务

3. 加工具调用

- SQL查询
- 文件操作
- API调用
```

## 四 常见问题

### 4.1 模型太慢？

```
换小模型：ollama run mistral
```

### 4.2 显存不够？

```
用量化模型（默认已优化）
```

### 4.3 API访问不了？

```
检查：11434端口是否开启
```

### 4.4 Windows连不上 WebUI？

```
改为：http://localhost:11434
```

## 五 性能优化建议

### 5.1 推荐组合

|   场景   |   模型    |
| :------: | :-------: |
| 日常聊天 |  qwen2.5  |
|  写代码  | coder模型 |
|  长文本  |  llama3   |

### 5.2 不要全用最大模型

```
本地AI核心原则：小模型 + 合理分工 > 单大模型
```

## 六 总结

```
Ollama = 把本地电脑变成 ChatGPT 服务器
```

