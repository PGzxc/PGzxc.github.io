---
title: React开发之——JSX语法的转化过程(19)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 6267a036
date: 2023-04-23 12:27:11
---
## 一 概述

*  React中为什么可以使用JSX
*  React元素
*  JSX示例

<!--more-->

## 二  React中为什么可以使用JSX

* JSX 仅仅是 createElement() 方法的语法糖（简化语法）
*  JSX 语法被 @babel/preset-react 插件编译为 createElement() 方法

## 三 React元素

 React 元素：是一个对象，用来描述你希望在屏幕上看到的内容

![][1]

## 四 JSX示例

### 4.1 使用JSX代码

```
import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1 className="greeting">Hello JSX!</h1>
console.log(element)
ReactDOM.render(element, document.getElementById('root'))
```

### 4.2 JSX转化为Element代码

```
import React from 'react'
import ReactDOM from 'react-dom'

/* 
  JSX 语法的转化过程
*/

// const element = <h1 className="greeting">Hello JSX!</h1>

const element = React.createElement(
  'h1',
  {
    className: 'greeting'
  },
  'Hello JSX！'
)

console.log(element)

ReactDOM.render(element, document.getElementById('root'))
```





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day4-img19-jsx-element.png