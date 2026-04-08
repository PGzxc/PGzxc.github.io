---
title: Hermes-Agent系列之——进阶Skills机制(5)
categories:
  - AI
  - AI开发
  - AI Agent
  - Hermes-Agent
tags:
  - Hermes-Agent
abbrlink: 10b2e3d9
date: 2026-04-08 10:20:42
---
## 一 概述

```
本文介绍：
 - Skill 本质
 - Skill 生命周期
 - 手动创建 Skill
```

<!--more-->

## 二 进阶Skills机制

### 2.1 Skill 本质

```
类似：
Prompt + Tool + Memory = Skill
```

### 2.2 Skill 生命周期

```
执行任务
   ↓
总结经验
   ↓
生成 Skill
   ↓
复用 Skill
   ↓
持续优化
```

### 2.3  手动创建 Skill(推荐)

```
/hermes skill create

示例：
name: generate-readme
description: 自动生成README
steps:
  - scan project
  - summarize
  - write markdown
```

