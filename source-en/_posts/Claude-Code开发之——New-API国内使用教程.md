---
title: Claude Code开发之——New-API国内使用教程
categories:
  - AI
  - AI开发
  - AI编程助手
  - Claude Code
tags:
  - Claude Code
abbrlink: 35715d7d
date: 2026-04-03 17:13:03
---
## 一 概述

```
本文专为 New API(或 One API、自建 OpenAI 兼容中转)打造的 Claude Code 国内使用教程：
- 使用现有 New API 服务即可接入多种模型
- 支持 Claude / DeepSeek / Qwen / GPT 等模型一键切换
- 成本可控、速度快、配置简单
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
Claude Code + New API = 国内最灵活的 AI 编程助手，
可自由切换国内外多种顶级模型。
```

## 三 为什么选择 New API

```
国内 Claude 官方无法直接使用，而 New API 完美解决了这一问题。

New API 方案优势：
- 一套配置支持多种模型（Claude、DeepSeek、Qwen、GPT 等）
- 无需 Claude 官方账号
- 国内服务器部署速度更快、成本更低
- 便于统一管理多个 AI 服务
```

## 四 国内使用教程(New API 版)

### 4.1 安装步骤(Win/mac/Linux 通用)

```
1.安装 Node.js(18+ LTS 版本)
2.全局安装 Claude Code：
npm install -g @anthropic-ai/claude-code

3. 确保你的 New API 服务已正常运行(默认端口通常为 3000)
4. 安装 Git（可选，但推荐）
```

### 4.2 配置 settings.json(跳过登录)

```
1.文件位置：
Windows：C:\Users\你的用户名\.claude\settings.json
macOS/Linux：~/.claude/settings.json

2.完完整 New API 配置（复制后替换你的信息即可）：
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:3000",
    "ANTHROPIC_API_KEY": "sk-MOwwceHYRACAgr3JB1gtAwTnmEQMiNXjqquGFbFEtTi1DGGh",
    "ANTHROPIC_AUTH_TOKEN": ""
  },
  "skipAuth": true,
  "disableAnalytics": true,
  "defaultMode": "bypassPermissions"
}

注意：
-如果你的 New API 端口不是 3000，请修改 ANTHROPIC_BASE_URL 中的端口
-ANTHROPIC_API_KEY 填你在 New API 中创建的密钥
```

### 4.3 启动与验证

```
1.启动 Claude Code(指定模型)：
claude --model qwen3.5:4b

2.输入 /model 查看当前使用的模型
3. 如需临时切换模型，可使用：
   claude --model deepseek-coder-v2
   或
   claude --model qwen2.5-coder:32b
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
New API 是目前国内最灵活的 Claude Code 使用方案。
推荐组合：
- 日常开发 → DeepSeek-Coder-V2 或 Qwen2.5-Coder（速度快、免费额度高）
- 极致效果 → Claude 4.6 Sonnet 中转（少量付费）
- 多模型切换需求 → New API 是最佳选择

配置一次，即可自由切换各种顶级模型，性价比极高。
```

