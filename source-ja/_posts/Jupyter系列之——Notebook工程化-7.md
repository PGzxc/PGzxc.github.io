---
title: Jupyter系列之——Notebook工程化(7)
categories:
  - AI
  - AI应用
  - AI办公
  - Jupyter
tags:
  - Jupyter
abbrlink: 69d02842
date: 2026-04-06 12:07:22
---
## 一 概述

```
本文介绍：
 - 问题
 - 解决方案
 - 最佳实践
```

<!--more-->

## 二 Notebook工程化

### 2.1 问题

```
- 不易版本管理
- 难复用
- 顺序依赖
```

### 2.2 解决方案

```
1. 转 Python 脚本
jupyter nbconvert --to script demo.ipynb

2. 模块化
- 抽离函数
- 封装库
```

### 2.3 最佳实践

```
- Notebook = 展示 +实验
- 业务逻辑 = Python 文件
```

