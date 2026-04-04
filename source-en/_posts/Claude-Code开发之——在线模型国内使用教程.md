---
title: Claude Code开发之——在线模型国内使用教程
categories:
  - AI
  - AI开发
  - AI编程助手
  - Claude Code
tags:
  - Claude Code
abbrlink: 78b922d8
date: 2026-04-03 17:13:41
---
## 一 概述

```
本文专为 Claude Code + CC Switch + DeepSeek 在线模型打造的国内使用教程：
 - 使用 CC Switch 一键切换 DeepSeek 在线模型
 - 配置完成后，直接打开 Claude Code 即可使用
 - 无需每次手动改配置文件，切换模型极简
 - 速度快、成本低、支持 DeepSeek 最新强模型
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
Claude Code + CC Switch + DeepSeek = 国内最灵活便捷的在线 AI 编程助手，
一键切换模型，直接启动即用。
```

## 三 为什么选择 CC Switch + DeepSeek

```
- CC Switch 是专为 Claude Code 设计的切换工具，可一键管理多个在线模型
- DeepSeek 在线模型(deepseek-chat、deepseek-reasoner等)速度快、性价比高、代码能力强
- 配置一次后，后续直接打开 Claude Code，无需重复设置
- 国内访问稳定，按量付费，适合高频开发使用
```

## 四 国内使用教程(CC Switch + DeepSeek 在线)

### 4.1 安装步骤(Win/mac/Linux 通用)

```
1. 安装 Node.js（18+ LTS 版本）
2. 全局安装 Claude Code：
   npm install -g @anthropic-ai/claude-code

3. 安装 CC Switch（推荐使用桌面版或命令行版，根据官方 GitHub 最新安装方式）
   - 桌面版：直接下载安装包运行（可视化一键切换）
   - 命令行版：按照对应仓库安装（如 ccm 或 ccs 工具）
4. 安装 Git（可选，但推荐）
```

### 4.2 注册 DeepSeek 并获取 API Key

```
1. 访问 DeepSeek 官网：https://platform.deepseek.com/
2. 使用手机号或邮箱注册账号并登录
3. 进入控制台 → API Key 管理页面
4. 创建新的 API Key（建议单独为 Claude Code 创建）
5. 复制生成的 Key（以 sk- 开头）
```

### 4.3 使用 CC Switch 配置 DeepSeek

```
1. 打开 CC Switch（桌面版直接启动，或命令行输入对应命令）
2. 添加 DeepSeek Provider：
   - Provider 名称：DeepSeek
   - Base URL：https://api.deepseek.com/anthropic
   - API Key：填入你的 DeepSeek API Key
   - 默认模型：deepseek-chat（或 deepseek-reasoner 等你喜欢的模型）
3. 保存配置
4. 一键切换到 DeepSeek Provider（点击 Switch 或对应按钮）
   - CC Switch 会自动更新 ~/.claude/settings.json 等配置文件
```

### 4.4 直接启动 Claude Code

```
配置完成后，无需额外操作，直接在终端输入：
claude

即可直接进入使用 DeepSeek 在线模型的 Claude Code 界面。
```

### 4.5 验证与临时切换

```
- 启动后输入 /model 查看当前模型是否为 DeepSeek 相关模型
- 如需临时切换模型：claude --model deepseek-chat
- 使用 CC Switch 可随时一键切换到其他模型（GLM、Kimi 等），切换后再次直接运行 claude 即可
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
Claude Code + CC Switch + DeepSeek 是国内最推荐的在线灵活方案。
优势：配置一次，永久一键切换，直接打开 claude 即用。
推荐模型：deepseek-chat（日常快） / deepseek-reasoner（复杂推理强）

结合 CC Switch 后，切换 DeepSeek、智谱或其他在线模型都变得极其简单，极大提升开发效率。
```

