---
title: AI图谱系列之——AI开发范式之Prompt-first(13.5)
categories:
  - AI
  - AI图谱
  - AI系列
tags:
  - AI系列
abbrlink: 17d7160a
date: 2026-04-07 21:05:33
---
## 一 概述

```
本文介绍：
 -AI开发范式之Prompt-first/Graph-first Workflow
```

<!--more-->

## 二 AI开发范式

### 2.1 总体理解

```
传统开发：人写代码 → 调API → 完成功能
AI开发：人描述目标 → AI规划 → AI执行 → 人做决策
```

### 2.2  本质变化

```
“编写代码” → “编排智能”
```

## 三 AI开发范式之Prompt-first/Graph-first Workflow

### 3.1  Prompt-first(提示词优先)

```
1.概念
先设计Prompt → 再开发

2.特点：
Prompt就是“程序”
强依赖Prompt工程
```

### 3.2 Graph-first(流程优先)

```
1.概念
先设计流程（DAG） → 再接模型

2.特点：
强调：
-Workflow
-状态流转
-多步骤执行
```

3.对比

|     模式     |    特点    |
| :----------: | :--------: |
| Prompt-first | 快速、灵活 |
| Graph-first  | 稳定、可控 |


