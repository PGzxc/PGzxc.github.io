---
title: Cursor代码神器之——创建Android项目(7)
categories:
  - 开发
  - Q-AI
  - 开发助力  
  - Cursor
tags:
  - Cursor
abbrlink: ee36837c
date: 2025-01-01 09:15:31
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：Android Studio+Cursor
* 开发环境：Java
* 开发语言：Kotlin(ComposeUI)

## 三 实现步骤

* 使用Cursor创建Android to-do项目
* 使用Android Studio打开并运行to-do项目
* 明确要使用到的开发语言：Kotlin(ComposeUI)
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我生成一个android to-do项目
```

## 五 生成项目

### 5.1 Cursor创建Android项目

1-Cursor打开Folder文件夹

![][1]

2-输入关键词，创建Android项目(点击Accept接收代码)

```
帮我生成一个能够使用android studio运行的 to-do完整项目，并将项目命名为to-do
```

图示

![][2]

### 5.2 使用Android Studio打开此项目

1-打开Android  Studio，打开Cursor创建的项目

![][3]

2-打开后，项目结构预览

![][4]

### 5.3 错误解决

可能出现问题

```
1-导包冲突
2-compileSDK未指定
3-gradle下载异常
4-文件缺失
5-其他
```

1-错误现象

![][5]

2-错误解决后的项目结构如下

![][6]

## 六 运行并查看项目

![][7]







[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-folder-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-cursor-create-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-struct-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-error-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-normal-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-7-android-view-7.png

