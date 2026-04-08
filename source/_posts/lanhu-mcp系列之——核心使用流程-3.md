---
title: lanhu-mcp系列之——核心使用流程(3)
categories:
  - AI
  - AI开发
  - AI Agent
  - lanhu-mcp
tags:
  - lanhu-mcp
abbrlink: 1bbea507
date: 2026-04-08 10:38:10
---
## 一 概述

```
本文介绍：
 - 需求分析
 - 设计稿解析
 - 团队协作
```

<!--more-->

## 二 核心使用流程

### 2.1 需求分析(最常用)

```
一、直接对 AI 说：

帮我分析这个蓝湖需求：
https://lanhuapp.com/xxx

二、AI 自动执行：
-全局扫描
-分组分析
-反向验证
-输出文档

三、输出结果：

- 需求文档
- 流程图
- 测试用例
```

### 2.2 设计稿解析

```
1.解析设计稿：
帮我解析这个设计稿：
https://lanhuapp.com/xxx

2.输出：
- UI 参数（尺寸/颜色）
- HTML + CSS 代码
```

### 2.3 团队协作(留言板)

```
lanhu_say(
  url='项目URL',
  summary='代码review',
  content='登录逻辑需要优化',
  mentions=['小王']
)

自动同步到团队（如飞书） 
```

