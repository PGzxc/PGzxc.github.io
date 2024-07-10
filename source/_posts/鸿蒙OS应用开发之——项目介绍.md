---
title: 鸿蒙OS应用开发之——项目介绍
categories:
  - 开发
  - D-移动开发
  - HarmonyOS
tags:
  - HarmonyOS
abbrlink: 7a7fc615
date: 2020-12-21 16:20:42
---
## 一 概述

* 项目工程结构
* java项目目录结构
* JS项目目录结构

<!--more-->

## 二 项目工程结构

### 2.1 逻辑结构

HarmonyOS应用发布形态为**APP Pack**(Application Package，简称APP)，它是由一个或多个**HAP**(HarmonyOS Ability Package)包以及描述APP Pack属性的pack.info文件组成

![][1]

### 2.2 工程目录构成

一个HAP在工程目录中对应于一个Module，它是由代码、资源、第三方库及应用清单文件组成，可以分为Entry和Feature两种类型

* Entry：应用的主模块。一个APP中，对于同一设备类型必须有且只有一个entry类型的HAP，可独立安装运行
* Feature：应用的动态特性模块。一个APP可以包含一个或多个feature类型的HAP，也可以不包含

### 2.3 部署包

* HAP是Ability的部署包，HarmonyOS应用代码围绕Ability组件展开，它是由一个或多个Ability组成。
* Ability分为两种类型：FA(Feature Ability，中文名称：元程序)和PA(Particle Ability，中文名称：元服务)
* FA/PA是应用程序的基本组成单元，能够实现特定的业务功能。FA有UI界面，而PA无UI界面

## 三 java项目目录结构

### 3.1 java项目目录结构

![][2]

### 3.2 项目说明

* **.gradle**：Gradle配置文件，由系统自动生成，一般情况下不需要进行修改

* **entry**：默认启动模块（主模块），开发者用于编写源码文件以及开发资源文件的目录

  - **entry>libs**：用于存放entry模块的依赖文件

  - **entry>src>main>Java**：用于存放Java源码

  - **entry>src>main>resources**：用于存放应用所用到的资源文件，如图形、多媒体、字符串、布局文件等

    | **资源目录** |                       **资源文件说明**                       |
    | :----------: | :----------------------------------------------------------: |
    | base>element | 包括字符串、整型数、颜色、样式等资源的json文件。每个资源均由json格式进行定义，例如：<br> boolean.json：布尔型<br>color.json：颜色<br>float.json：浮点型<br>integer.json：整形<br>pattern.json：样式<br>plural.json：复数形式<br>strarray.json：字符串数组<br>string.json：字符串值<br> |
    | base>graphic | xml类型的可绘制资源，如SVG（Scalable Vector Graphics）可缩放矢量图形文件、基本的几何图形（如矩形、圆形、线等）shape资源等 |
    | base>layout  |                   xml格式的界面布局文件。                    |
    |  base>media  | 多媒体文件，如图形、视频、音频等文件，支持的文件格式包括：**.png**、**.gif**、**.mp3**、**.mp4**等。 |
    | base>profile | 用于存储任意格式的原始资源文件。区别在于rawfile不会根据设备的状态去匹配不同的资源，需要指定文件路径和文件名进行引用 |
    |   rawfile    | 用于存储任意格式的原始资源文件。区别在于rawfile不会根据设备的状态去匹配不同的资源，需要指定文件路径和文件名进行引用 |

  - **entry>src>main>config.json：**HAP清单文件

  - **entry>src>test**：编写代码单元测试代码的目录，运行在本地Java虚拟机（JVM）上

  - **entry>.gitignore**：标识git版本管理需要忽略的文件

  - **entry>build.gradle**：entry模块的编译配置文件

## 四 JS项目目录结构

### 4.1 JS项目目录结构
![][3]
### 4.2 项目说明

* **common目录**：可选，用于存放公共资源文件，如媒体资源、自定义组件和JS文档等
* **i18n目录：**可选，用于存放多语言的json文件，可以在该目录下定义应用在不同语言系统下显示的内容，如应用文本词条、图片路径等
* **pages目录：**pages文件夹下可以包含1个或多个页面，每个页面都需要创建一个文件夹（如图中的index）。页面文件夹下主要包含3种文件类型：css、js和hml文件
  - **pages>index>index.hml文件：**hml文件定义了页面的布局结构，使用到的组件，以及这些组件的层级关系
  - **pages>index>index.css文件：**css文件定义了页面的样式与布局，包含样式选择器和各种样式属性等
  - **pages>index>index.js文件：**js文件描述了页面的行为逻辑，此文件里定义了页面里所用到的所有的逻辑关系，比如数据、事件等
* **resources：**可选，用于存放资源配置文件，比如：全局样式、多分辨率加载等配置文件
* **app.js文件：**全局的JavaScript逻辑文件和应用的生命周期管理




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-hap-construct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-project-struct-java-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/hmos-project-struct-js-view.png