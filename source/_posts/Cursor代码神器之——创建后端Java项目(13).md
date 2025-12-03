---
title: Cursor代码神器之——创建后端Java项目(13)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: 756d19b2
date: 2025-01-09 09:02:01
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：Intellij+Cursor
* 服务器：tomcat
* 数据库：MySQL+Navicat
* 开发语言：Java

## 三 实现步骤

* 使用Cursor创建java 图书管理系统+生成数据库相关指令
* 使用Intellij打开并项目
* 明确要使用到的开发语言：Java
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我生成一个java 图书管理系统，并配置与之关联的数据库创建相关指令
```

## 五 生成项目

### 5.1 Cursor创建Java图书管理系统

1-Cursor打开Folder文件夹

![][1]

2-输入关键词，创建Java图书馆里系统项目(点击Accept接收代码)

```
帮我生成一个java 图书管理系统完整项目，并配置与之关联的数据库创建相关指令用于执行Mysql操作
```

图示

![][2]

### 5.2 Mysql数据库操作

#### 5.2.1 创建数据库

1-打开Navicat Premium图形化工具创建

![][3]

2-终端创建

![][4]

####  5.2.2 查看数据库信息

![][5]

### 5.3 使用Intellij打开此项目并修改

1-打开Intellij，打开Cursor创建的项目，项目结构预览

![][6]

2-修改数据库配置信息

![][7]


## 六 运行并查看项目

1-找到项目的入口文件(main)，运行项目

![][8]

2-相关操作演示

![][9]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-folder-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-cursor-promit-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-navicat-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-mysql-create-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-navicat-view-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-idea-struct-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-project-modify-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-project-run-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-13-java-project-do-9.png


