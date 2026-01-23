---
title: React开发之——React脚手架(2)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 4dca1633
date: 2023-04-16 11:02:33
---
## 一 概述

* React 脚手架意义
* 两个工具npx和yarn
* 使用 React 脚手架初始化项目
* 在脚手架中使用 React

<!--more-->

## 二  React 脚手架意义

* 脚手架是开发 现代Web 应用的必备
* 充分利用 Webpack、Babel、ESLint 等工具辅助项目开发
* 零配置，无需手动配置繁琐的工具即可使用
* 关注业务，而不是工具配置

## 三 两个工具npx和yarn

### 2.1 npx

#### npx工具安装

![][1]

#### npx 命令介绍

* npm v5.2.0 引入的一条命令
* 目的：提升包内提供的命令行工具的使用体验
* 原来：先安装脚手架包，再使用这个包中提供的命令
* 现在：无需安装脚手架包，就可以直接使用这个包提供的命令

### 2.2 yarn

#### yarn安装(Node.js >=16.10)

管理员模式下，执行如下指令

```
corepack enable
```

指令执行完成后，nodejs文件夹下yarn相关文件
![][2]

安装完成后，查看yarn版本

![][3]

#### yarn介绍

* yarn 是 Facebook 发布的包管理器，可以看做是 npm 的替代品，功能与 npm 相同
* yarn 具有快速、可靠和安全的特点
* 初始化新项目：yarn init
* 安装包： yarn add 包名称
* 安装项目依赖项： yarn

## 四 使用 React 脚手架初始化项目

### 4.1 初始化项目

```
npx create-react-app my-app
```

![][4]

### 4.2 进入项目，并启动项目

```
cd my-app
npm start
```

![][5]

### 4.3 启动后效果图

启动后访问地址：

```
Local:            http://localhost:3000
On Your Network:  http://192.168.1.5:3000
```

![][6]

预览效果图

![][7]

### 4.4 补充说明

创建项目的指令有：

```
npx create-react-app my-app
npm init react-app my-app
yarn create react-app my-app
```

## 五 在脚手架中使用 React

### 5.1 修改index.js中文件——方式一

修改代码

```
import React from 'react';
import ReactDOM from 'react-dom'
const title =React.createElement('h1',null,'Hello React ！！！')
ReactDOM.render(title, document.getElementById('root'))
```

过程说明：

* 导入 react 和 react-dom 两个包
* 调用 React.createElement() 方法创建 react 元素
* 调用 ReactDOM.render() 方法渲染 react 元素到页面中

### 5.2 修改index.js中文件——方式二

修改代码

```
import React from 'react';
import ReactDOM from 'react-dom/client';

const title =React.createElement('h1',null,'Hello React ！！！')
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  title
);
```

过程说明

* 导入 react 和 react-dom 两个包(ReactDOM与上步不同)
* 调用ReactDOM.createRoot()方法创建react元素
* React.createElement()方法创建渲染元素
* 调用root.render()方法渲染元素到页面中

## 六 参考

* [Yarn官网](https://yarnpkg.com/getting-started/install)
* [2023creat react app 报错怎么办](https://www.zzsucai.com/biancheng/23068.html)
* [React 开发者工具](https://zh-hans.reactjs.org/learn/react-developer-tools)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-node-npx.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-yarn-enable.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-yarn-version.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-create-my-app.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-npm-start.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-start-site.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img2-node-start-view.png