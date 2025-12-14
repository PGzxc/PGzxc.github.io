---
title: SmartSub工具——视频提取字幕
categories:
  - 开发
  - Q-AI
  - SmartSub
tags:
  - SmartSub
abbrlink: cfed88fb
date: 2025-12-14 09:52:01
---
## 一 概述

```
本文介绍：
- SmartSub介绍
- SmartSub下载及安装
- SmartSub使用
```

<!--more-->

## 二 SmartSub介绍

```
SmartSub(也称“妙幕”)是一款开源的跨平台工具，
主要用于从视频或音频文件中批量生成字幕(基于 Whisper 模型)，并支持字幕翻译。

它不直接内置变音(语音变速、变调或音色修改)功能，可以结合其他工具(如 FFmpeg)来实现完整的流程。
```

## 三 SmartSub下载及安装

### 3.1 下载工具

```
1、仓库地址
SmartSub：https://github.com/buxuku/SmartSub

2、支持平台
支持 Windows、macOS、Linux

3、下载
最新发布版在Releases页面，选择适合你的平台的安装包(如.exe或.dmg)
```

### 3.2 系统要求

```
-支持 NVIDIA CUDA(Windows/Linux)或 Apple Core ML(macOS M 系列)加速。
-安装 Python 3.10+(如果需要手动安装依赖)。
-无需上传视频，全本地处理。
```

### 3.3 安装依赖

```
运行后，它会自动下载 Whisper 模型(tiny、base、small、medium、large 等)。
选择 large-v3-turbo 模型以获得高准确率。
```

## 四 SmartSub使用(生成字幕)

### 4.1 步骤

```
1.打开 SmartSub 应用。
2.导入视频/音频文件(支持 MP4、MP3、WAV 等格式，支持批量)。
3.配置生成参数：
 -源语言：auto（自动检测）或指定(如 zh 为中文)。
 -模型：推荐 large-v3-turbo(平衡速度和准确性)。
 -VAD 支持：启用(可提高速度，减少静音幻觉)。
 -输出格式：SRT(标准字幕格式)。

4.点击“生成字幕”。工具会提取音频并转录为字幕文件(e.g., video.srt)。
5.可选：翻译字幕(支持百度、火山引擎、OpenAI 等服务，配置 API 密钥。
```

### 4.2 输出

```
生成 .srt 文件，包含时间戳和文本
```

### 4.3 提示

```
如果字幕为空，检查日志(常见于模型加载问题)，或参考 GitHub Issue 如 #185
```

