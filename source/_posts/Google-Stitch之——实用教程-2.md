---
title: Google-Stitch之——实用教程(2)
categories:
  - AI
  - AI开发
  - AI编程助手
  - Google-Stitch
tags:
  - Google-Stitch
abbrlink: 656ec268
date: 2026-04-18 08:55:10
---
## 一 概述

```
本文介绍：
 - Google-Stitch 使用流程
```

<!--more-->

## 二 使用步骤

### 2.1 访问并登录

```
打开浏览器，进入 https://stitch.withgoogle.com/。
点击 “Try Now” 或类似按钮，用你的 Google 账号 登录(推荐使用常用账号，便于后续导出集成)。
```

### 2.2 创建新项目

```
登录后会进入主界面（无限画布 + 左侧/底部聊天输入框）。
点击 New Project 创建空白画布。
顶部可切换 模式（Standard 快速模式 vs Experimental 高保真模式）和 平台（Mobile / Web）。
```

### 2.3 输入提示生成设计(核心操作)

1-在底部聊天输入框输入自然语言提示，例如

```
创建一个现代简约的移动端任务管理 App 主页，包含待办列表、添加按钮和深色主题”
或上传图片/草图作为参考：“基于这张手绘 wireframe 生成高保真登录页面”。

AI 会快速生成 UI 布局、组件和样式。
```

2-提示技巧

```
先高层次描述整体 App，再逐屏细化（screen by screen）。
使用具体指令迭代，例如 “把按钮改成渐变蓝色，增加微交互动画” 或 “调整为 iOS 风格”。
支持 Markdown、参考 URL、语音输入。
```

### 2.4 迭代与优化

```
在画布上直接选中元素，通过聊天继续对话修改。
使用无限画布添加新页面、组件或设计代理功能（AI 会跟踪进度并建议）。
预览交互原型，检查响应式效果。
```

### 2.5 导出与后续使用

```
查看代码：生成 HTML + Tailwind CSS 等前端代码，直接复制或下载。
导出到 Figma：一键粘贴设计到 Figma 继续精修。
导出到 Google AI Studio：将设计转化为可运行 App，添加数据库、认证等功能。
其他：导出 DESIGN.md（设计系统蓝图）、复制到其他 AI 编码工具。
```

## 三 使用技巧及注意事项

### 3.1 技巧

```
第一次使用建议从简单移动 App 开始练习，效果通常比复杂 Web 更好。
Prompt 越具体越好（可参考官方 Prompt Guide）。
生成后多用 follow-up prompts 微调，避免一次性要求太多。
隐私设置可在右上角 profile → Settings 中调整。
```

### 3.2 注意事项

```
使用Goole Stitch可能需要VPN
可能显示：Sorry,Stitch is Unavailable.
```

