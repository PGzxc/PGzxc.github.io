---
title: Cursor代码神器之——创建Web项目(3)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: ef49190d
date: 2024-12-26 10:37:59
---
## 一 概述

* 明确项目内容(小米商城)
* 提取关键词
* 生成项目
* 运行并查看项目
* 部署项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：VsCode+Cursor
* 插件：Live Server(预览插件)
* 部署工具：IIS或Tomcat

## 三 明确项目内容(小米商城)

* 使用Cursor创建小米商城Web项目
* 明确要使用到的技术：html、css、js等前端技术
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
使用html、css、js等前端技术，帮我生成一个仿小米商城项目
```

## 五 生成项目

1-依次点击：File—>Open Folder选择项目文件夹

![][1]

2-Ctri+I(win下)打开Composer窗口

![][2]

3-在Composer中输入关键词

```
使用html、css、js等前端技术，帮我生成一个仿小米商城项目
```

图示

![][3]

4-点击图示按钮，接受Cursor生成代码(左侧显示代码目录结构)

![][4]

## 六 运行并查看项目

1-在项目目录窗口，在index.html上右键，选择`Open with Live Server`或打开目录用浏览器打开

![][5]

2-打开后，项目预览如下

![][6]

说明：

* 查看代码及预览效果，得出，Cursor给出的项目只包含基础功能并不完善
* 项目代码可能是来自Github或爬虫
* 开发者可对此代码进行修改和完善

## 七  部署项目

* Internet Information Server(简称IIS)
* Tomcat




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-3-web-folder-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-3-web-composer-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-3-web-make-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-3-web-accept-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-3-web-liveserver-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-3-web-view-6.png