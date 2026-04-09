---
title: ECC-Tools系列之——是什么(1)
categories:
  - AI
  - AI开发
  - AI Agent
  - ECC-Tools
tags:
  - ECC-Tools
abbrlink: 55743ef9
date: 2026-04-09 09:52:52
---
## 一 概述

```
本文介绍：
 - 是什么
 - 核心能力
 - 核心价值
```

<!--more-->

## 二 是什么

### 2.1 定义

```
AI 编码代理增强系统(Agent Harness System)
```

### 2.2 核心作用

```
1.将 代码仓库历史 → 转换为团队规范(skills)

2.为 AI 编码工具提供：
 -统一规则
 -自动化流程
 -安全保障
```

### 2.3 支持工具

```
Claude Code
Codex
Cursor
OpenCode
```

## 三 核心能力(3大层)—ECC 官方架构 = 三层系统

### 3.1 分发层(OSS)

```
- Skills（技能）
- Agents（子代理）
- Commands（命令）
- Hooks（钩子）

本地可用（MIT开源）
```

### 3.2 自动化层(GitHub App)

```
1.分析仓库历史
2.自动生成：
  - SKILL.md
  - 团队规范
3.通过 PR 形式交付（可审核）
```

### 3.3 安全层(AgentShield)

```
1.扫描 AI Agent 配置
2.检测：
  - Prompt 注入
  - 权限问题
  - 安全漏洞

102 条规则 + 自动审计 
```

## 四 核心价值

### 4.1 未使用 ECC

```
- AI 不懂团队规范
- 每次对话从零开始
- 安全不可控
```

### 4.2 使用 ECC

```
- AI 继承项目经验
- 自动执行规范流程
- 安全自动审计 
```

## 五 参考

* [ECC官网](https://ecc.tools/)