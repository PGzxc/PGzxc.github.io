---
title: Cursor代码神器之——创建跨平台RN项目(11)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: bda521ce
date: 2025-01-07 09:13:31
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：Intellij+VSVode+Cursor
* 开发环境：react
* 开发工具：expo

## 三 实现步骤

* 使用Cursor创建React Native to-do项目
* 使用Intellij打开并运行to-do项目
* 明确要使用到的开发语言：react
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我生成一个react native to-do项目
```

## 五 生成项目

### 5.1 Cursor创建RN项目

1-Cursor打开Folder文件夹

![][1]

2-输入关键词，创建React Native项目(点击Accept接收代码)

```
基于expo帮我创建一个React Native to-do项目
```

图示

![][2]

### 5.2 问题解决

可能出现问题

```
1-文件缺失
2-版本冲突(rn+expo版本引起的异常)
3-其他
```

1-错误现象(仅生成逻辑代码，缺少配置及依赖文件)

![][2]

2-问题解决

```
项目没有初始化，帮我生成必要的文件
```

图示

![][3]

3-安装依赖

![][4]

### 5.3 使用Intellij打开此项目

1-打开Intellij，打开Cursor创建的项目

![][5]

## 六 运行并查看项目

1-打开终端，执行如下指令，运行

```
npx expo start
```

图示，出现二维码

![][6]

2-运行可能出现的异常

![][7]

问题解决：package.json中dependencies指定版本

```
 "expo": "~51.0.0",
```

3-运行效果图

![][8]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-folder-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-cursor-create-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-cursor-package-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-cursor-install-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-ij-open-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-scan-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-sdk-update-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-11-rn-run-view-8.png


