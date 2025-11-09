---
title: Cursor代码神器之——创建桌面端跨平台Electron项目(15)
categories:
  - 开发
  - Q-AI
  - 开发助力    
  - Cursor
tags:
  - Cursor
abbrlink: 8bab8ef
date: 2025-01-22 01:46:00
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：Electron Fiddle+Cursor
* 开发环境：Node
* 开发语言：前端(html+css+js)

## 三 实现步骤

* 使用Cursor根据关键词创建todo
* 明确要使用到的开发语言：前端(html+css+js)
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我创建一个Electron to-do完整项目
```

## 五 生成项目

### 5.1 Cursor创建todo项目

1-打开Cursor，输入关键词，创建Electron项目(点击Accept接收代码)

```
帮我创建一个Electron to-do完整项目
```

图示

![][1]

### 5.2 问题解决

1-错误现象

```
1-异常信息：Invalid tag name "^latest" of package "electron@^latest": Tags may not have any characters that encodeURIComponent encodes.
2-异常信息：npm WARN deprecated boolean@3.2.0: Package no longer supported. Contact Support at https://www.npmjs.com/support
```

图示

| 错误1  | 错误2  |
| :----: | :----: |
| ![][2] | ![][3] |

2-错误解决后的项目结构如下

![][4]

### 5.3 安装依赖

```
npm install
```

## 六 运行并查看项目

### 6.1 执行终端指令

```
npm start
```

### 6.2 效果图

![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-15-electron-cursor-create-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-15-electron-error-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-15-electron-error-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-15-electron-struct-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-15-electron-run-5.png

