---
title: 微信小程序开发之——mpvue开发小程序
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 60a398ce
date: 2021-10-26 16:53:15
---
## 一  概述

* mpvue：Vue.js in mini program，即mini vue.js编程框架
* mpvue是把vue.js核心代码经过二次开发的框架，增加了vue.js开发小程序的能力
* mpvue适合习惯用Vue.js框架的开发者开发小程序使用

<!--more-->

## 二 mpvue开发的特点

* 彻底的组件化开发能力，提高代码复用性
* 完整的Vue.js开发体验
* 方便的Vuex数据管理方案，方便构建复杂应用
* 快捷的webpack构建机制：自定义构建策略，开发阶段热加载
* 支持使用npm外部依赖
* 使用Vue.js命令行工具vue-cli快速初始化项目
* H5代码转换编译成小程序目标代码的能力

## 三  开发环境和工具

### 3.1 开发环境

* Node.js
* 微信开发者工具

### 3.2 vue-cli脚手架

```
npm install vue-cli -g
```

### 3.3 验证安装是否完成

```
vue -V
```

当前版本号：2.9.6

## 四 构建项目

### 4.1 选择小程序项目的位置，并在终端中打开

```
D:\Code\WeChatProjects>
```

### 4.2 执行如下指令，构建初始化项目(firstapp是项目的名称)

```
vue init mpvue/mpvue-quickstart firstapp
```

![][1]

确定或修改配置生成项目代码的配置信息(修改直接填写，Enter回车默认配置)

```
? Project name firstapp
? wxmp appid touristappid
? Project description A Mpvue project
? Author 橙子
? Vue build runtime
? Use Vuex? Yes
? Use ESLint to lint your code? Yes
? 小程序测试，敬请关注最新微信开发者工具的“测试报告”功能
```

![][2]

出现`?小程序测试，敬请关注最新微信开发者工具的“测试报告”功能`回车，生成项目代码和后续指导

```
   vue-cli · Generated "firstapp".

   To get started:

     cd firstapp
     npm install
     npm run dev

   Documentation can be found at http://mpvue.com
```

![][3]

### 4.3 安装依赖

切换到firstapp项目目录，为项目安装依赖

```
cd firstapp
npm install
```
![][4]

### 4.4 项目启动

打开fristapp目录下的package.json文件，可以看到项目的启动命令为`npm run dev`

```
npm run dev
```

### 4.5 预览项目

微信开发者工具导入项目：项目——>导入项目——>firstapp
![][5]
打开后，项目预览图如下
![][6]

## 五 项目结构图
### 5.1 结构示意图
![][7]

### 5.2 项目文件说明

* dist：小程序运行代码目录，目录中的代码由编译程序自动编译生成
* src：源代码目录，修改文件保存后就会触发自动编译
* package.json：mpvue运行模块依赖配置文件
* config：mpvue配置文件
* project.config.json：项目配置文件
* src/components：mpvue小程序组件目录
* src/pages：mpvue小程序页面目录
* src/App.vue：mpvue项目的主组件
* src/app.json：mpvue项目的小程序配置文件
* src/main.js：mpvue项目的入口文件




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-init-cmd-project.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-project-firstapp-config.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-vue-cli-firstapp.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-cd-first-npm-install.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-import-firstapp.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-firstapp-preview.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-mpvue-project-struct.png