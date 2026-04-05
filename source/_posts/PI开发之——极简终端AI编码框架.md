---
title: PI开发之——极简终端AI编码框架
categories:
  - AI
  - AI开发
  - AI编程助手
  - PI
tags:
  - PI
abbrlink: 38d1d5c
date: 2026-04-05 16:25:42
---
## 一 概述

```
本文介绍：
 - 工具定位
 - 核心特点
 - 安装与快速上手
 - 实战演示
```

<!--more-->

## 二 工具定位

```
1.定位
- 类型：AI 编码框架（极简 CLI）
- 作者：Mario Zechner
- 官网地址：https://github.com/badlogic/pi

2.Pi 核心理念：
适配你的工作流，而不是限制你
```

## 三 核心特点

### 3.1 极简设计

```
1.无 GUI
2.无复杂 Agent
3.仅 4 个工具：
  - read
  - write
  - edit
  - bash
```

### 3.2 高上下文利用率

```
- Prompt < 1000 token
- 几乎不浪费上下文

非常适合本地模型
```

### 3.3 高度可定制

```
1.Skills（技能包）

# skill: refactor
将代码重构为函数式风格

调用：/skill:refactor

2.Extensions（扩展）：
export function myTool() {// 自定义能力}

3.Prompt Templates：
fix_bug_template
generate_api_template
```

### 3.4 本地 + 云模型混用

```
支持：
- Ollama
- OpenAI
- Claude
```

## 四 安装与启动

### 4.1 安装

```
git clone https://github.com/badlogic/pi
cd pi
npm install
```

### 4.2 启动

```
pi
```

## 五 实战演示

### 5.1 场景：修复 Bug（终端流）

```
1：读取代码
/read src/main.js

2：描述问题
这个函数有内存泄漏，帮我修复

3：执行修改
/edit src/main.js

4：运行测试
/bash npm test
```

### 5.2 最终结果

```
全流程在终端完成，无任何 UI 干扰
```

## 六 适用人群

```
-终端重度用户
-喜欢 DIY 工作流
-使用本地模型开发者
```

## 七 总结

```
Pi = AI 编程的“乐高底座”

优点：
- 极轻量
- 可定制性最强
- 性能极高

缺点：
- 没有开箱即用体验
- 需要自己搭系统
```

