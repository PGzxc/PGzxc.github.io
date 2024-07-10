---
title: React开发之——React入门基础(1)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: '137e0667'
date: 2023-04-16 10:57:31
---
## 一 概述

* React概述
* React 的基本使用

<!--more-->

## 二  React概述

### 2.1 什么是 React

* <font color=red>React</font> 是一个用于<font color=red>构建用户界面</font> 的<font color=red>JavaScript 库</font>
* 用户界面：HTML页面（前端）
* React 主要用来写HTML页面，或<font color=red>构建Web应用</font>
* 如果从 MVC 的角度来看，React 仅仅是视图层（V），也就是只负责视图的渲染，而并非提供了
  完整的 M 和 C 的功能。
* React 起源于 Facebook 的内部项目，后又用来架设 Instagram 的网站，并于 2013 年 5 月开源

### 2.2 React 的特点

React的特点：声明式、基于组件、学习一次，随处使用

#### 声明式

你只需要描述 UI（HTML）看起来是什么样，就跟写HTML一样
React 负责渲染 UI，并在数据变化时更新 UI

```
const jsx = <div className="app">
 <h1>Hello React！动态变化数据:{count}</h1>
</div>
```

#### 基于组件

* 组件是 React 最重要的内容
* 组件表示页面中的部分内容
* 组合、复用多个组件，可以实现完整的页面功能

![][1]

#### 学习一次，随处使用

* 使用 React 可以开发 Web 应用
* 使用 React 可以开发移动端原生应用（react-native）
* 使用 React 可以开发 VR（虚拟现实）应用（react 360）

![][2]

## 三 React 的基本使用

### 3.1 环境变量

* node版本：v18.16.0(node --version)
* npm版本：9.6.2(npm -v)

### 3.2 创建项目

1-执行如下指令生成package.json

```
npm init -y
```

2-使用快捷指令生成index.html

### 3.3 React安装(版本18.2.0)

```
npm i react react-dom
```

* react 包是核心，提供创建元素、组件等功能
* react-dom 包提供 DOM 相关功能等

### 3.4 React的使用(index.html)

1-引入 react 和 react-dom 两个 js 文件

```
<script src="./node_modules/react/umd/react.development.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

2-创建 React 元素

```
<div id="root"></div>
```

3-渲染 React 元素到页面中

```
<script>
      const title = React.createElement('h1', null, 'Hello React')
      ReactDOM.render(title, document.getElementById('root'))
</script>
```

4-效果图
![][3]

### 3.5 方法说明

#### React.createElement() 说明——返回值：React元素

```
const el = React.createElement('h1', { title: '标题' }, 'Hello React')
```

* 第一个参数：要创建的React元素名称
* 第二个参数：该React元素的属性
* 第三个及其以后的参数：该React元素的子节点

#### ReactDOM.render() 说明

```
ReactDOM.render(el, document.getElementById('root'))
```

* 第一个参数：要渲染的React元素
* 第二个参数：DOM对象，用于指定渲染到页面中的位置




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img1-compose-construct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img1-all-use.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img1-hello-react.png