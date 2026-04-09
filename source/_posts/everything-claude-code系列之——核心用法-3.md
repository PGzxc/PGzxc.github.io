---
title: everything-claude-code系列之——核心用法(3)
categories:
  - AI
  - AI开发
  - AI Agent
  - everything-claude-code
tags:
  - everything-claude-code
abbrlink: 7f54f8e5
date: 2026-04-09 09:23:50
---
## 一 概述

```
本文介绍：
 - 标准开发流程
 - 技能驱动开发
 - 上下文工程
```

<!--more-->

## 二 标准开发流程

```
推荐工作流：
1. 写目标（自然语言）
2. Claude 生成计划
3. 人工 Review
4. 执行代码生成
5. 自动 Hooks 校验

重点：先规划再执行
```

## 三 技能驱动开发

```
1.例如：
/tdd user login


2.Claude 自动：
-写测试
-写实现
-跑测试
-修复问题

3.一个命令完成完整开发流程
```

## 四 上下文工程

```
1.Claude Code 最大问题：
会“忘记项目结构”

2.解决方案：
强化 CLAUDE.md

3.建议包含：

- 表结构
- API 规范
- 文件结构
- 命名规则
```

