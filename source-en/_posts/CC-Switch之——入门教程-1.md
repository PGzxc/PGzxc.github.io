---
title: CC-Switch之——入门教程(1)
categories:
  - AI
  - AI开发
  - AI编程助手
  - CC-Switch
tags:
  - CC-Switch
abbrlink: a116da6b
date: 2026-04-04 13:56:18
---
## 一 概述

```
本文介绍：
 - CC-SWitch入门教程
```

<!--more-->

## 二 CC-Switch介绍

### 2.1 概念

```
CC Switch 是一个专为 AI 编程工具设计的开源桌面管理工具，
核心能力是：统一管理 & 一键切换各类 CLI 工具的模型供应商（Provider）。

支持工具包括：
- Claude Code
- Codex（OpenAI CLI）
- Gemini CLI
- OpenCode
- OpenClaw 等

它解决了开发者最头疼的问题：
 -频繁手改 JSON / TOML / .env 配置
 -多模型切换成本高
 -国内环境访问困难
```

### 2.2 核心能力总结

```
-一键切换模型（无需改配置文件）
-内置 50+ Provider（Claude / DeepSeek / GLM / 通义 / Kimi）
-支持自定义 Provider（可接入 New API / Ollama）
-MCP（工具扩展）统一管理
-Skills（自动化能力）管理
-Prompts（提示词模板）管理
-系统托盘快速切换
```

### 2.3 项目地址

```
GitHub：
https://github.com/farion1231/cc-switch
```

### 2.4  适用人群

```
AI 编程工具重度用户（Claude Code / Codex）
本地模型玩家（Ollama / vLLM）
想统一管理多模型的开发者
国内无法直接使用 Claude / OpenAI 的用户
```

## 二 安装步骤

### 2.1 前置环境

```
Node.js >= 18（必须）
原因：Claude Code / Codex / Gemini CLI 都依赖 Node.js
```

### 2.2 各平台

1-Windows

```
1. 下载 .msi 安装包（推荐）
2. 双击安装
3. 如提示“Windows 已保护你的电脑”
   → 点击【更多信息】→【仍要运行】
```

2-macOS(推荐 Homebrew)

```
brew tap farion1231/ccswitch
brew install --cask cc-switch

或：
下载 ZIP → 拖入 Applications → 右键打开
```

3-Linux

```
支持：
- deb / rpm
- AppImage
- Flatpak
- Arch (AUR)
```

### 2.3 启动说明

```
启动后：
- 系统托盘出现图标
- 自动扫描已安装的 CLI 工具
- 自动尝试导入配置
```

## 三 快速上手

### 3.1 界面说明

```
顶部：工具切换（Claude Code / Codex / Gemini 等）
右上角：Provider 管理（核心入口）
左侧：Skill / MCP / Prompt 管理
底部：当前启用状态
```

### 3.2 添加 Provider

方法1：使用内置 Provider（新手推荐）

```
1. 点击右上角 [+ Add Provider]
2. 选择内置：
   - Claude Official
   - DeepSeek
   - Zhipu GLM
   - 阿里通义
   - Kimi
3. 填写 API Key
4. 保存
```

 方法2：自定义 Provider(实战推荐)

```
强烈建议接入 New API（统一网关）：
Name: NewAPI
Base URL: http://localhost:3000/v1
API Key: sk-xxxx
Model: gpt-4o / claude / deepseek-chat

2、优势：
一个 Key 管所有模型
支持自动路由
国内可用
```

 方法3：接入本地模型(Ollama)

```
Name: Ollama
Base URL: http://localhost:11434/v1
API Key: ollama
Model:
- qwen3:8b
- llama3:8b
```

避坑

```
-模型名必须和服务端一致
-本地模型不需要代理
-云模型必须走代理
```

### 3.3 切换 Provider

```
方式一（推荐）：
点击 Provider → 启用

方式二（最快）：
系统托盘 → 右键 → 直接切换
```

生效机制:

|    工具     | 是否需要重启 |
| :---------: | :----------: |
| Claude Code |    不需要    |
|    Codex    |   建议重启   |
| Gemini CLI  |     支持     |
|  OpenCode   |     支持     |

### 3.4 恢复官方 Claude

```
1. 添加 Claude Official
2. 启用
3. 重启 CLI
4. 登录（OAuth）
```

## 四 进阶功能

### 4.1 MCP 管理(工具扩展)

```
1、MCP 是什么？
MCP = 模型外挂能力

让 AI 可以：
-读文件
-调接口
-操作 Git
-控制浏览器

2、示例（文件系统）
{
  "mcpServers": {
    "fs": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    }
  }
}

3、使用步骤
-点击 MCP
-添加服务器
-启动
-勾选应用同步
4、推荐组合（实战）
-filesystem（读代码）
-git（分析仓库）
-http（接口调用）

= AI 自动开发环境
```

### 4.2 Skills(自动化能力)

1-本质

```
Skill = Prompt + Tool + 自动执行逻辑
```

2-示例(代码审查)

```
name: code-review
prompt: |
  请审查以下代码：
  - 找出 bug
  - 给出优化建议
```

3-使用

```
Skill → 新建 → 绑定模型 → 保存
```

4-推荐 Skill 分类

|   类型    |      模型       |
| :-------: | :-------------: |
| 日常问答  |    qwen3:8b     |
|   编程    | gpt-4o / claude |
| Agent任务 |    OpenClaw     |

### 4.3 Prompts(提示词管理)

```
1、本质
Prompt 模板系统

2、示例
Android 面试
你是Android专家，请回答：
- 原理
- 面试回答
- 示例代码

3、使用
Prompts → 新建 → 选择模型 → 启用

4、高级玩法
系统 Prompt
+ 场景 Prompt
+ 用户输入

三层结构效果最佳
```

### 4.4 多模型工作流

1-推荐架构

```
CC Switch
   ↓
New API（统一入口）
   ↓
├── Ollama（本地模型）
├── Claude
├── OpenAI
├── Gemini
├── Kimi
```

2-推荐模型分工

|   场景   |     模型      |
| :------: | :-----------: |
| 日常对话 |   qwen3:8b    |
|   编程   | qwen2.5-coder |
|  强推理  | Claude / GPT  |
| 自动任务 |   OpenClaw    |

## 五 总结

```
1、CC Switch 的核心价值
不是工具本身，而是：AI 工具链的统一控制中心

2、一句话理解
CC Switch = AI 版「多模型调度中控台」
```

