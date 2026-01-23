---
title: Angular开发之——Angular打包部署项目(04)
categories:
  - 开发
  - C-前端开发
  - Angular
tags:
  - Angular
abbrlink: 6882a16
date: 2023-05-13 18:31:26
---
## 一 概述

* `ng build` 构建应用
* lite-server介绍及安装
* lite-server部署应用
* IIS管理器部署应用

<!--more-->

## 二 `ng build` 构建应用

### 2.1 执行如下指令构建应用

```
ng build
```

![][1]

### 2.2 构建完成后，会创建一个 `dist` 文件夹

![][2]

### 2.3 直接打开index.html会出错(需要借助于服务器部署)

![][3]

## 三 lite-server介绍及安装

### 3.1 项目地址

https://github.com/johnpapa/lite-server

### 3.2 lite-server介绍

轻量级的Node服务器

### 3.3 lite-server安装

```
npm install --global lite-server
```

## 四 lite-server部署应用

### 4.1 在终端执行如下指令部署应用

```
lite-server --baseDir="dist/project-name"
```

![][4]

### 4.2 执行完成后自动启动项目预览

![][5]

## 五 IIS管理器部署应用

### 5.1 安装启用IIS
![][6]

### 5.2 IIS添加dist项目应用
![][7]

### 5.3 直接输入网址或点击链接启动项目

![][8]

## 六 参考

* [Angular-部署应用](https://angular.cn/start/start-deployment)
* [Angular-最简单的部署选项](https://angular.cn/guide/deployment)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-project-ng-build.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-project-ng-build-dist.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-project-dist-open-direct.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-lite-server-start.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-project-start-view.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-iis-install.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-iis-add-dist-app.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-angular/angular-04-iis-dist-start.png