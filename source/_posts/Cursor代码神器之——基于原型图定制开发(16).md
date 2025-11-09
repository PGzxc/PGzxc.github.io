---
title: Cursor代码神器之——基于原型图定制开发(16)
categories:
  - 开发
  - Q-AI
  - 开发助力    
  - Cursor
tags:
  - Cursor
abbrlink: 96da9c15
date: 2025-03-19 11:04:22
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：Cursor
* 开发环境：node(v22.14.0)
* 开发语言：前端开发语言

## 三 实现步骤

* 将项目原型图拖入Cursor提示词区域
* 书写关键词，让Cursor根据原型图生成项目
* 运行并查看项目

## 四 提取关键词

```
这是Web端的原型图，请根据原型图，帮我制作前端项目，要求页面按照图示制作
```

## 五 生成项目

### 5.1 原型图

![][1]

### 5.2 Cursor打开原型图所在文件夹，并将原型图拖入提示词区域

![][2]

### 5.3 输入关键词定制开发

1-输入提示词

```
这是Web端的原型图，请根据原型图，帮我制作前端项目，要求页面按照图示制作
```

图示

![][3]

2-Cursor根据提示词定制开发(指出界面内容及使用到的技术)

![][4]

3-给出了项目实现的内容

![][5]

4-列出了启动项目以来安装及启动指令

![][6]

5-给出了项目缺少的图片资源及未来要做的内容

![][7]

6-点击accept接受项目代码

![][8]

## 六 项目修正

### 6.1 项目目录结构

![][9]

### 6.2 项目缺少初始化配置文件

1-Cursor指令

```
项目缺少初始化配置文件，根据项目生成并添加依赖文件
```

图示

![][10]

2-Cursor帮我们生成了项目配置文件package.json和tsconfig.json

![][11]

3-为已有的组件添加依赖导入

![][12]

4-添加gitignore忽略文件和ReadMe说明文档

![][13]

5-项目启动指令及Images缺失文件名

![][14]

### 6.3 安装依赖

打开终端，执行nmp install

![][15]

## 六 运行并查看项目

### 6.1 执行如下指令，启动项目

```
npm start
```

图示

![][16]

### 6.2 缺少Index文件处理

1-启动问题

![][17]

2-生成Index.html文件，并启动项目

```
启动需要index.html文件，帮我生成
```

图示

![][18]

### 6.3 启动效果图(可以按照缺少文件补充图片)

![][19]

说明：

* 缺失的图片，按照需求自己补充
* 项目的结构大致按照原型图制作，可能需要微调
* 缺失的多个显示，我们可以遍历后制作




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-source-map-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-add-file-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-promit-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-analysis-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-doneview-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-runconfig-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-lack-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-accept-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-project-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-cmd-package-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-package-make-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-view-import-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-file-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-images-lack-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-nmp-install-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-nmp-start-16.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-index-lack-17.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-start-finish-18.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-16-start-view-19.png

