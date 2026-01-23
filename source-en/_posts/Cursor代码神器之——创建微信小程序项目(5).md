---
title: Cursor代码神器之——创建微信小程序项目(5)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: 3771b71f
date: 2024-12-30 09:28:39
---
## 一 概述

* 明确项目内容
* 提取关键词
* 生成项目
* 运行并查看项目

<!--more-->

## 二 运行环境及软件

* 系统：Windows 11 专业版 23H2
* 工具：VsCode+Cursor+微信小程序开发工具

## 三 明确项目内容

* 使用Cursor创建商城小程序
* 明确要使用到的技术：微信原生小程序
* Cursor创建的项目可能来自于Github或爬虫等，不一定能精确实现，本文仅演示一般实现过程

## 四 提取关键词

```
使用微信原生小程序，帮我生成一个商城项目
```

## 五 生成项目

1-依次点击：File—>Open Folder选择项目文件夹(wechat)

![][1]

2-Ctri+I(win下)打开Composer窗口

![][2]

3-在Composer中输入关键词

```
使用微信原生小程序，帮我生成一个商城项目
```

图示

![][3]

4-点击图示按钮，生成后的目录结构如下图(点击Accept接收代码  )

![][4]

## 六 运行并查看项目

1-打开微信小程序，导入Cursor生成的项目

![][5]

2-打开后，项目预览可能出现错误

![][6]

说明：

* 查看代码及预览效果，得出，Cursor给出的项目只包含基础功能并不完善
* 项目代码可能是来自Github或爬虫
* 开发者可对此代码进行修改和完善

3-使用Cursor提示，将项目补充完整

```
上述项目不完整，帮我把代码补充完整
```

图示

![][7]

4-有错误，使用Cursor继续处理错误

```
帮我创建static/images/tabbar文件夹，并下载确实图片
```

图示

![][8]

5-错误处理完成后，项目预览界面如下

![][9]

6-界面显示问题是app.js/baseUrl地址为空

![][10]








[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-folder-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-composer-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-promit-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-cureate-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-import-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-error-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-promit-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-goon-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-no-error-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-5-wechat-replace-url-10.png