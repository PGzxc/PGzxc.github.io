---
title: Taro开发之——项目结构及编译运行命令(3)
categories:
  - 开发
  - F-跨平台
  - Taro
tags:
  - Taro
abbrlink: 287577a5
date: 2025-06-24 10:47:36
---
## 一 概述

* 项目目录结构说明
* 编译指令说明

<!--more-->

## 二 项目目录结构说明

### 2.1 index.html预览文件

```
将要显示的内容替换为id=app的div区域
```

![][1]

### 2.2 app.ts渲染页面

```
替换id=app的div区域
```

![][2]

### 2.3 app.config.ts 配置app信息

```
pages标明引用pages/index内容
```

![][3]

### 2.4 index.config.ts 配置index页面信息

```
navigationBarTitleText：'首页'；导航栏显示标题“首页”
```

![][4]

### 2.5 index.tsx index页面文件

```
页面只有一行Text显示Hello World!
```

![][5]

## 三 编译指令说明

### 3.1 dev和build模式

```
使用 Taro 的 build 命令可以把 Taro 代码编译成不同端的代码，然后在对应的开发工具中查看效果。

Taro 编译分为 dev 和 build 模式：
-dev 模式（增加 --watch 参数） 将会监听文件修改。
-build 模式（去掉 --watch 参数） 将不会监听文件修改，并会对代码进行压缩打包。

dev 模式生成的文件较大，
设置环境变量 NODE_ENV 为 production 可以开启压缩，方便预览，但编译速度会下降。
```

### 3.2 编译命令

```
$ pnpm dev:weapp
$ pnpm build:weapp

# yarn
$ yarn dev:weapp
$ yarn build:weapp

# npm script
$ npm run dev:weapp
$ npm run build:weapp
```

### 3.3 编译文件位置

```
./dist
```

## 四 参考

* [Taro官网文档——H5](https://docs.taro.zone/docs/GETTING-STARTED#h5)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-3-h5-index-exp-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-3-h5-app-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-3-h5-appconfig-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-3-h5-index-config-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-taro/taro-3-h5-index-view-5.png

