---
title: Vue2.0开发之——webpack基础-webpack-dev-server插件(03)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: c25da7d0
date: 2022-10-25 09:48:20
---
## 一 概述

* webpack-dev-server介绍
* webpack-dev-server插件安装与配置
* webpack-dev-server原理介绍

<!--more-->

## 二 webpack-dev-server介绍

### 2.1 为什么需要webpack-dev-server

通过安装和配置第三方的插件，可以拓展webpack的能力，从而让webpack用起来更方便。本文介绍webpack的插件webpack-dev-server

### 2.2 webpack-dev-server

* 类似于node.js阶段用到的nodemon工具
* 每当修改了源码，webpack会自动进行项目的打包和构建

## 三 webpack-dev-server插件安装与配置

### 3.1 webpack-dev-server安装

通过如下的命令，即可在项目中安装此插件

```
npm install webpack-dev-server --save-dev(-D)
```

![][1]

### 3.2 webpack.config.js配置

```
const path = require('path') //导入node.js中专门操作路径的模块

module.exports = {
    entry: path.join(__dirname, './src/index.js'), //打包入口文件的路径
    output: {
        path: path.join(__dirname, './dist'), //输出文件的存放路径
        filename: 'bundle.js',//输出文件的名称
    },
    mode: 'development', //mode 用来指定构建模式。可选值有 development 和 production
    devServer:{
        open:true,
        host:'localhost',
        port:8080,
        static: {
            directory: path.join(__dirname, './')
        },
    }
}
```

### 3.3 webpack-dev-server配置

1- 修改package.json—>scripts中的dev命令如下

```
 "scripts": {
    "dev": "webpack server",//scripts节点下的脚本，可以通过npm run执行
  },
```

2-执行`npm run dev`命令，重新进行项目的打包

![][2]

说明：修改index1.js中的代码，会自动执行打包指令

3-在浏览器中访问http://localhost:8080地址，查看自动打包效果

![][3]

说明：webpack-dev-server会启动一个实时打包的http服务器

4-点击`src`会显示项目效果
![][4]

## 四 webpack-dev-server原理介绍

### 4.1 原理介绍
![][5]

webpack-dev-server生成的bundle.js在根目录下有一份(无实际文件)，放到内存中，没有放到物理磁盘中。

### 4.2 查看内存中存放的bundle.js文件

```
http://localhost:8080/bundle.js
```

![][6]


[00]:https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-03-webpack-dev-server-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-03-webpack-dev-server-run-dev.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-03-webpack-dev-server-run-preview.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-03-webpack-dev-server-run-preview-src.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-03-webpack-dev-server-root-bundle.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-03-webpack-dev-server-root-bundle-view.png