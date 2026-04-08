---
title: codex-plugin-cc系列之——快速上手(3)
categories:
  - AI
  - AI开发
  - AI Agent
  - codex-plugin-cc
tags:
  - codex-plugin-cc
abbrlink: f09df7a0
date: 2026-04-08 10:01:02
---
## 一 概述

```
本文介绍：
 - 前置条件
 - 安装插件
 - 配置环境变量
 - 注册到 Claude Code
```

<!--more-->

## 二 快速上手

### 2.1 前置条件—必须具备

```
1.已安装：
  - Claude Code CLI
  - Node.js / npm
2.可用：
  - OpenAI API Key（用于 Codex）
```

### 2.2 安装插件

```
git clone https://github.com/openai/codex-plugin-cc
cd codex-plugin-cc
npm install
```

### 2.3 配置环境变量

```
export OPENAI_API_KEY=your_api_key
```

### 2.4 注册到 Claude Code

```
在 Claude Code 配置中加入：

{
  "plugins": [
    {
      "name": "codex",
      "command": "node path/to/plugin/index.js"
    }
  ]
}
```

