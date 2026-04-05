---
title: Cline开发之——安装与模型配置(2)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Cline
tags:
  - Cline
abbrlink: 7d81e662
date: 2026-04-05 15:35:38
---
## 一 概述

```
本文介绍：
 - Cline安装
 - Cline模型配置
```

<!--more-->

## 二 安装与启动

### 2.1 支持 IDE(更多可查看官网)

```
- VS Code
- Cursor
- JetBrains 系列 
```

### 2.2 安装步骤

```
1、安装插件：
在 IDE Marketplace 搜索：Cline
2.打开面板：
安装完成后：左侧会出现 Cline 图标

3.打开控制台
进入：Cline Panel
```

### 2.3 成功标志

```
- 出现聊天窗口
- 可输入指令
- 可连接模型
```

## 三 Cline模型配置及接入

### 3.1 说明

```
Cline 本身不提供模型，需要你配置：OpenAI Compatible API
```

### 3.2 官方配置方式

1-进入：Settings → API Configuration

```
VSCode：左侧Cline——>Settings——>API Configuration
```

2-填写(Ollama可从下拉列表选择)

|   参数   |           示例           |
| :------: | :----------------------: |
| Provider |    OpenAI Compatible     |
| Base URL | http://localhost:3000/v1 |
| API Key  |          sk-xxx          |
| Model ID |     gpt-4 / claude-3     |

### 3.3 支持的模型类型

```
1.支持模型
OpenAI
Claude
本地模型（Ollama）
各种 API 网关

2.本质：
只要兼容 OpenAI API 都能用
```

