---
title: Cursor代码神器之——创建IOS项目(8)
categories:
  - 开发
  - Q-AI
  - 开发助力    
  - Cursor
tags:
  - Cursor
abbrlink: a96c071
date: 2025-01-02 09:46:26
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：MacOS Sequoia 15.2
* 工具：Xcode+Cursor
* 开发语言：Swift(SwiftUI)

## 三 实现步骤

* 使用Xcode创建SwiftUI to-do项目
* 使用Cursor对此项目进行修改
* 明确要使用到的开发语言：Swift(SwiftUI)
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
帮我将swift默认项目改造成 to-do项目
```

## 五 生成项目

### 5.1 Xcode创建IOS项目

1-打开Xcode创建IOS项目

![][1]

2-创建完成后，项目如下图

![][2]

### 5.2 Cursor改造项目

1-Cursor打开创建的项目

![][3]

2-输入关键词，创建改造项目(点击Accept接收代码)

```
这是使用Xcode创建的默认项目，开发语言swift，interface:swiftui，请帮我将这个项目改造成 to-do完整项目
```

图示

![][5]

### 5.3 错误解决

可能出现问题

```
1-版本及语言冲突(OC或swift)
2-文件缺失
3-其他
```


## 六 运行并查看项目

1-如下图运行项目到设备中

![][6]

2-效果图

![][7]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-create-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-struct-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-cursor-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-cursor-promit-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-cursor-code-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-run-set-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-8-ios-run-view-7.png
