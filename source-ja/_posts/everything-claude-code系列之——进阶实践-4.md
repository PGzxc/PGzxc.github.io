---
title: everything-claude-code系列之——进阶实践(4)
categories:
  - AI
  - AI开发
  - AI Agent
  - everything-claude-code
tags:
  - everything-claude-code
abbrlink: 5973d88a
date: 2026-04-09 09:24:18
---
## 一 概述

```
本文介绍：
 - 构建项目级 AI 规范
 - 技能体系设计
 - Hook 自动化流水线
 - 多 Agent 模式
```

<!--more-->

## 二 进阶实践

### 2.1 构建项目级 AI 规范

```
1.CLAUDE.md 推荐结构：
 # Architecture
 # Coding Standards
 # Anti-patterns
 # Module Rules
 
 2.让 AI 输出稳定
```

### 2.2 技能体系设计

```
建议分类：
 skills/
   dev/
   test/
   review/
   deploy/
```

### 2.3 Hook 自动化流水线

```
典型场景：
- 写代码 → 自动 lint
- 修改文件 → 自动测试
- 提交前 → 安全检查

Claude Code ≈ CI/CD
```

### 2.4 多 Agent 模式(高级)

```
1.玩法：
- 1个 Claude 写代码
- 1个 Claude Review

2.类似：
Coder Agent + Reviewer Agent
```

