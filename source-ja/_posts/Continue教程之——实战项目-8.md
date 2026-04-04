---
title: Continue教程之——实战项目(8)
categories:
  - AI
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 4508f56a
date: 2026-04-04 19:29:32
---
## 一 概述

```
本文介绍：
 -用 Continue 开发一个完整项目
 -从 0 到 1
 -自动生成代码
 -自动修复 bug
 -自动写测试
```

<!--more-->

## 二 本篇目标

### 2.1 要实现

```
从一句话需求 → 完整项目代码
```

### 2.2 技术栈(示例)

```
- 前端：React / Vue
- 后端：Node.js（Express）
- 数据库：SQLite / MySQL
- AI 工具：Continue
- 本地模型：Ollama
- 网关：New API + CC Switch
```

### 2.3 完整架构回顾

```
开发者
   ↓
Continue（IDE / CLI）
   ↓
Agent（自动执行）
   ↓
RAG（知识库）
   ↓
New API（网关）
   ↓
模型（本地 + 云）
```

## 三 实战项目：开发一个博客系统

### 3.1 需求

```
开发一个博客系统：
- 用户登录注册
- 文章发布
- 评论功能
- 管理后台
```

### 3.2 第一步：用 Agent 拆解需求(关键)

```
1.在 Continue 输入：

请帮我完成一个博客系统开发，要求：
1. 拆解模块
2. 设计技术架构
3. 给出目录结构


二、AI 输出（示例）：

2.1-模块拆解

-用户模块
-文章模块
-评论模块
-管理后台

2.2 项目结构

backend/
  ├── controllers/
  ├── models/
  ├── routes/

frontend/
  ├── pages/
  ├── components/
```

### 3.3 第二步：生成后端代码

```
1.使用 CLI：
continue generate "用 Node.js + Express 实现用户登录注册接口"

2.AI 会生成：

- 用户表
- 登录接口
- JWT 认证

3.继续生成：
continue generate "实现文章 CRUD 接口"
```

### 3.4 第三步：生成前端页面

```
1.continue generate "用 React 写一个博客首页"
2.continue generate "实现登录页面（带表单校验）"
3.如果你是 Android：用 Jetpack Compose 写一个博客 App
```

### 3.5 第四步：结合 RAG(项目记忆)

```
1.把已有代码加入上下文：
选中项目 → Add to Context

2. 然后再问：

帮我优化文章模块结构

AI 会：
-基于当前项目分析
-给出更合理设计
```

### 3.6 第五步：自动优化 + 重构

```
1.continue edit backend/
2.输入：优化代码结构，符合最佳实践

3.AI 会：
- 重构代码
- 优化结构
- 提升可维护性
```

### 3.7 第六步：自动代码审查(Checks)

```
1.git diff | continue ask "做代码审查"

2.输出：
-安全问题
-性能问题
-优化建议
```

### 3.8 第七步：自动生成测试

```
1.continue edit backend/user.js

2.输入：为这个模块补充单元测试

3.自动生成：
- 测试代码
- Mock 数据
```

### 2.9 第八步：一键自动开发(终极玩法)

```
1.超级 Prompt（推荐）

请完成一个完整博客系统开发，要求：
1. 分模块开发
2. 每一步输出代码
3. 自动优化结构
4. 最终给出完整项目

2.本质：
Agent 自动开发项目
```

## 三 最强方案

### 3.1 当前

```
- Ollama 
- Continue
- CC Switch
- New API
```

### 3.2 最终形态

```
Continue
   ↓
Agent（自动开发）
   ↓
RAG（项目记忆）
   ↓
New API（网关）
   ↓
Ollama + GPT + Claude
```

### 3.3 策略

```
开发阶段 → 本地模型
复杂设计 → 云模型
项目理解 → RAG
```

## 四 实战注意事项

```
1.一次性让 AI 做太多
正确：分步骤执行

2.不给上下文
正确：加入项目代码（RAG）

3.不做审查
正确：用 Checks 审核
```

## 五 本篇总结

### 5.1 核心

```
AI = 开发助手 → 开发执行者
```

### 5.2 完整能力闭环

```
生成 → 修改 → 审查 → 优化 → 测试
```

### 5.3 最终效果

```
 一个人 + AI = 一个团队
```

