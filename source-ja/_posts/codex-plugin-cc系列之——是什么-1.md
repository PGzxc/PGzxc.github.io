---
title: codex-plugin-cc系列之——是什么(1)
categories:
  - AI
  - AI开发
  - AI Agent
  - codex-plugin-cc
tags:
  - codex-plugin-cc
abbrlink: 21ee0be9
date: 2026-04-08 09:59:30
---
## 一 概述

```
本文介绍：
 - 核心定义
 - 背后逻辑
```

<!--more-->

## 二 核心定义

### 2.1 定义

```
codex-plugin-cc = Codex ↔ Claude Code 的桥接插件
```

### 2.2 本质

```
- 一个JSON-RPC 插件/桥接层
- 把 OpenAI Codex 接入到 Claude Code
```

### 2.3 作用

```
- 让 Claude Code 调用 Codex 能力
- 实现 多 Agent 协作开发
```

## 三 背后逻辑

### 3.1 说明

```
- Codex 是一个 云端软件工程 Agent
- 可以：
  - 写代码
  - 修复 Bug
  - 运行测试
  - 提交 PR
```

### 3.2 定位

```
让 Codex 不只存在于 ChatGPT / CLI
而是可以嵌入到其他 Agent（如 Claude Code）中
```

## 四 一句话总结

```
它不是模型，而是“Agent 互通协议插件”
```

