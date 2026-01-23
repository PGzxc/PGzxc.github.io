---
title: UmiJS开发之——快速上手
categories:
  - 开发
  - C-前端开发
  - Umi
tags:
  - Umi
abbrlink: 51c30ba
date: 2021-12-29 16:40:56
---
## 一 Umi是什么

* Umi，中文可发音为**乌米**， 是蚂蚁金服的底层前端框架，也是可扩展的企业级前端应用框架
* Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展
* Umi配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

<!--more-->

## 二Umi 如何工作？

### 2.1 技术栈

![技术栈][1]

### 2.2 插件和插件集
![][2]

## 三 快速入门

### 3.1 环境准备

* node(10.13或以上)
* yarn管理npm依赖

```
# 国内源
$ npm install yarn  -g
```

### 3.2 创建项目demo

####  创建项目目录(cmd终端模式)

```
mkdir myapp && cd myapp
```

#### 安装umi依赖

```
yarn add umi
```

#### 创建页面

```
npx umi g page index --typescript --less
```

#### 启动预览

```
npx umi dev
```

![][3]

## 四 参考
* [UmiJS——首页](https://umijs.org/zh-CN)
* [UmiJS——3.X-介绍](https://umijs.org/zh-CN/docs)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-umi/umi-struct-technology-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-umi/umi-struct-plugin-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-umi/umi-first-demo-preview.png