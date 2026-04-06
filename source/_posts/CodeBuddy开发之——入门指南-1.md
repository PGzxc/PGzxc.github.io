---
title: CodeBuddy开发之——入门指南(1)
categories:
  - AI
  - AI开发
  - AI开发工具
  - CodeBuddy
tags:
  - CodeBuddy
abbrlink: 4d6959d8
date: 2026-04-06 10:16:18
---
## 一 概述

```
本文介绍：
 - 什么是 CodeBuddy
 - 产品形态 
 - 安装方式
 - 快速上手
 - 核心功能速览
 - 基础操作技巧
```

<!--more-->

## 二 什么是 CodeBuddy

### 2.1 官网地址

```
官网地址：
https://www.codebuddy.ai/
文档：https://www.codebuddy.ai/docs/zh/ide/Overview

定位：
AI 编程助手 + 全流程开发 IDE（支持 IDE / 插件 / CLI）
```

### 2.2 介绍

```
CodeBuddy 是腾讯云推出的 AI 编程工具，
特点是：覆盖 产品 → 设计 → 开发 → 部署 全流程
```

### 2.3 核心能力

```
- AI 需求生成（PRD）
- 设计稿生成 + 转代码
- 智能补全 / 代码生成
- 自动测试 + 代码审查
- 一键部署
```

### 2.4 本质

```
AI IDE + AI Agent + DevOps 一体化工具
```

## 三 产品形态(3种)

### 3.1  IDE(推荐)

```
- 类似 Cursor / Windsurf
- 内置 AI 工作流
- 适合全流程开发
```

### 3.2 插件模式

```
1.支持：
- VS Code
- JetBrains
- Android Studio
- Xcode

2.适合已有开发环境用户 
```

### 3.3 CLI(CodeBuddy Code)

```
npm install -g @tencent-ai/codebuddy-code

用自然语言驱动开发（类似 Claude Code）
```

## 四 安装方式

### 4.1 方式1：IDE

```
1. 打开官网
2. 下载 CodeBuddy IDE
3. 登录账号即可使用
```

### 4.2 方式2：VSCode 插件

```
1. 打开 Extensions
2. 搜索：CodeBuddy
3. 安装 → 登录
```

### 4.3 方式3：CLI

```
codebuddy
```

## 五 快速上手

### 5.1 打开 AI 对话

```
快捷键：
- Windows：Ctrl + I
- Mac：Cmd + I
```

### 5.2 第一个 Prompt

```
1.示例
帮我写一个 Spring Boot 登录接口

2.自动生成：
- Controller
- Service
- DTO
- 校验逻辑
```

### 5.3 引用上下文(重点)

```
1.示例
@UserService 优化这个类


2.@ 可以引用：
- 文件
- 文件夹
- 当前代码
```

## 六 核心功能速览

### 6.1 智能对话

```
- 技术问答
- 代码解释
- 架构设计
```

### 6.2 代码补全(NES)

```
Next Edit Suggestions

特点：
- 不只是补一行
- 会预测“下一步代码”

类似：
 Cursor + Copilot 的增强版 
```

### 6.3 多文件生成

```
1.示例
帮我实现一个用户系统（登录 + 注册 + JWT）

2.自动生成：
- 多文件代码
- 完整模块结构
```

### 6.4 自动诊断

```
- 找 Bug
- 优化性能
- 自动修复
```

### 6.5 设计转代码(重点)

```
支持：
- Figma → 前端代码
- 手绘 → UI 原型

AI 自动生成页面代码 
```

## 七 基础操作技巧

```
1.内联对话

-直接在代码中：// 优化这段代码
-AI直接修改代码

2.多模态输入

支持：
- 粘截图
- Figma 链接

3.会话管理
- 多对话
- 上下文隔离
- 历史记录
```

## 八 适用人群

```
- 全栈开发（效率神器）
- AI 编程探索者
- 产品 / 设计 / 开发一体团队
- 新手（可直接生成项目）
```

## 九 本篇总结

### 9.1 一句话

```
CodeBuddy 的核心不是“代码补全”，而是：AI 全流程开发平台
```

### 9.2 对比传统工具

|   工具    |    能力    |
| :-------: | :--------: |
|  Copilot  |    补全    |
|  Cursor   |   AI IDE   |
| CodeBuddy | 全流程开发 |