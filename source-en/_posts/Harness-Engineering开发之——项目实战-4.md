---
title: Harness-Engineering开发之——项目实战(4)
categories:
  - AI
  - AI开发
  - AI Agent
  - Harness-Engineering
tags:
  - Harness-Engineering
abbrlink: c9253ac3
date: 2026-05-15 17:16:02
---
## 一 概述

```
本文介绍：
 - OpenHarness项目介绍
 - Web 前端项目实战
 - Java 后端项目实战
 - Harness优势及工具组合
 - 推荐实践方式
```

<!--more-->

## 二 OpenHarness项目介绍

### 2.1 项目地址及介绍

```
1.项目地址：
https://github.com/HKUDS/OpenHarness

2.介绍：
一个 AI 工程化开发框架。
```

### 2.2 OpenHarness 是什么？

```
1.如何理解：
AI Coding 的工程化运行框架

2.核心目标：
不是让 AI “回答问题”。而是：让 AI 能稳定参与真实项目开发

3.例如：
-Web 前端
-Java 后端
-AI Agent
-自动化工作流
```

### 2.3 核心能力

```
1.OpenHarness 主要包含：
- Agent
- Workflow
- Rules
- Context
- Memory
- 多阶段任务

2.典型流程：
需求
↓
AI 分析
↓
生成代码
↓
代码评审
↓
自动测试
↓
结果输出

3.已经很接近：
真实开发团队协作
```

## 三 项目中如何使用

### 3.1 在项目根目录创建 .harness/

```
例如：

project/
├── src/
├── docs/
└── .harness/
```

### 3.2 建议目录结构

```
.harness/
├── agents/
├── rules/
├── skills/
├── wiki/
└── changes/
```

## 四 Web 前端项目实战

### 4.1 前端项目技术要求

```
React + Vite + TypeScript
```

### 4.2 .harness文件

1-rules/coding-rules.md

```
# Frontend Coding Rules

- 使用 TypeScript
- 组件优先函数式写法
- 状态管理统一使用 Zustand
- API 请求统一封装
- 页面必须支持响应式
- 禁止直接修改 state
```

2-skills/coding-skill.md

```
# Frontend Coding Skill

生成页面前：
1. 阅读 Rules
2. 分析组件结构
3. 优先复用已有组件
4. 输出修改文件列表
```

### 4.3 AI 可以做什么？

1-例如需求：

```
“新增一个用户列表页面”
```

2-AI 会：

```
分析项目结构
↓
读取 Rules
↓
生成 React 页面
↓
生成 API 调用
↓
生成 TypeScript 类型
↓
生成样式
```

## 五 Java 后端项目实战

### 5.1 后端项目技术要求

```
Spring Boot + MyBatis
```

### 5.2 .harness文件

1-rules/architecture-rules.md

```
# Java Architecture Rules

- Controller 不写业务逻辑
- Service 禁止直接写 SQL
- 金额字段统一 Long
- 所有接口必须加日志
- 外部调用必须配置超时
```

2-wiki/domain-model.md

```
# Domain Model

Order：
- id
- userId
- amount
- status
```

### 5.3 AI 可以完成

```
新增订单接口
↓
生成 Controller
↓
生成 Service
↓
生成 DTO
↓
生成 Mapper
↓
生成单元测试
```

## 六 Harness优势及工具组合

### 6.1 为什么它比普通 Prompt 更强？

```
因为：
普通 Prompt：每次都像重新带新人

而 OpenHarness：
会长期保存：

- 项目规则
- 架构约束
- 业务知识
- Workflow
- 历史经验

随着项目进行：

AI 会越来越像：真正熟悉项目的开发成员
```

### 6.2 推荐搭配工具

推荐组合：

|    工具     |      用途      |
| :---------: | :------------: |
|   Cursor    |   AI Coding    |
| Claude Code | Agent Workflow |
|   Ollama    |    本地模型    |
|    Qwen3    |  中文代码能力  |
| OpenHarness |  Harness 系统  |

## 七 推荐实践方式

### 7.1 不建议

```
不要一开始：全项目接入
```

### 7.2 建议：

```
1. 先做一个小模块
2. 建立 .harness/
3. 配置 Rules
4. 做一个简单需求
5. 跑完整 Workflow
```

### 7.3 示例

```
例如：

用户列表
登录模块
订单接口

最适合练手。
```

## 八 总结

### 8.1 一句话理解 OpenHarness：

```
不是“AI 写代码”
而是：“让 AI 按团队规范参与项目开发”
```

### 8.2 这也是：

```
Harness Engineering 真正的核心思想。
```

