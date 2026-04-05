---
title: OpenCode开发之——安装及模型配置(2)
categories:
  - AI
  - AI开发
  - AI开发工具
  - OpenCode
tags:
  - OpenCode
abbrlink: dea5c073
date: 2026-04-05 11:09:22
---
## 一 概述

```
本文介绍：
 - OpenCode安装
 - OpenCode模型配置
```

<!--more-->

## 二 OpenCode安装

### 2.1 通过终端安装

```
1.curl
curl -fsSL https://opencode.ai/install | bash

2.npm
npm i -g opencode-ai

3.brew
brew install anomalyco/tap/opencode
```

### 2.2 下载软件

```
官网—>Download
```

## 三 OpenCode模型配置

### 3.1 Ollama模型

```
C:\Users\83422>ollama list
NAME               ID              SIZE      MODIFIED
qwen3.5:4b         2a654d98e6fb    3.4 GB    8 days ago
qwen2.5:7b         845dbda0ea48    4.7 GB    8 days ago
qwen3:latest       500a1f067a9f    5.2 GB    9 days ago
qwen3:8b           500a1f067a9f    5.2 GB    9 days ago
llama3:8b          365c0bd3c000    4.7 GB    10 days ago
kimi-k2.5:cloud    6d1c3246c608    -         12 days ago
```

### 3.2 Ollama启动OpenCode

```
ollama launch opencode --model qwen3.5:4b
```

### 3.3 查看供应商

```
设置——>提供商——>显示所有连接服务

-Ollama Cloud(API密钥)
-Google
-Ollama自定义(本地)
```

