---
title: Hermes-Agent系列之——多模型接入(7)
categories:
  - AI
  - AI开发
  - AI Agent
  - Hermes-Agent
tags:
  - Hermes-Agent
abbrlink: 72cc347d
date: 2026-04-08 10:21:59
---
## 一 概述

```
本文介绍：
 - 本地模型(如果已安装ollama)
 - 多模型策略
```

<!--more-->

## 二 多模型接入

### 2.1 本地模型(如果已安装ollama)

```
1.结合你当前环境：
ollama run qwen3:8b

2.配置：
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_API_KEY=ollama
```

### 2.2 多模型策略

|   场景   |     模型     |
| :------: | :----------: |
|   编码   | GPT / Claude |
|   本地   | Qwen / Llama |
| 自动任务 |    小模型    |

Hermes支持：多模型动态切换(官方能力)