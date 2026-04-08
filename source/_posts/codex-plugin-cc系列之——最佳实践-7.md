---
title: codex-plugin-cc系列之——最佳实践(7)
categories:
  - AI
  - AI开发
  - AI Agent
  - codex-plugin-cc
tags:
  - codex-plugin-cc
abbrlink: 42df6914
date: 2026-04-08 10:03:05
---
## 一 概述

```
本文介绍：
 - 提供清晰上下文
 - 小任务拆分
 - 始终人工 Review
```

<!--more-->

## 二 最佳实践

### 2.1 提供清晰上下文

```
Codex 在有这些时效果最好：

- README
- AGENTS.md
- 测试脚本
```

### 2.2 小任务拆分

```
错误：帮我重写整个系统

正确：
1. 重构用户模块
2. 添加测试
3. 优化接口
```

### 2.3 始终人工 Review

```
1.Codex 输出必须人工验证
2.尤其是：
  - 安全代码
  - 关键逻辑
```

