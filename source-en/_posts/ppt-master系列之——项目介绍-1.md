---
title: ppt-master系列之——项目介绍(1)
categories:
  - AI
  - AI应用
  - AI办公
  - ppt-master
tags:
  - ppt-master
abbrlink: 6d6490e7
date: 2026-04-15 09:30:36
---
## 一 概述

```
本文介绍：
 - ppt-master 是什么？
 - 解决什么问题？
 - 核心能力
```

<!--more-->

## 二 ppt-master 是什么？

### 2.1 项目地址

```
https://github.com/hugohe3/ppt-master
https://github.com/hugohe3/ppt-master/blob/main/README_CN.md
```

### 2.2 是什么

```
ppt-master 是一个基于 AI 的 PPT 自动生成工具
用来把各种内容自动转换成可编辑的 PowerPoint 文件。
```

## 三 解决什么问题？

### 3.1 传统做 PPT 的痛点

```
手动排版耗时（1份PPT动辄2~4小时）
结构混乱（不会讲故事）
风格不统一（像拼凑）
```

### 3.2 ppt-master 的目标

```
自动生成结构（像咨询公司）
自动排版（统一设计）
自动输出 PPT（可编辑）
```

## 四 核心能力

### 4.1 多格式输入

```
支持：
 -Markdown
 -PDF / Word
 -网页内容
```

### 4.2 AI 自动拆解内容

```
把输入内容转成：

-目录结构
-每页主题
-关键要点

类似“AI帮你写PPT逻辑”
```

### 4.3 SVG 中间层(核心设计)

```
1.这是这个项目最关键的点：
不是直接生成 PPT，而是：内容 → SVG → PPT

2.为什么用 SVG？
可控布局（像设计稿）
易调试
可复用模板
更接近设计工具（Figma）
```

### 4.4 输出可编辑 PPT

```
最终生成：
.pptx（真正可编辑）
不是截图！可以改文字、改布局
```

## 五 架构及模块

### 5.1 整体架构

```
输入文档
   ↓
AI 内容理解
   ↓
结构拆分（分页）
   ↓
SVG 设计生成
   ↓
PPT 转换（DrawingML）
   ↓
导出 PPT
```

### 5.2 核心模块

```
1.文档解析
Markdown / PDF 转结构化文本

2.AI 生成器
分页逻辑
标题生成
内容精简

3.SVG 生成器（重点）
每页 = 一个 SVG
控制：布局/字体/图形

4.PPT 转换器
SVG → PPTX（DrawingML）
```

## 六 三种生成风格

项目内置三种 AI 风格：

|      模式      |    特点    |
| :------------: | :--------: |
|    General     |  普通风格  |
|   Consultant   |   咨询风   |
| Consultant_Top | 麦肯锡级别 |