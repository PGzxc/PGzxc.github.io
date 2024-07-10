---
title: 微信小程序开发之——组件化框架WePY-快速开始
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 50b2a324
date: 2021-10-27 16:53:23
---
## 一 概述

* WePY (发音: /'wepi/) 是小程序上最早的一款类 Vue 语法的开发框架
* WePY参考了Vue.js，对原生小程序的开发模式进行了再次封装，贴近MVVM架构
* WePY支持组件开发，单位件模式，还支持外部加载的npm包

<!--more-->

## 二 WePY的特征

* **开发风格**：接近于Vue.js，支持组件Props传值，自定义事件、组件分布式复用等
* **组件化**：组件化开发，完美解决组件隔离，组件嵌套，组件通信等问题
* **NPM**：完美兼容所有平台依赖的npm资源包
* **Promise**：通过polyfill，让小程序完美支持Promise解决回调烦恼
* **ES2015**：可使用Generator Function/Class/Async Function等特性
* **优化**：对小程序本身的优化，如请求队列处理，优雅的事件处理等
* **编译器**：支持样式编译器：Less/Sass/Styus，模板编译器：wx-ml/Pug
* **插件**：支持多种插件处理，如文件压缩，图片压缩，内容替换等
* **框架大小**：压缩后24.3kb即可拥有所有框架功能

## 三  项目地址

[Tencent](https://github.com/Tencent)/**[wepy](https://github.com/Tencent/wepy)**

## 四 构建项目

### 4.1 安装依赖(已安装node)

全局安装 WePY CLI 工具

```
npm install @wepy/cli -g
```

### 4.2 创建项目

创建一个空白的目录作为项目目录，在命令提示符中切换到该目录，通过wepy init初始化项目

```
wepy init standard myproj # 使用 standard 模板初始化项目
```
![][1]

根据提示信息，配置项目(Enter，使用默认配置)

```
? Project name myproject
? AppId touristappid
? Project description A WePY project
? Author orange
? Use ESLint to lint your code? Yes
? Choose a state container Vuex

[15:37:13] info Generated "myproject".
```
![][2]

### 4.3 进入项目并安装依赖

```
$ cd myproj # 进入到项目目录
$ npm install # 安装项目依赖包
```

### 4.4 监听并且编译项目

执行如下命令开启实时编译，开启后，会自动监控src目录中的代码更改

```
$ npm run dev # 监听并且编译项目
```
![][3]

## 五  WePY导入微信开发工具

微信开发者工具选择`myproject`根目录导入
![][4]
用小程序开发工具打开，并选择`AppID`
![][5]
导入后，项目便已完成后，项目结构及预览图
![][6]

## 六 项目结构
### 6.1 项目结构图
![][7]

### 6.2 说明

* dist：小程序运行代码目录，目录中的代码由WePY的build指令自动编译生成
* src：源代码目录，修改文件保存后就会触发自动编译
* package.json：WePY运行模块依赖配置文件
* wepy.config.js：WePY配置文件
* project.config.json：项目配置文件
* components：WePY组件目录
* pages：WePY页面目录
* index.wpy：index页面
* app.wpy：入口文件

## 七 参考
* [WePy-快速开始](https://wepyjs.gitee.io/wepy-docs/2.x/#/base/getstart)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-init-standard-project.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-project-config.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-build-watch.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-import-myproject-root.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-tools-import-setting.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-project-tools-preview.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-wepy-project-tree.png