---
title: mobile-mcp开发之——工程架构设计(5)
categories:
  - 开发
  - R-AI开发助手
  - mobile-mcp
tags:
  - mobile-mcp
abbrlink: 4772f946
date: 2025-12-17 09:23:56
---
## 一 概述

```
本文介绍：
-架构概览
-特点
-场景示例
```

<!--more-->

## 二 架构概览

```
React Native / Flutter App
        ↑（黑盒）
mobile-mcp（设备控制）
        ↑
LLM / Agent（决策）
        ↑
自然语言 / 脚本
```

## 三 特点

```
1、App 完全不改代码
2、AI 代理负责决策
3、MCP Server 执行设备操作
4、可同时支持 Android 和 iOS
```

## 四 场景示例

```
-自动化测试 RN 页面
-视频播放操作
-黑盒回归测试
```

