---
title: React开发之——React事件(6)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 2a23609d
date: 2023-04-16 22:36:12
---
## 一 概述

*  React事件概述
*  类中事件
*  函数事件
*  事件对象

<!--more-->

## 二  React事件概述

* React 事件绑定语法与 DOM 事件语法相似
* 语法：<font color=red>on+事件名称={事件处理程序}</font>，比如：onClick={() => {}}
* 注意：<font color=red>React 事件采用驼峰命名法</font>，比如：onMouseEnter、onFocus

## 三 类中事件

```
import React from 'react'
import ReactDOM from 'react-dom/client'

class App extends React.Component {
  handleClick() {
    console.log('单机事件触发了')
  }

  render() {
    return <button onClick={this.handleClick}>点我，点我</button>
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

```

## 四 函数事件

```
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  function handleClick() {
    console.log('函数组件中的事件绑定，事件触发了')
  }

  return <button onClick={handleClick}>点我，点我</button>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

## 五 事件对象

### 5.1 事件对象概述

* 可以通过事件处理程序的参数获取到事件对象
* React 中的事件对象叫做：合成事件（对象）
* 合成事件：兼容所有浏览器，无需担心跨浏览器兼容性问题

### 5.2 事件对象—阻止标签跳转

```
class App extends React.Component {
  handleClick(e) {
    e.preventDefault()
    console.log('标签的单机事件')
  }
  render() {
    return (
      <a href="http://baidu.com" onClick={this.handleClick}>
        百度
      </a>
    )
  }
}
```


