---
title: AI图谱系列之——AI开发框架之本地AI运行(5.3)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 10fb5d8f
date: 2026-04-07 18:57:56
---
## 一 概述

```
本文介绍：
 -AI开发框架之本地AI运行
```

<!--more-->

## 二 核心作用

```
本地运行 LLM（隐私 / 离线 / 成本）
```

## 三  本地AI运行(离线 + 私有化)

### 3.1 本地运行 LLM 有哪些工具？

```
1- Ollama(最主流)
特点
-一键运行模型
-支持 Llama / Qwen / DeepSeek
-API 兼容 OpenAI

示例
ollama run llama3


2-LM Studio(UI最强)
特点：
-图形界面
-支持模型下载 + 推理
-开发者友好

3-GPT4All
-轻量
-本地聊天

4-Jan(开源 ChatGPT 替代)
-UI 好
-支持本地模型

5-LocalAI
-OpenAI API 兼容
-可部署服务端

6-Pinokio(自动化神器)
特点：
-1键安装 AI 应用
-自动部署环境

7-Faraday.dev
-偏角色扮演 / 对话
-本地 Agent 应用
```

### 3.2 Ollama 原理？

```
本地加载 GGUF 模型
提供 HTTP API
类似“本地 OpenAI API”
```

### 3.3 本地部署 vs 云模型？

| 维度 |   本地   |  云  |
| :--: | :------: | :--: |
| 成本 |    低    |  高  |
| 隐私 |    高    |  低  |
| 性能 | 依赖硬件 |  强  |
| 运维 |   复杂   | 简单 |



