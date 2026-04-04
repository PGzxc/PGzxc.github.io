---
title: Continue教程之——CLI使用详解(3)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Continue
tags:
  - Continue
abbrlink: c8dafff7
date: 2026-04-04 19:26:14
---
## 一 概述

```
本文介绍：
 -Continue CLI：终端里的 AI 超能力
 -CLI 安装
 -基本命令
 -代码生成 / 修改
 -与 IDE 联动
```

<!--more-->

## 二 相关概念

### 2.1 什么是 Continue CLI？

```
Continue CLI 是 Continue 的命令行工具，可以理解为：
在终端中直接调用 AI 操作代码

它的定位类似：
- AI + Shell
- AI + Git
- AI + DevOps
```

### 2.2 为什么 CLI 很重要？

1-概念

```
传统方式：复制代码 → 粘贴到 ChatGPT → 再复制回来
Continue CLI：AI 直接操作你的项目
```

2-对比

|     方式     |  效率  |
| :----------: | :----: |
| ChatGPT 网页 |  手动  |
|   IDE 插件   | 半自动 |
|     CLI      | 全自动 |

## 三 Continue CLI安装及配置

### 3.1 安装 Continue CLI

```
1、MacOS/Linux
curl -fsSL https://raw.githubusercontent.com/continuedev/continue/main/extensions/cli/scripts/install.sh | bash

2、Windows
irm https://raw.githubusercontent.com/continuedev/continue/main/extensions/cli/scripts/install.ps1 | iex


3、使用 npm 安装
npm i -g @continuedev/cli

4、验证安装
cn --version

显示：1.5.45
```

### 3.2 初始化配置

```
首次使用：
cn login

或直接使用本地模型

如果登录失效，请使用如下指令初始化
cn init
```

### 3.3 连接模型—CLI 和 IDE 共用配置

1-本地模型

```
1-使用：Ollama
确保：ollama serve

2-配置(C:\Users\83422\.continue\config.yaml)
name: Local Ollama Only
version: 1.0.0
schema: v1

models:
  - name: Qwen2.5 Coder 7B
    provider: ollama
    model: qwen2.5:7b
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
      - apply
      - summarize
      - autocomplete
    default: true
    
3-启动
cn --config C:\Users\83422\.continue\config.yaml
```

2-云模型

```
1-OpenAI配置
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "apiKey": "xxx"
}

2-强烈建议(统一走网关)
Continue → New API → CC Switch
```

## 四 核心命令详解

### 4.1 continue ask(最常用)

```
1. 向 AI 提问
continue ask "解释这个项目"

2. 带上下文：
continue ask "优化这个函数" src/utils.js
```

### 4.2 continue edit

```
1.AI 自动改代码
continue edit src/App.js

2.示例：

continue edit src/login.js
# 输入：把这个页面改成支持手机号登录

AI 会：
- 读取文件
- 修改代码
- 给出 diff
```

### 4.3 continue generate

```
1.生成新文件
continue generate "创建一个 express 服务器"
```

### 4.4 continue chat

```
1.进入交互模式
continue chat

2.效果类似：
一个终端里的 ChatGPT
```

### 4.5 continue diff

```
1.查看 AI 修改
continue diff
```

### 4.6 continue apply

```
1.应用修改
continue apply
```

## 五 真实开发场景

### 5.1 场景 1：快速生成接口

```
continue generate "用 Node.js 写一个登录接口"
```

### 5.2 场景 2：批量优化代码

```
1.指令
continue edit src/

2.AI 会：
- 扫描目录
- 优化代码
- 提升性能
```

### 5.3 场景 3：修 Bug

```
continue ask "这个报错怎么解决" error.log
```

### 5.4 场景 4：自动写测试

```
continue edit src/utils.js
# 输入：为这个文件补充单元测试
```

## 六 进阶

### 6.1 和 Git 结合

```
1.自动生成 commit message
git diff | continue ask "生成 commit message"

2.自动 Review 代码
git diff | continue ask "帮我做代码审查"
```

### 6.2 和 Shell 管道结合

```
cat logs.txt | continue ask "分析错误原因"
```

### 6.3 和 CI/CD 结合

```
可以用于：

- 自动代码检查
- 自动修复问题
- 自动生成文档
```

### 6.4 最佳实践

```
1.现在有：
- Ollama
- CC Switch
- New API

2.推荐架构：

Continue CLI
   ↓
New API（统一入口）
   ↓
Ollama / GPT / Claude

3.好处：
-CLI 无感切换模型
-成本可控
-本地 + 云混合
```

## 七 常见问题

### 7.1 CLI 没反应

```
检查：
continue --version
```

### 7.2 模型不可用

```
检查：ollama list
```

### 7.3 请求失败

```
检查：

- API Key
- Base URL
- 端口
```

## 八 本篇总结

### 8.1 Continue CLI 的本质

```
AI + 命令行自动化
```

### 8.2 它比 IDE 插件更强的地方在于

```
-可脚本化
-可批量操作
-可接入 DevOps
```

