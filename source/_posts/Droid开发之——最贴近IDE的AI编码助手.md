---
title: Droid开发之——最贴近IDE的AI编码助手
categories:
  - AI
  - AI开发
  - AI编程助手
  - Droid
tags:
  - Droid
abbrlink: b53bcd38
date: 2026-04-05 16:18:37
---
## 一 概述

```
本文介绍：
 - Droid工具定位
 - 核心特点
 - 安装与快速上手
 - 实战演示
```

<!--more-->

## 二 Droid工具定位

```
1.定位
- 类型：AI 编程助手（偏 IDE 集成）
- 开发方：Factory.ai
- 官网地址：https://factory.ai

2.Droid 的核心理念：
-让 AI 融入你的开发流程，而不是改变你的开发习惯
```

## 三 核心特点(为什么选它)

### 3.1 深度 IDE 集成

```
1.支持：
- VS Code
- JetBrains（IntelliJ / Android Studio）
- Cursor

2.基本等同“Copilot + Agent”的升级版
```

### 3.2 多模型自由切换

```
1.支持：
- OpenAI（GPT）
- Anthropic（Claude）
- Google（Gemini）
- 本地模型（Ollama / DeepSeek）

2.不同任务用不同模型（非常关键）
```

### 3.3 可控 AI(企业级思路)

```
- 自治等级：低 / 中 / 高
- 所有改动先 Diff 审查
- 权限可控（不会乱改代码）

比 Goose 更“稳”，更适合团队
```

### 3.4 大仓库理解能力

```
- 支持百万行代码
- 自动跨文件修改
- 上下文标签（Context Tag）
```

## 四 安装与快速上手

### 4.1 安装(示例 VS Code)

```
# 安装插件（市场搜索 Droid）
```

### 4.2 CLI 启动

```
droid init
droid run
```

## 五 实战演示(重点)

### 5.1 场景：重构一个旧项目

```
1：加载项目:droid analyze .
2：提出需求:帮我将这个项目改成 MVVM 架构，并拆分模块
3：查看 Diff
Droid 会生成：
- 文件修改列表
- 代码 diff

4：人工确认:apply changes
```

### 5.2 实际效果

```
- 自动拆分层级
- 重构类结构
- 保证代码可控
```

## 六 适用人群

```
-IDE 重度用户
-企业开发 / 团队协作
-想要“安全 AI”的开发者
```

## 七 总结

```
1.Droid = AI Copilot + 可控 Agent

2.优点：
- 上手简单
- IDE 无缝融合
- 安全可控

3.缺点：
- 自主能力不如 Goose
- 部分功能可能收费
```

