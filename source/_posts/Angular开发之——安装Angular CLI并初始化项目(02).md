---
title: Angular开发之——安装Angular CLI并初始化项目(02)
categories:
  - 开发
  - C-前端开发
  - Angular
tags:
  - Angular
abbrlink: 95067f24
date: 2023-05-13 11:49:42
---
## 一 概述

* Angular CLI介绍及开发环境准备
* 安装Angular CLI开发工具
* 使用Angular CLI初始化Angular项目
* 简单体验Angular

<!--more-->

## 二  Angular CLI介绍及开发环境准备

### 2.1 Angular CLI介绍

目前，无论你使用什么前端框架，都必须要使用到各种NodeJS工具，Angular也不例外。与其他框架不同，Angular从一开始就走的“全家桶”式的设计思路，因此@angular/cli这款工具里面集成了日常开发需要使用的所有Node模块，使用@angular/cli可以大幅度降低搭建开发环境的难度。

Angular CLI类似于Vue CLI，是Angular官方开发的一个脚手架工具，专门用来开发构建Angular应用程序。

* Angular应用程序初始化
* 内置开发服务器
* 代码变更浏览器自动刷新
* 创建组件、指令、服务等继承工具
* 测试和维护等

### 2.2 安装依赖环境

#### 安装Node.js

* 下载地址：https://nodejs.org/en/download/
* 安装
* 确认Node.js环境(node -v)

#### 安装npm

* npm会随着Node的安装被一起安装
* 确认npm环境(npm -v)

#### 安装cnpm

```
npm i -g cnpm --registry=https://registry.npm.taobao.org
```

## 三 安装Angular CLI开发工具

### 3.1 安装@angular/cli

```
cnpm i -g @angular/cli
```

### 3.2 查看安装是否成功

```
ng version
```

![][1]

## 四 使用Angular CLI初始化Angular项目

### 4.1 运行 CLI 命令 `ng new` 并提供 `my-app` 名称作为参数

```
ng new my-app
```

### 4.2 按`Ctrl+C`暂停，进入`my-app`，执行如下指令安装依赖

```
cnpm install
```

![][2]

### 4.3 启动程序

```
npm start
ng serve --open
```

说明：

* --open`（或者只用 `-o` 缩写）选项会自动打开你的浏览器，并访问 `http://localhost:4200/
* 该命令默认会开启一个服务占用4200端口，如果想要修改可以通过--port参数来指定，例如：ng serve --port 3000

![][3]

## 五 参考

* [关于Angular CLI](https://angular.cn/guide/setup-local)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-02-ng-version.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-02-ng-myapp.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-02-ng-serve-view.png
