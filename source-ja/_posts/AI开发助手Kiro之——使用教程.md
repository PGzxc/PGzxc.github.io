---
title: AI开发助手Kiro之——使用教程
categories:
  - 开发
  - R-AI开发助手
  - Kiro
tags:
  - Kiro
abbrlink: d746752c
date: 2026-01-29 09:04:40
---
## 一 概述

```
Kiro(https://kiro.dev/)是由 AWS 推出的 Agentic AI 开发工具，介绍以下几个方面：
-1.介绍
-2.下载地址
-3.使用教程
-4.收付费及注意事项
-5.使用对比
```

<!--more-->

## 二 介绍

### 2.1 概念

```
Kiro(https://kiro.dev/)是由 AWS 推出的 Agentic AI 开发工具(代理式AI IDE + CLI)，
核心理念是 Spec-driven development(规范驱动开发)。

它把目前流行的“随性/直觉式提示”(vibe coding)升级为更结构化、可复现、可审查的生产级流程，
目标是从原型 → 可上线代码大幅缩短路径，同时大幅降低返工率。
```

### 2.2 四大优势

```
-把自然语言 → EARS 格式结构化需求(Excellent/Adequate/Reasonable/Sufficient)
-自动生成架构设计 + Mermaid 图 + 任务拆解列表（带依赖、优先级、验收点）
-支持Autopilot 自动驾驶模式 + Hooks 自动化工作流
-内置 Steering 文件（全局/项目规则） + MCP(连接外部文档、数据库、API)
```

### 2.3 一句话总结

```
如果你觉得 Cursor/Claude Projects 写大项目容易失控、上下文漂移、改动难以审查 
Kiro 就是目前最强“结构派”解决方案。
```

## 三 下载地址 & 安装

### 3.1 官网地址

```
官方地址：https://kiro.dev/
下载页面：https://kiro.dev/downloads
```

### 3.2 工具比较

|         平台          |         安装方式         |                推荐方式                 |        备注        |
| :-------------------: | :----------------------: | :-------------------------------------: | :----------------: |
|         macOS         |  一行命令 或 .dmg 双击   | curl -fsSL https://cli.kiro.dev/install |        bash        |
|         Linux         |     同上(curl 脚本)      |                  同上                   |  支持大多数发行版  |
|        Windows        |       .exe 安装包        |              官网下载页面               |  2025年底正式 GA   |
| VS Code / Cursor 插件 | Open VSX 市场搜索 “Kiro” |              插件方式次选               | 可无缝迁移现有项目 |

### 3.3 首次启动

```
kiro --version          # 确认安装成功
kiro                    # 启动交互式聊天界面（推荐）
# 或者在已有项目里：
cd my-project
kiro

说明：第一次会要求 GitHub / Google / AWS 账号登录，并赠送初始免费额度。
```

## 四 使用教程

### 4.1 五分钟 Hello World 项目

1、新建空文件夹并初始化 git

```
mkdir todo-kiro && cd todo-kiro
git init
```

2、启动 Kiro

```
kiro
```

3、在聊天框直接粘贴下面这个中文/英文都可的完整提示(复制即可)：

```
用 Next.js 15 App Router + TypeScript + Tailwind CSS + shadcn/ui 做一个极简任务管理器，支持：
• 添加 / 删除 / 编辑任务
• 勾选完成（带划线效果）
• 暗黑模式切换（localStorage 持久化）
• 数据全部用 localStorage 保存

请严格按照以下步骤输出：
1. 先输出完整的 EARS 格式需求规格
2. 输出系统架构设计（包括文件夹结构 + 数据流，用 Mermaid 表示）
3. 把实现拆成 8-12 个具体任务（带优先级、依赖关系、验收标准）
4. 等待我确认任务列表后，再开始写代码


执行：Kiro 会自动完成 1→3 步，你确认任务列表后按 /autopilot 或逐个 Accept 让它写代码
```

### 4.2 常用指令速查表(背下来就够用80%场景)

