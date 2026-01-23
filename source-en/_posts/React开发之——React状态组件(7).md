---
title: React开发之——React状态组件(7)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 26f8c864
date: 2023-04-16 23:27:19
---
## 一 概述

*  状态组件和无状态组件
*  state的基本使用
*  setState()修改状态
*  从 JSX 中抽离事件处理程序

<!--more-->

## 二  状态组件和无状态组件

### 2.1 概念

* 函数组件又叫做<font color=red>无状态组件</font>，类组件又叫做<font color=red>有状态组件</font>
* 状态（state）即<font color=red>数据</font>
* 函数组件没有自己的状态，<font color=red>只负责数据展示</font>（静）
* 类组件有自己的状态，<font color=red>负责更新 UI</font>，让页面“动” 起来

### 2.2 示例说明

![][1]

说明：

* 比如计数器案例中，点击按钮让数值加 1
* 0 和 1 就是不同时刻的状态，而由 0 变为 1 就表示状态发生了变化
* 状态变化后，UI 也要相应的更新。React 中想要实现该功能，就要使用有状态组件来完成

## 三 state的基本使用

### 3.1 state数据对象

使用说明：

* 状态（state）即数据，是组件内部的私有数据，只能在组件内部使用
* state 的值是对象，表示一个组件中可以有多个数据

state初始化示例：

1-默认初始化

```
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  render() {
    return <div>有状态组件</div>
  }
}
```

2-简化形式

```
class App extends React.Component {
  state = {
    count: 0
  }
  render() {
    return <div>有状态组件</div>
  }
}
```

### 3.2 state的基本使用

代码：

```
class App extends React.Component {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <h1>计算器：{this.state.count}</h1>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

说明：

* 状态即数据
* 状态是私有的，只能在组件内部使用
* 过 this.state 来获取状态

## 四 setState()修改状态

### 4.1 setState()修改状态

* 状态是可变的
* 语法：this.setState({ 要修改的数据 })
* 注意：<font color=red>不要直接修改 state 中的值，这是错误的！！！</font>
* setState() 作用：1. <font color=red>修改 state</font> 2. <font color=red>更新UI</font>
* 思想：<font color=red>数据驱动视图</font>

### 4.2 修改状态代码

```
class App extends React.Component {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <h1>计算器：{this.state.count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1
            })
          }}>
          +1
        </button>
      </div>
    )
  }
}
```

### 4.3 效果图
![][2]

## 五 从 JSX 中抽离事件处理程序

### 5.1 为何要抽取

* JSX 中掺杂过多 JS 逻辑代码，会显得非常混乱
* 推荐：<font color=red>将逻辑抽离到单独的方法中</font>，保证 JSX 结构清晰

### 5.2 抽取后的代码

```
class App extends React.Component {
  state = {
    count: 0
  }
  onIncrement() {
    console.log('事件处理程序中的this:', this)
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计算器：{this.state.count}</h1>
        <button onClick={this.onIncrement}>+1</button>
      </div>
    )
  }
}
```

### 5.3 出现的问题

```
事件处理程序中的this: undefined
Uncaught TypeError: Cannot read properties of undefined (reading 'setState')
```

原因：事件处理程序中 this 的值为 undefined

解决：稍后this课程给出解决办法




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img7-state-counter.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img7-setstate.gif