---
title: Cursor代码神器之——创建鸿蒙项目(9)
categories:
  - 开发
  - R-AI开发助手 
  - Cursor
tags:
  - Cursor
abbrlink: 404dd55e
date: 2025-01-03 10:34:03
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：DevEco Studio+Cursor
* 开发语言：ArkTS

## 三 实现步骤

* 使用DevEco创建鸿蒙 to-do项目
* 使用Cursor对此项目进行修改
* 明确要使用到的开发语言：ArkTS
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我将鸿蒙默认项目改造成 to-do项目
```

## 五 生成项目

### 5.1 DevEco创建鸿蒙项目

1-打开DevEco创建鸿蒙项目, 选择模板

![][1]

2-配置项目信息

![][2]

3-创建完成后，项目结构如下图

![][3]


### 5.2 Cursor改造项目

1-Cursor打开创建的项目

![][4]

2-输入关键词，创建改造项目(点击Accept接收代码)-Cursor生成的代码位于src下，替换我们entry/src

```
这是使用DevEco Studio创建的默认项目，请帮我将这个项目改造成 to-do项目
```

图示

![][5]


### 5.3 项目改造

将Cursor生成的代码片段，移动到entry/src/main/ets目录下

![][6]


## 六 运行并查看项目

点击右侧的Preview，可以看到效果图如下

![][7]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-idea-create-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-idea-info-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-project-struct-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-cursor-open-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-cursor-create-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-cursor-modify-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-9-hm-run-view-7.png
