---
title: Claude-Code-Workflow之——快速上手(2)
categories:
  - AI
  - AI开发
  - AI编程助手
  - CCW
tags:
  - CCW
abbrlink: bed856b2
date: 2026-04-16 11:00:16
---
## 一 概述

```
本文介绍：
 - 快速安装及配置
 - 基本使用
 - 使用示例
```

<!--more-->

## 二 快速安装及配置

#### 2.1 配置 Codex(如果使用CodeX, 必须步骤，影响 skills 运行)

```
1.位置文件(根据电脑系统)

~/.codex/config.toml

2.编辑内容，确保启用以下功能
[features]
default_mode_request_user_input = true
multi_agent = true
multi_agent_v2 = true
enable_fanout = true
```

图示

![][1]

### 2.2 全局安装 CCW

1-安装CCW

```
npm install -g claude-code-workflow
```

图示

![][2]

2-ccw安装


```
ccw install -m Global
```

图示

| 1-开始安装 | 2-配置cli | 3-完成后指导 |
| :--------: | :-------: | :----------: |
|   ![][3]   |  ![][4]   |    ![][5]    |

### 2.3 准备依赖 CLI 工具(任选其一或组合)

```
Gemini CLI：https://github.com/google-gemini/gemini-cli
Codex / Claude Code：Anthropic 或 OpenAI 相关 CLI
Qwen、OpenCode 等类似工具
可选：ACE Tool（语义代码搜索）或正在开发的 CodexLens（本地 FTS + 语义搜索）


安装完成后，进入你的项目目录即可开始使用。
```

## 三 基本使用方式

CCW 支持两种主要触发方式：

### 3.1 Skill 工作流直接触发(推荐新手，无需斜杠)

```
1.轻量级规划：workflow-lite-plan "添加 JWT 认证"
2.完整规划 + 会话：workflow-plan "实现支付网关集成"
3.测试驱动：workflow-tdd-plan "xxx"
4.头脑风暴：brainstorm "设计实时协作系统"
5.测试修复循环：workflow-test-fix "xxx"
6.多 CLI 协同示例（自然语言触发）：
 -"使用 Gemini 分析 auth 模块"
 -"让 Codex 审查这段代码"
 -"问问 Qwen 性能优化建议"
```

### 3.2 斜杠命令(更精确控制)

```
1.会话管理：
/workflow:session:start —— 启动新会话
/workflow:session:resume —— 恢复会话
/workflow:session:list —— 列出会话
/workflow:session:sync —— 同步
/workflow:session:complete —— 完成会话

2.Issue 全流程：
/issue/new —— 创建 Issue
/issue/plan —— 规划方案
/issue/queue —— 形成执行队列
/issue/execute —— 执行队列

3.通用编排：
/ccw "添加用户认证" —— 自动工作流
/ccw-coordinator "实现 OAuth2 系统" —— 手动链编排
```

## 四 使用示例

### 4.1 启用CLI(比如Claude)

```
claude --model qwen3:8b
```

图示

![][6]

### 4.2 Skill 工作流直接触发

```
brainstorm "到店点餐系统设计"
```

图示

| 1-brainstorm头脑风暴 | 2-是否启用搜索 | 3-开始设计(根据模型和搜索) |
| :------------------: | :------------: | -------------------------- |
|        ![][7]        |     ![][8]     | ![][9]                     |

### 4.3 斜杠命令

![][10]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-1-config-feature.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-2-install-ccw.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-3-install-m.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-4-config-tools.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-5-config-fea.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-6-claude-open.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-7-brain-1.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-8-brain-2.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-9-brain-3.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/ccw-2-10-workflow-1.png