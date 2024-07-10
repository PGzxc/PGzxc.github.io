---
title: P5.js开发之——开发环境(2)
categories:
  - 开发
  - C-前端开发
  - P5.js
tags:
  - P5.js
abbrlink: b001fa95
date: 2021-10-13 10:10:27
---
## 一  概述

本文介绍P5.js的两种开发环境：

* P5.jsweb编辑器：官方提供了页面编辑及运行预览环境
* 本地开发环境(VScode)：基于插件创建项目并进行开发

<!--more-->

## 二 P5.jsweb编辑器

### 2.1 web编辑器地址

https://editor.p5js.org/

### 2.2 编辑器预览图

![][1]

### 2.3 文件介绍

点击`sketch.js`左侧的折叠按钮，显示文件列表

![][2]

文件列表说明：

* index.html：项目入口文件，关联`sketch.js`
* sketch.js：图像绘制文件，有两个必要方法，setup设置绘制图形区域，draw绘制图形
* style.css：样式文件

### 2.4 项目运行及停止

#### 代码修改(sketch.js)

```
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255,0,0);//0-255(红绿蓝)
}
```

#### 启动运行

运行按钮高亮，预览区显示图形

![][3]

#### 停止运行

停止按钮高亮，预览区没有图形
![][4]

## 三 本地开发环境(VScode)

### 3.1 插件安装
#### 打开VSCode应用插件
![][5]
#### 插件及说明

| 编号 |      插件名称      |                          说明                          |
| :--: | :----------------: | :----------------------------------------------------: |
|  1   |    Live Server     | 启动具有静态和动态页面实时重新加载功能的开发本地服务器 |
|  2   |      live-p5       |                提供P5代码的实时预览面板                |
|  3   | P5 Project Creator |            一个创建默认P5.js项目的简单扩展             |
|  4   |     p5.vscode      |     vscode帮助您在VisualStudio代码中创建p5.js项目      |
|  5   |  p5js live editor  |   允许您使用p5js编写代码，而无需离开VisualStudio代码   |

### 3.2  创建P5.js项目

#### 用vscode打开一个空文件夹

```
D:\Code\P5Demo\demo1>
```

#### 使用快捷键(Ctrl+Shift+P)，在打开的输入框中输入p5，下拉列表中选择`Create P5 Project`
![][6]

#### 输入项目的名称
![][7]

#### 输入项目名称后，自动创建文件(index.html和sketch.js)
![][8]

### 3.3 编辑代码(sketch.js)

```
function setup() 
{
	createCanvas(400, 400);
}

function draw()
{
    background(255,0,0)
}
```

### 3.4 运行

#### 直接打开index.html

```
file:///D:/Code/P5Demo/demo1/index.html
```

#### 点击Vscode底部的`Go Live`

```
http://127.0.0.1:5500/
```

### 3.5 效果图
![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-web-editor-open-default.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-web-editor-project-files.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-web-editor-run.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-web-editor-stop.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-vscode-plugin-search.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-vscode-create-project-new-p5.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-vscode-create-project-projectname.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-vscode-create-project-create-files.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-p5js/p5js-vscode-golive-run.png