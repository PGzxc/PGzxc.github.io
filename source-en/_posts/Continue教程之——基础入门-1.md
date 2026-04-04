---
title: Continue教程之——基础入门(1)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: 623e4c0c
date: 2026-04-04 19:24:25
---
## 一 概述

```
本文介绍：
 -Continue 是什么？为什么它比 Copilot 更强？
 -Continue 简介
 -和 GitHub Copilot / Cursor / Claude Code 对比
 -架构（IDE 插件 + CLI + Checks + 模型）
 -支持模型：本地：Ollama+云：OpenAI / Anthropic /
```

<!--more-->

## 二 什么是 Continue？

```
Continue 是一个 开源 AI 编程助手框架，
可以理解为：IDE 插件 + CLI + AI 模型统一接入层

它的目标不是“一个 AI”，而是：让你自由选择 AI
```

## 三 为什么不用 Copilot？

### 3.1 对比主流工具

|      工具      |     特点      |      限制      |
| :------------: | :-----------: | :------------: |
| GitHub Copilot |   简单易用    | 只能用官方模型 |
|     Cursor     |    AI IDE     |    封闭生态    |
|  Claude Code   |     强大      |    依赖账号    |
|    Continue    | 开源 + 可扩展 |  需要自己配置  |

### 3.2 Continue 最大优势

```
-可接入任意模型（本地 / 云）
-支持 CLI + IDE
-支持自动检查（Checks）
-可自定义 AI 行为
```

## 四 核心架构

Continue 主要由 3 部分组成：

### 4.1  IDE 插件

```
1.支持：
- VS Code
- JetBrains（IntelliJ / Android Studio）

2.用于：
- AI 对话
- 代码生成
- 自动补全
```

### 4.2 CLI(命令行工具)

```
让 AI 进入终端：
continue ask "帮我优化这个函数"
continue edit file.js
```

### 4.3 Checks(自动审查)

```
类似：AI Code Review + 自动规范检查
```

## 五 支持的模型

Continue 最大亮点：模型完全自由

### 5.1 本地模型(推荐)

```
通过 Ollama：
- qwen2.5 / qwen3
- llama3
- mistral

优点：
 -免费
 -离线运行
 -数据安全
```

### 5.2 云模型

```
1. OpenAI
- GPT 系列
- 代码能力强

2. Anthropic
- Claude 系列
- 长文本强

3. Google DeepMind
- Gemini
- 多模态
```

## 六 典型使用场景(Continue 可以做什么)

### 6.1  写代码

```
帮我写一个 Android 登录页面
```

### 6.2  改代码

```
优化这个函数性能
```

### 6.3 修 Bug

```
这个崩溃怎么修？
```

### 6.4 读项目

```
解释这个仓库结构
```

### 6.5 写测试

```
帮我写单元测试
```

## 七 总结

### 7.1 Continue = AI 编程操作系统

```
可以这样理解：
Ollama = 模型运行层
Continue = AI 开发操作系统
```

### 7.2 一句话总结

```
不是一个 AI，而是 AI 的“入口平台”
```

