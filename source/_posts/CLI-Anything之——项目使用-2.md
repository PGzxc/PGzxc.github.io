---
title: CLI-Anything之——项目使用(2)
categories:
  - AI
  - AI应用
  - AI工具
  - CLI增强
tags:
  - CLI-Anything
abbrlink: a2677f1c
date: 2026-04-23 08:42:28
---
## 一 概述

```
本文介绍：
 - 环境配置
 - 安装CLI-Anything
 - 使用
```

<!--more-->

## 二 环境配置

### 2.1 环境要求

```
环境要求：Python 3.10+，目标软件已安装（例如 GIMP、Blender 等）。
```

### 2.2 Windows 用户

```
建议安装 Git for Windows（含 bash 和 cygpath），或使用 WSL。
```

### 2.3 AI及LLM

```
1.已安装Claude Code并且能正常使用
2.LLM：本地及网络，且能正常使用
```

## 三 Claude Code 推荐安装与使用

### 3.1 添加插件市场

```
/plugin marketplace add HKUDS/CLI-Anything
```

图示

![][1]

### 3.2 安装插件

```
/plugin install cli-anything
```

图示

![][2]

安装完成后，要重新加载

![][3]

### 3.3 生成 CLI(核心命令)

```
/cli-anything:cli-anything ./gimp          # 本地路径
# 或直接用 GitHub 仓库
/cli-anything:cli-anything https://github.com/blender/blender
```

图示
![][4]

### 3.4 增量优化(当功能不足时)：

```
/cli-anything:refine ./gimp                # 通用优化
/cli-anything:refine ./gimp "批处理和滤镜"  # 指定方向优化


生成完成后，会在对应目录（如 gimp/agent-harness）创建完整的 CLI 项目，
包含 SKILL.md（供 Agent 理解）、测试文件等。
```

## 四 使用

### 4.1 进入目录并安装：

```
cd gimp/agent-harness
pip install -e .
```

### 4.2 常用命令示例：

```
cli-anything-gimp --help                    # 查看所有命令
cli-anything-gimp project new --width 1920 --height 1080 -o poster.json
cli-anything-gimp --json layer add -n "Background" --type solid --color "#1a1a2e"
```

### 4.3 进入交互式 REPL 模式：

```
cli-anything-gimp
```

## 五 其他 AI 平台支持方式

```
1.OpenCode：
克隆仓库，复制命令文件到 ~/.config/opencode/commands/，然后使用 /cli-anything ./gimp。

2.OpenClaw：
复制 SKILL.md 到技能目录，用自然语言如 @cli-anything build a CLI for ./gimp 调用。

3.Qodercli / GitHub Copilot CLI / Codex：
也有对应插件安装和命令，详见 GitHub README。

4.社区 CLI-Hub：
通过 pip install cli-anything-hub 统一管理已构建的 CLI（浏览、安装、更新）。
```

## 六 注意事项与进阶

```
生成的 CLI 会自动调用真实软件后端，确保功能完整。
支持多次 refine 来扩展特定功能（如“添加批处理支持”）。
社区鼓励提交 PR，贡献新的 CLI 或优化。
更多示例和支持软件列表，可直接访问 GitHub README_CN.md 或 CLI-Hub 网站。
```

## 七 总结

```
CLI-Anything 极大降低了 AI Agent 与专业软件的集成门槛，
只需一条命令，就能让任意软件成为 Agent 的“原生工具”。

对于从事 AI Agent 开发、自动化工作流、AI 编程的开发者来说，这是一个值得立即尝试的强大项目。
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cli-anythind-2-1-market.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cli-anythind-2-2-clianything.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cli-anythind-2-3-reload.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cli-anythind-2-4-gimp-cli.png