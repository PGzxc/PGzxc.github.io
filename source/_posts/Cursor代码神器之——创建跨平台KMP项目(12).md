---
title: Cursor代码神器之——创建跨平台KMP项目(12)
categories:
  - 开发
  - Q-AI
  - 开发助力    
  - Cursor
tags:
  - Cursor
abbrlink: 933cff86
date: 2025-01-08 08:57:48
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 12 专业版 23H2
* 工具：Android Studio(Intellij)+Cursor
* 插件：Kotlin Multiplatform
* 开发语言：Kotlin(ComposeUI)

## 三 实现步骤

* 使用Intellij创建Kotlin Multiplatform Mobile 模板项目
* 使用Cursor打开并改造成to-do项目
* 明确要使用到的开发语言：Kotlin(ComposeUI)
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
我已创建了一个Kotlin Multiplatform Mobile默认项目，帮我改造成to-do项目
```

## 五 生成项目

### 5.1 Intellij创建Kotlin Multiplatform Mobile项目

1-打开Intellij ,依次点击：File—>New—>Project，选择左侧的Kotlin Multiplatform(插件已安装)

![][1]

2-创建完成后，项目目录结构如下

![][2]

### 5.2 使用Cursor改造成to-do项目

1-使用Cursor打开KMP默认项目

![][3]

2-输入关键词，创建改造Kotlin Multiplatform Mobile项目(点击Accept接收代码)

```
我已创建一个Kotlin Multiplatform Mobile跨平台默认项目，帮我改造成 to-do项目
```

图示

![][4]

3-新增的文件如图所示

![][5]


### 5.2 问题解决

可能出现问题

```
1-项目未初始化，不完整
2-文件缺失
3-其他
```

1-错误现象(逻辑不完整)


2-使用Cursor解决问题

```
@App.kt @AndroidTodoRepository.kt @MainActivity.kt 根据逻辑重新将这部分代码补充完整
```

图示

![][6]


## 六 运行并查看项目

![][7]







[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-create-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-pro-struject-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-cursor-open-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-cursor-promit-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-cursor-files-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-cursor-fill-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-12-kmp-run-view-7.png


