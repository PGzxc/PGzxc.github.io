---
title: ECC-Tools系列之——快速入门篇(2)
categories:
  - AI
  - AI开发
  - AI Agent
  - ECC-Tools
tags:
  - ECC-Tools
abbrlink: 56d8e6c3
date: 2026-04-09 09:58:04
---
## 一 概述

```
本文介绍：
 - GitHub App(官方推荐)
 - 本地安装(开发者推荐)
```

<!--more-->

## 二 方式一：GitHub App(官方推荐)

### 2.1 步骤

```
一、安装 App
安装 ECC Tools GitHub App 到仓库

二、触发分析
在 Issue/PR 评论：/ecc-tools analyze

三、查看 PR
ECC 会生成：
- SKILL.md
- instincts.yaml（行为规则）

手动 Review 后再合并
```

### 2.2 你会得到什么

```
- 项目规范自动提取
- 可复用技能
- 团队统一 AI 行为

所有变更都通过 PR（可控） 
```

## 三 方式二：本地安装(开发者推荐)

### 3.1 安装

```
npm install -g ecc-universal
```

### 3.2 使用

```
/tdd
/plan
/security-review
```

### 3.3 可选：开启持续学习

```
/continuous-learning-v2

系统会自动学习你的操作模式 
```

