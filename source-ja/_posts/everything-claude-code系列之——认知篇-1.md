---
title: everything-claude-code系列之——认知篇(1)
categories:
  - AI
  - AI开发
  - AI Agent
  - everything-claude-code
tags:
  - everything-claude-code
abbrlink: 9266ea45
date: 2026-04-09 09:21:45
---
## 一 概述

```
本文介绍：
 - 项目概述
 - Claude Code 核心认知
 - 整体架构
```

<!--more-->

## 二 项目概述

### 2.1 项目地址

```
https://github.com/affaan-m/everything-claude-code/blob/main/README.zh-CN.md
```

### 2.2 定位

```
Claude Code 全量实践指南 + 工作流集合
```

### 2.3 核心价值

```
从“会用 Claude” → “构建 AI 工程环境”
```

### 2.4 是什么

```
- 实战模板集合
- Claude Code 工作流沉淀
- Agent 工程最佳实践
```

### 2.5 本质

```
AI Coding 工程化方法论
```

## 三 Claude Code 核心认知

```
1. 是什么？
Claude Code ≠ AI补全工具，而是：一个可编排的 AI 编程系统


2.其核心能力：
- 任务拆解（Agent）
- 自动执行（Command / Hook）
- 上下文记忆（CLAUDE.md）
- 工作流复用（Skills）

实际上是“AI工程操作系统”
```

## 四 整体架构

项目核心强调 Claude Code 的 4层架构：

### 4.1 CLAUDE.md(全局记忆层)

```
1.作用：
- 项目上下文
- 技术栈说明
- 规则约束
- 架构设计

2.类似：AI 的长期记忆
```

### 4.2 Skills(技能层)

```
1.作用：
- 封装复杂任务流程
- 可复用 Prompt 模板

2.例如：
/tdd
/refactor-clean
/security-review


3.类似：函数 / 工作流模板
```

### 4.3 Commands(命令层)

```
1.作用：
- 快速执行具体任务
- 比 skills 更轻量

2.类似：快捷指令
```

### 4.4 Hooks(自动化层)

```
1.作用：
- 在特定事件自动执行

2.如：
- 写代码后自动 lint
- 提交前自动检查

3.类似：Git Hooks + 自动化流水线
```

## 五 总结

```
Claude Code = Memory + Skills + Commands + Hooks
```

