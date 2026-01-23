---
title: Vue2.0开发之——webpack基础-了解webpack(01)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 873db7ef
date: 2022-10-24 10:17:44
---
## 一 概述

* 什么是webpack
* webpack安装
* webpack配置

<!--more-->

## 二 什么是webpack

### 2.1 概念

webpack是前端项目工程化的具体解决方案

### 2.2 主要功能

它提供了友好的**前端模块化**支持，以及**代码压缩混淆**、**处理浏览器端JavaScript的兼容性**、**性能优化**等强大的功能。

### 2.3 好处

让程序员把工作的重心放到具体功能的实现上，提高了前端开发效率和项目的可维护性。

注意：目前Vue，React等前端项目，基本上都是基于webpack进行工程化开发的。

## 三 webpack安装

### 3.1 安装环境

* 系统：Windows 11
* Node版本：v18.8.0

### 3.2 本地项目安装

#### 执行如下命令，初始化包管理配置文件package.json

```
npm init -y
```

执行完毕后，生成package.json文件

#### 本地项目安装webpack

```
//安装webpack
npm install webpack  --save-dev(-d) 
npm install webpack@<version> --save-dev(-d) 
//安装cli
npm install webpack-cli --save-dev(-d) 
```

注：

```
-S 是 --save的简写
-D 是 --save-dev的简写
```

安装完成后，package.json新增文件

```
  "devDependencies": {
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  }
```

### 3.3 全局安装配置

```
npm install --global webpack
```

注：不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

## 四 webpack配置

### 4.1 在项目根目录中，创建名为`webpack.config.js`的webpackage配置文件

并初始化如下的基本配置：

```
module.exports ={
    mode:'development' //mode 用来指定构建模式。可选值有 development 和 production
}
```

### 4.2 在package.json的scripts节点下，新增dev脚本如下

```
  "scripts": {
    "dev": "webpack" //script节点下的脚本，可以通过npm run执行，例如 npm run dev
  },
```

### 4.3 在终端中运行如下指令，启动webpack进行项目的打包构建

```
npm run dev
```

