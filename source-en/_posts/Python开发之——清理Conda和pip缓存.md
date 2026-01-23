---
title: Python开发之——清理Conda和pip缓存
categories:
  - 开发
  - G-后端开发
  - Python
tags:
  - 清理缓存
abbrlink: '71173238'
date: 2024-08-03 16:43:13
---
## 一 概述

通过Conda和pip安装AI相关依赖时，会产生大量的缓存，本文介绍相关以来清理

<!--more-->

## 二 清理 Conda 缓存

### 2.1 查看 Conda 缓存的使用情况

```
conda clean --dry-run --all
```

### 2.2 删除不再使用的包和缓存

```
conda clean --all
```

## 三 清理pip缓存

### 3.1 Python缓存文件的默认位置

```
Windows 10：C:\Users\username\AppData\Local\pip\Cache
macOS：/Users/username/Library/Caches/pip
Linux：~/.cache/pip
```

### 3.2 查看缓存信息

```
pip cache info
```

### 3.3 查看 cache 列表和路径

```
pip cache list
pip cache dir
```

### 3.4 清除缓存

```
# 清除所有缓存，包括已下载但未安装的软件包和已安装但未被使用的缓存
pip cache purge
# 只清除特定软件包的缓存。package-name是要清除缓存的软件包的名称
pip cache remove package-name
```

