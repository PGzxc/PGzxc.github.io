---
title: AutoClaw开发之——什么是AutoClaw(1)
categories:
  - AI
  - G-养虾
  - AutoClaw
tags:
  - AutoClaw
abbrlink: 341e0fdf
date: 2026-03-25 08:14:48
---
## 一 概述

```
本文介绍：
 - 什么是 AutoClaw
 - AutoClaw vs OpenClaw
 - 核心能力解析
```

<!--more-->

## 二 什么是 AutoClaw

### 2.1 概念

```
1、概念
AutoClaw(中文名：澳龙)是由智谱 AI 推出的本地版 AI Agent(智能体)平台，基于 OpenClaw 深度定制，

2、主打：
-1键安装（无需环境配置）
-本地运行（更安全）
-多模型接入（DeepSeek / Kimi / GLM 等）
-自动执行复杂任务（Agent能力）
```

### 2.2 官网地址

```
https://autoglm.zhipuai.cn/autoclaw
```

### 2.3 一句话理解

```
AutoClaw = 「能帮你干活的 AI + 自动执行 + 本地部署」
```

## 三 AutoClaw vs OpenClaw

|   对比项   |            OpenClaw            |     AutoClaw      |
| :--------: | :----------------------------: | :---------------: |
|  部署方式  | 手动配置(Node.js / API / 环境) |     一键安装      |
|  上手难度  |          高(开发者向)          |     小白可用      |
|  运行方式  |         本地+配置复杂          |   本地开箱即用    |
|  技能系统  |           需要自己搭           |    内置50+技能    |
| 浏览器操作 |           需额外配置           | 内置Browser Agent |

## 四 核心能力解析

### 4.1 AI Agent 自动执行能力

```
1.说明
AutoClaw 不只是聊天，而是：理解任务/拆解步骤/自动执行/返回结果

2.例如：
-帮我整理一篇AI面试题并生成Markdown
-它会：搜索资料/生成内容/排版输出
```

### 4.2 浏览器自动操作

```
1.内置：AutoGLM Browser Agent

2.能力：
-自动打开网页
-自动登录（利用已有Cookie）
-自动点击 / 填表 / 搜索
-多步骤任务执行

3.相当于：
AI = 会用电脑的人
```

### 4.3 内置 Skills(技能系统)

```
1.AutoClaw 内置 50+ 技能：
 -编程（写代码 / 修Bug）
 -文档（总结 / 转Markdown）
 -数据分析
 -内容创作
 -营销文案

2.类似：
ChatGPT + 插件 + 自动执行
```

### 4.4 多模型接入

```
支持：GLM（官方）/DeepSeek/Kimi/MiniMax
可自由切换模型策略
```

