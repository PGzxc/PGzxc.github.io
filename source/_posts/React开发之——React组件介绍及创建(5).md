---
title: React开发之——React组件介绍及创建(5)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 68b8816f
date: 2023-04-16 22:14:36
---
## 一 概述

*  React 组件介绍
*  React 组件的两种创建方式

<!--more-->

## 二  React 组件介绍

### 2.1 React图示

![][1]

### 2.2 Reac介绍

* 组件是 React 的一等公民，使用 React 就是在用组件
* 组件表示页面中的部分功能
* 组合多个组件实现完整的页面功能
* 特点：可复用、独立、可组合

## 三 React 组件的两种创建方式

### 3.1 使用函数创建组件

#### 创建函数组件

规则：

* 函数组件：使用 JS 的函数（或箭头函数）创建的组件
* 约定1：函数名称必须以<font color=red>大写字母开头</font>
* 约定2：函数组件<font color=red>必须有返回值</font>，表示该组件的结构
* 如果返回值为 null，表示不渲染任何内容

创建组件代码：

```
function Hello() {
  return <div>这是我的第一个函数组件</div>
}
```

#### 使用函数组件

```
function Hello() {
  return <div>这是我的第一个函数组件</div>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Hello />)
```

说明：

* 渲染函数组件：<font color=red>用函数名作为组件标签名</font>
* 组件标签可以是单标签也可以是双标签

#### 使用函数组件说明

* 使用JS中的函数创建的组件叫做：函数组件
* 函数组件必须有返回值
* 组件名称必须以大写字母开头， React 据此区分 组件 和 普通的React 元素
* 使用函数名作为组件标签名

### 3.2 使用类创建组件

#### 创建类组件

规则说明：

* 类组件：使用 ES6 的 class 创建的组件
* 约定1：类名称也必须以大写字母开头
* 约定2：类组件应该继承 React.Component 父类，从而可以使用父类中提供的方法或属性
* 约定3：类组件必须提供 render() 方法
* 约定4：render() 方法必须有返回值，表示该组件的结构

创建类组件的代码

```
import React from 'react'
import ReactDOM from 'react-dom/client'

class Hello extends React.Component {
  render() {
    return <div>这是我的第一个类组件</div>
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Hello />)
```

#### 抽离为独立 JS 文件

过程描述：

* 创建Hello.js
* 在 Hello.js 中导入React
* 创建组件（函数 或 类）
* 在 Hello.js 中导出该组件
* 在 index.js 中导入 Hello 组件
* 渲染组件

创建代码

1-Hello.js

```
import React from 'react'

class Hello extends React.Component {
  render() {
    return <div>这是我的第一个抽离到js文件的组件</div>
  }
}

export default Hello
```

2-index.js

```
import ReactDOM from 'react-dom/client'
import Hello from './Hello'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Hello />)
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img5-react-construct-view.png

