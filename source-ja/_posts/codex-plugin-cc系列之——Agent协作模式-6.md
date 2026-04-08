---
title: codex-plugin-cc系列之——Agent协作模式(6)
categories:
  - AI
  - AI开发
  - AI Agent
  - codex-plugin-cc
tags:
  - codex-plugin-cc
abbrlink: 6198d017
date: 2026-04-08 10:02:30
---
## 一 概述

```
本文介绍：
 - 单 Agent vs 多 Agent
 - plugin-cc 的优势
 - 典型架构
```

<!--more-->

## 二 Agent 协作模式

### 2.1 单 Agent vs 多 Agent

|   模式   |       特点       |
| :------: | :--------------: |
| 单 Agent | 简单，但能力有限 |
| 多 Agent |  分工明确，更强  |

### 2.2 plugin-cc 的优势

```
1. 跨生态融合
- Claude + Codex 协同

2. 更强执行能力
- Codex 可直接：
  - 操作代码
  - 执行命令 

3. 并行任务
- Codex 支持多任务并行执行 
```

### 2.3 典型架构

```
Claude（调度层）
   ↓
Plugin（协议层）
   ↓
Codex（执行层）
   ↓
CI/CD / Repo
```

