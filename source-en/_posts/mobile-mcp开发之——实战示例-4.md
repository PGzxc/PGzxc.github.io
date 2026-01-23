---
title: mobile-mcp开发之——实战示例(4)
categories:
  - 开发
  - R-AI开发助手
  - mobile-mcp
tags:
  - mobile-mcp
abbrlink: ef39b0ba
date: 2025-12-17 09:18:35
---
## 一 概述

```
本文介绍：
-Android音视频App自动操作Demo
-探索型 AI 自动化测试
```

<!--more-->

## 二 Android音视频App自动操作Demo

### 2.1 目标

```
在 Android 手机上打开 B 站，搜索关键词，播放视频并截图
```

### 2.2 Prompt 示例

```
1、在 Android 设备上完成以下操作：
1. 打开哔哩哔哩 App
2. 搜索“Android 音视频 开发”
3. 点击搜索结果中的第一个视频
4. 等待视频开始播放
5. 切换为全屏播放模式
6. 截取当前播放画面

2、Mobile-MCP 自动处理
1.Accessibility Tree 定位 UI 元素
2.输入文本、点击按钮
3.滑动、滚动页面
4.截图保存
```

### 2.3 面试可描述加分点

```
使用 Mobile-MCP + LLM 自动化操作音视频 App，比纯坐标点击或传统 UI 自动化更稳定。
```

## 三  探索型 AI 自动化测试

### 3.1 Prompt 示例

```
对当前 Android 应用执行探索测试：
1. 启动应用
2. 随机浏览 3 个页面
3. 每个页面截图
4. 如果出现异常弹窗，记录并截图
```

### 3.2 使用场景

```
适合演示、探索性测试，传统自动化方案很难覆盖
```