|    指令    |               作用               |          使用场景           |
| :--------: | :------------------------------: | :-------------------------: |
|   /spec    |         进入最强规范模式         |   复杂功能、团队协作首选    |
| /autopilot | 自动驾驶模式(全自动执行后续任务) |      信任 Kiro 的时候       |
| kiro plan  |       只生成计划、不写代码       |      先看方案是否靠谱       |
|  kiro fix  |       分析当前报错自动修复       |       报错后最快解法        |
| /hook add  |          添加自动化钩子          | git commit 前自动写 message |
| /steering  |      查看/编辑项目全局规则       |   统一代码风格、技术选型    |

### 4.3 进阶推荐学习顺序

```
1、Your First Project（官网5-10分钟）
→ https://kiro.dev/docs/getting-started/first-project
2、Spirit of Kiro 游戏化教程（最有趣、最推荐）
→ https://kiro.dev/docs/guides/learn-by-playing
（边玩小游戏边学 Kiro，强烈建议花2-3小时做完）
3、Steering 文件写法（决定80%输出质量）
→ https://kiro.dev/docs/steering/
4、Hooks 自动化工作流 → https://kiro.dev/docs/hooks/
```

## 五 收费 & 注意事项

### 5.1 定价结构

| 套餐  |   价格    |    月度额度    |       适合人群       |                备注                 |
| :---: | :-------: | :------------: | :------------------: | :---------------------------------: |
| Free  |    $0     |   50 credits   |    尝鲜、轻度使用    |  永久免费，额度用完只能等下月刷新   |
|  Pro  | $20 / 月  | ≈1,000 credits |   大多数个人开发者   | 新用户前30天常有 500-1,500 额外试用 |
| Pro+  | $40 / 月  | ≈2,000 credits | 中大型项目、频繁使用 |            最性价比区间             |
| Power | $200 / 月 |     高额度     |  重度用户 / 小团队   |       基本够无限刷 Claude 4.5       |

### 5.2 Credits 消耗规则

```
-普通对话 / 小改动：1–5 credits
-生成完整 EARS + 架构 + 任务拆解：10–30 credits
-Autopilot 一次跑完中型功能（5-15个文件）：50–150 credits
-Claude Sonnet 4.5 最贵，Auto 模式最省
```

### 5.3 注意事项

```
额度实时可见(聊天界面右下角显示剩余 credits)
前30天升级 Pro/Pro+ 经常有额外试用额度(建议先用免费额度试水)
Startup 可申请1年 Pro+ 免费(AWS Startups 计划)
隐私：代码默认不上云，可开启本地优先模式(但模型推理仍需联网)
```

## 六 使用对比

### 6.1 对比

|        维度         |            Kiro            |          Cursor          |    Aider / Continue.dev     |     GitHub Copilot     |
| :-----------------: | :------------------------: | :----------------------: | :-------------------------: | :--------------------: |
|      核心打法       | Spec-driven(先规范后编码)  |  Vibe coding(边聊边改)   |     命令行 / diff 驱动      |   GitHub 原生工作流    |
|    大项目控制力     |            5星             |           3星            |             4星             |          4星           |
|    快速原型速度     |            3星             |           5星            |             4星             |          3星           |
| 代码可审查性/可追溯 |            5星             |           2星            |             4星             |          4星           |
|   团队协作友好度    |            5星             |           3星            |             3星             |          5星           |
|      学习曲线       | 中等(需理解 EARS/Steering) |           很低           |            中等             |           低           |
| 每月成本(中度使用)  |           $20–40           |           $20            |            $0–20            |         $10–19         |
|   2026年推荐场景    | 中大型项目、团队、追求质量 | 个人快速迭代、实验性项目 | 终端爱好者、已有 vim/neovim | 深度绑定 GitHub 的团队 |

### 6.2 一句话结论

```
想又快又爽 → 选 Cursor
想又稳又可维护、做中大型项目 → 选 Kiro(尤其是后端/全栈/有团队场景)
预算有限/只想命令行 → Aider 或 Continue.dev
```

