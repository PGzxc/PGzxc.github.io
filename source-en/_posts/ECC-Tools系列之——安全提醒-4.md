---
title: ECC-Tools系列之——安全提醒(4)
categories:
  - AI
  - AI开发
  - AI Agent
  - ECC-Tools
tags:
  - ECC-Tools
abbrlink: fbbbadda
date: 2026-04-09 09:59:59
---
## 一 概述

```
本文介绍：
 - 能做什么
 - 检测范围
```

<!--more-->

## 二 安全提醒

### 2.1 能做什么

```
npx ecc-agentshield scan ./CLAUDE.md

2.输出示例：
- CRITICAL：严重问题
- WARNING：风险
- PASS：通过项
```

### 2.2 检测范围

```
- Prompt 注入
- 权限越权
- API 滥用
- 配置错误

Red Team + Blue Team + Auditor 三层模型 
```

