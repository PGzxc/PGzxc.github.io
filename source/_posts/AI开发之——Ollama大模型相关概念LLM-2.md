---
title: AI开发之——Ollama大模型相关概念LLM(2)
categories:
  - 开发
  - Q-AI
  - Ollama
tags:
  - Ollama
abbrlink: e6059738
date: 2025-07-11 08:47:22
---
## 一 概述

* LLM是什么？
* LLM能做什么？
* LLM是怎么训练出来的？
* 目前常见的LLM有哪些？
* AI开发中LLM的用法

<!--more-->

## 二 LLM是什么？

```
在 AI（人工智能）开发中，LLM 是 Large Language Model(大语言模型)的缩写

LLM(大语言模型)是基于海量文本数据训练出的深度学习模型，能理解和生成自然语言文本。

它是AI中专注于“语言理解与生成”的模型，比如你正在使用的ChatGPT背后就是一个 LLM(如 GPT-4)
```

## 三 LLM能做什么？

LLM 被广泛用于以下任务：

|     应用方向      |                示例                |
| :---------------: | :--------------------------------: |
| 自然语言生成(NLG) |    写作助手、摘要生成、对话系统    |
| 自然语言理解(NLU) |         情感分析、意图识别         |
|     文本翻译      | 英语 <-> 中文 <-> 日语等多语种翻译 |
|     文本问答      |        ChatBot、知识库问答         |
|     代码生成      |    编程助手(如 GitHub Copilot)     |
|     语言推理      | chain-of-thought reasoning、数学题 |

## 四 LLM是怎么训练出来的？

### 4.1 预训练(Pretraining)

```
用数TB级别的文本（书籍、网页、维基百科等）训练语言模型。
学习词汇、语法、语义、上下文等。
```

### 4.2 微调(Fine-tuning)

```
在特定任务（如问答、客服、法律文本）上继续训练，让模型更专业
```

### 4.3 指令微调(Instruction tuning) 和 RLHF(人类反馈强化学习)

```
让模型更好地理解人类指令、说话方式
```

## 五 目前常见的LLM有哪些？

|     模型名称      |    公司/组织    |            特点            |
| :---------------: | :-------------: | :------------------------: |
|    GPT-3/GPT-4    |     OpenAI      |     ChatGPT 背后的模型     |
|      Claude       |    Anthropic    |    强调安全性与长上下文    |
|      Gemini       | Google DeepMind |    原名 Bard，支持图文     |
|       LLaMA       |      Meta       |     开源大模型代表之一     |
| Mistral / Mixtral |   Mistral AI    | 小模型高性能，适合本地部署 |
|   Yi / ChatGLM    |    中国企业     | 中文适配更好，国产自主模型 |

## 六 AI开发中LLM的用法

### 6.1 API 调用(如 OpenAI API)——Python语言

```
from openai import OpenAI

openai.api_key = "sk-xxx"
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "今天天气怎么样？"}]
)
```

### 6.2 本地部署开源 LLM(如 LLaMA、Mistral、Qwen)

```
使用 Ollama、LMDeploy、Transformers 等工具
```

### 6.3 与工具链结合

```
LangChain / LlamaIndex：用于构建 RAG 问答系统
VLLM / TGI：高性能推理服务部署
LoRA / QLoRA：模型轻量级微调
```

