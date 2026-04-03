---
title: Claude Code开发之——本地Ollama模型使用教程
categories:
  - AI
  - AI编程助手
  - Claude Code
tags:
  - Claude Code
abbrlink: e515d4a8
date: 2026-04-03 17:10:19
---
## 一 概述

```
本文专为本地 Ollama 模型打造的 Claude Code 国内使用教程：
-完全无需账号、无需翻墙、无需 API Key
-纯本地运行，隐私安全
-实战示例全覆盖
```

<!--more-->

## 二 Claude Code(cc)是什么

### 2.1 概念

```
Claude Code（简称 cc）是 Anthropic 推出的命令行 AI 编程助手（CLI Agent），
2025 年初发布的官方 CLI 工具（支持终端 + VS Code 插件）。

类似 GitHub Copilot CLI，但更偏向终端流 Agent，自主性极强。
```

### 2.2 核心能力

```
-自动读取项目文件（@folder / @file）
-执行 shell、Git 操作
-自主规划 → 执行 → 测试 → 迭代（像真人程序员）
-支持 MCP 多命令规划、Artifacts 可视化预览
-远超 Cursor / Continue.dev 的代理式编程体验
```

### 2.3 一句话总结

```
Claude Code + 本地 Ollama = 你电脑里真正可离线运行的 AI 程序员，
适合企业级项目、复杂重构、Agent 开发。
```

## 三 为什么选择本地 Ollama

```
国内 Claude 官方无法直接使用（账号 + API 限制）。

本地 Ollama 方案优势：
-完全离线，无需网络
-零成本、无隐私泄露
-支持 Qwen2.5-Coder、DeepSeek-Coder-V2、Llama-3.1 等开源模型
```

## 四 国内使用教程(纯本地 Ollama)

### 4.1 安装步骤(Win/mac/Linux 通用)

```
1.安装 Node.js(18+ LTS 版本)
2.全局安装 Claude Code：
npm install -g @anthropic-ai/claude-code

3.安装并启动 Ollama(官网下载最新版)
ollama serve

4.下载推荐模型(建议至少 7B 以上)：
ollama pull qwen2.5-coder:7b
ollama pull qwen2.5:14b   # 效果更强

5.安装 Git（可选，但推荐）
```

### 4.2 配置 settings.json(跳过登录)

```
1.文件位置：
Windows：C:\Users\你的用户名\.claude\settings.json
macOS/Linux：~/.claude/settings.json

2.完整本地 Ollama 配置（复制即可）：
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_BASE_URL": "http://127.0.0.1:11434",
    "ANTHROPIC_DEFAULT_MODEL": "qwen2.5-coder:7b"
  },
  "skipAuth": true,
  "disableAnalytics": true,
  "disableAutoUpdate": true,
  "defaultMode": "bypassPermissions",
  "hasCompletedOnboarding": true
}
```

### 4.3 启动与验证

```
1.指令(指定模型)
claude --model qwen3.5:4b

2.输入 /model 查看当前模型是否为本地 Ollama 模型。
```

## 五 实战示例

### 5.1 简单测试

```
帮我写一个 Web 前端简历页面
```

### 5.2 新功能开发

```
text/new-feature 用户注册模块
```

## 六 总结

```
完全免费 + 隐私优先 → 推荐 Ollama + Qwen2.5-Coder 14B
本地模型已能满足 90% 以上日常开发与重构需求，彻底摆脱账号和网络依赖。
```

