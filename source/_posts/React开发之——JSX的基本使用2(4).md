---
title: React开发之——JSX的基本使用2(4)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 71c7b1c7
date: 2023-04-16 13:15:38
---
## 一 概述

* JSX 中使用 JavaScript 表达式
*  JSX 的条件渲染
*  JSX 的列表渲染
*  JSX 的样式处理

<!--more-->

## 二  JSX 中使用 JavaScript 表达式

### 2.1 嵌入 JS 表达式

* 数据存储在JS中
* 语法：<font color=red>{ JavaScript表达式 }</font>
* 注意：语法中是<font color=red>单大括号</font>，不是双大括号！

### 2.2 嵌入 JS 表达式示例

```
import React from 'react'
import ReactDOM from 'react-dom/client'
const name = 'Jack'
const sayHi = () => 'Hi~'
const div = <div>你好，我叫{name}</div>
const title = (
  <h1>
    Hello JSX
    <p>{div}</p>
    <p>{1}</p>
    <p>{'a'}</p>
    <p>{1 + 5}</p>
    <p>{3 > 5 ? '大于' : '小于等于'}</p>
    <p>{sayHi()}</p>
  </h1>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)
```

### 2.3 嵌入 JS 表达式—注意事项

* 单大括号中可以使用任意的 JavaScript 表达式
* JSX 自身也是 JS 表达式
* 注意：JS 中的对象是一个例外，一般只会出现在 style 属性中
* 注意：不能在{}中出现语句（比如：if/for 等）

示例：

```
import React from 'react'
import ReactDOM from 'react-dom/client'

const h1 = <h1>我是JSX</h1>
const div=<div>嵌入表达式：{h1}</div>
const title = (
  <div>
    <p>{div}</p>
    {/* <p>{{a:'6'}}</p> */}
    {/* {if(true){}} */}
    {/* {for(var i=0;i<6;i++){}} */}
  </div>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)
```

## 三  JSX 的条件渲染

### 3.1 应用场景

* 场景：loading效果
* 条件渲染：根据条件渲染特定的 JSX 结构
* 可以使用if/else或三元运算符或逻辑与运算符来实现

### 3.2 代码实现

方式一：if/else

```
import React from 'react'
import ReactDOM from 'react-dom/client'

const isLoading = false
const loadData = () => {
  if (isLoading) {
    return <div>loading.....</div>
  }
  return <div>数据加载完成，此处显示加载后的数据</div>
}

const title = (
  <h1>
    条件渲染：
    {loadData()}
  </h1>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)

```

方式二：三元运算符

```
import React from 'react'
import ReactDOM from 'react-dom/client'

const isLoading = false
const loadData = () => {
  return isLoading ? <div>loading.... </div> : <div>数据加载完成，此处显示加载后的数据</div>
}

const title = (
  <h1>
    条件渲染：
    {loadData()}
  </h1>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)

```

方式二：逻辑与运算符(只有一种)

```
import React from 'react'
import ReactDOM from 'react-dom/client'

const isLoading = true
const loadData = () => {
  return isLoading && <div>loading.... </div>
}

const title = (
  <h1>
    条件渲染：
    {loadData()}
  </h1>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(title)
```

## 四 JSX 的列表渲染

### 4.1 列表数据渲染说明

* 如果要渲染一组数据，应该使用数组的<font color=red>map()</font> 方法
* 注意：渲染列表时应该添加 key 属性，<font color=red>key 属性的值要保证唯一</font>
* 原则：map() 遍历谁，就给谁添加 key 属性
* 注意：<font color=red>尽量避免使用索引号作为 key</font>

### 4.2 示例代码

```
import React from 'react'
import ReactDOM from 'react-dom/client'

const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '像我这样的人' },
  { id: 3, name: '南山南' }
]

const list = (
  <ul>
    {songs.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(list)

```

### 4.3 效果图

```
. 痴心绝对
. 像我这样的人
. 南山南
```

## 五 JSX 的样式处理

### 5.1 行内样式 —— style

代码

```
<h1 style={{ color: 'red', backgroundColor: 'skyblue' }}>
JSX的样式处理
</h1>
```

效果图
![][1]

### 5.2 类名 —— className（推荐）

1-添加className

```
const list = (
 <h1 className='title' style={{color:'red',backgroundColor: 'skyblue'}}>JSX的样式处理</h1>
)
```

2-index.css中定义title

```
.title{
  text-align: center;
}
```

3-index.js中导入index.css

```
import './index.css'
```

4-效果图

![][2]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img4-jsx-style-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img4-jsx-style-2.png
