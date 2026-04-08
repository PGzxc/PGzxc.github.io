---
title: Hermes-Agent系列之——是什么(1)
categories:
  - AI
  - AI开发
  - AI Agent
  - Hermes-Agent
tags:
  - Hermes-Agent
abbrlink: a63d08ab
date: 2026-04-08 10:17:05
---
## 一 概述

```
本文介绍：
 - 核心定义
 - 核心能力
```

<!--more-->

## 二 核心定义

### 2.1 是什么

```
开源 + 自学习 + 持久记忆 的 AI Agent 框架
```

### 2.2 它区别于传统 AI(如 ChatGPT/Copilot)的核心点

| 能力 |   传统AI   | Hermes Agent |
| :--: | :--------: | :----------: |
| 记忆 | 无持久记忆 |  跨会话记忆  |
| 学习 |  不会成长  | 自动生成技能 |
| 执行 |  被动响应  | 主动执行任务 |
| 部署 |     云     | 本地/服务器  |

### 2.3 本质定位

```
一个会成长的 AI 工程助手(Agent OS)
```

## 三 核心能力

### 3.1 自学习闭环(Learning Loop)

```
- 从任务中总结经验
- 自动生成 Skill（技能）
- 持续优化执行方式 
```

### 3.2 持久记忆(Memory)

```
- 保存所有对话
- 可搜索历史知识
- 建立用户画像
```

### 3.3 多平台接入

```
支持：

- Telegram / Discord / Slack
- Terminal / Web UI 
```

### 3.4 多模型支持

```
兼容：

- OpenAI
- Anthropic
- Ollama / vLLM（本地模型）
- OpenRouter 
```

## 四 一句话总结

```
Hermes ≠ Copilot
Hermes = 长期进化的 AI Agent
```

## 五 参考

* [Github-hermes-agent](https://github.com/NousResearch/hermes-agent)
* [Doc文档](https://hermes-agent.nousresearch.com/docs/)