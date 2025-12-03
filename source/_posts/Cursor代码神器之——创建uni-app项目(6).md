---
title: Cursor代码神器之——创建uni-app项目(6)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: 59cb2184
date: 2024-12-31 09:50:11
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：VsCode+Cursor+HbuilderX+微信小程序开发工具

## 三 明确项目内容

* 使用HbuilderX创建一个空白项目
* 使用Cursor修改此空白项目为to-do项目
* 明确要使用到的技术：vue
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
将uni-app空白项目，帮我生成一个to-do项目
```

## 五 生成项目

### 5.1 使用HbuilderX创建一个空白uni-app项目

1-打开HubilderX，依次点击：文件—>新建—>项目

![][1]

2-选择路径和名称及模板

![][2]

3-创建完成后的项目目录结构如下

![][3]

### 5.2 Cursor改造默认项目

1-Cursor打开uni-app 默认项目

![][4]

2-输入关键词，改造uni-app项目

```
这是使用HbuilderX创建的默认项目，将其改造为to-do完整项目并实现代码逻辑
```

图示

![][5]

## 六 运行并查看项目

### 6.1 运行到浏览器并查看效果

1-依次点击：运行—>Chrome

![][6]

2-浏览器运行效果

![][7]

### 6.2 运行到微信小程序并查看效果

1-依次点击：运行—>运行到小程序模拟器—>微信开发者工具

![][8]

2-微信小程序运行效果(微信小程序打开服务端口)

![][9]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-hbuilder-new-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-hbuilder-name-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-hbuilder-struct-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-cursor-open-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-cursor-modify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-run-chrome-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-run-chrome-view-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-run-wechat-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-6-uniapp-run-wechat-view-9.png
