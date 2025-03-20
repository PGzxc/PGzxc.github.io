---
title: Trae AI工具之——基于原型图定制开发(2)
categories:
  - 开发
  - Q-AI
  - Trae
tags:
  - Trae
abbrlink: 36d0d5f8
date: 2025-03-20 09:13:23
---
## 一 概述

上篇文章介绍了使用Cursor进行基于原型图的定制化开发，本文使用Trae实现相同的效果

* 运行环境及软件
* 实现步骤
* 关键词提取
* 项目定制开发
* 运行及效果预览

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* AI工具：Trae
* 开发环境：node(v22.14.0)
* 开发语言：前端开发语言

## 三 实现步骤

* 将项目原型图导入Trae提示词区域
* 书写关键词，让Trae根据原型图生成项目
* 运行并查看项目

## 四 关键词提取

```
这是Web端的原型图，请根据原型图，帮我制作前端项目，要求页面按照图示制作
```

## 五 项目定制开发

### 5.1 原型图

![][1]

### 5.2 原型图放入Trae提示词区域(无法直接托文件进入提示词)

1-点击引用，弹出框选择`File`，继而选择原型图

![][2]

2-选择后的图示，如下

![][3]

### 5.3 基于原型图定制开发

1-输入提示词

```
这是Web端的原型图，请根据原型图，帮我制作前端项目，要求页面按照图示制作，并将文件放入trae-sample2文件夹中
```

图示

![][4]

2-我尝试了Trae提供的三种模型，(第一种无法识别，第2/3种无法实现)均无法到达效果

![][5]

### 5.4 Trae生成过程(无法生成，仅查看生成效果)

1-创建项目结构(点击运行)

![][6]

2-运行后执行相关操作，生成的目录结构如右图(trae-sample2)

![][7]

3-点击Header右侧的应用添加组件

![][8]

4-点击Slidebar右侧的应用添加组件

![][9]

5-点击App右侧的应用添加文件

![][10]

6-点击App.css右侧的应用添加样式文件

![][11]

## 六 运行及效果预览

### 6.1 安装依赖

```
nmp install
```

图示

![][12]

### 6.2 运行项目

```
npm start
```

### 6.3 问题处理

1-错误现象

![][13]

说明：

* 缺少组件：MainContent、Footer
* 缺少样式：Header.css、Sidebar.css

2-问题处理

![][14]

### 6.4 运行效果图

![][15]

说明：

* Trae基于原型定制开发出的页面完全不是我们想要的页面
* 可能当前模型无法满足定制化开发需求
* 用户使用其他模型，可能实现定制化开发需求
* 期待Trae的完善




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-source-map-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-import-select-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-import-view-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-promit-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-model-create-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-create-pro-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-create-run-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-component-head-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-component-slidbar-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-app-apply-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-appcss-apply-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-npm-install-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-run-error-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-deal-error-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/trae-2-run-view-15.png