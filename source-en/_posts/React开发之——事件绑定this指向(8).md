---
title: React开发之——事件绑定this指向(8)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 6d710238
date: 2023-04-16 23:57:07
---
## 一 概述

*  箭头函数
*  Function.prototype.bind()
*  class 的实例方法

<!--more-->

## 二  箭头函数

### 2.1 概念说明

* 利用箭头函数自身不绑定this的特点
* render() 方法中的 this 为组件实例，可以获取到 setState()

### 2.2 示例代码

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
        <button onClick={() => this.onIncrement()}>+1</button>
      </div>
    )
  }
}
```

## 三 Function.prototype.bind()

### 3.1 概念说明

利用ES5中的bind方法，将事件处理程序中的this与组件实例绑定到一起

### 3.2 示例代码

```
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.onIncrement = this.onIncrement.bind(this)
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

## 四 class 的实例方法

### 4.1 class 的实例方法

* class 的实例方法
* 注意：该语法是实验性语法，但是，由于babel的存在可以直接使用

### 4.2 示例代码

```
class App extends React.Component {
  state = {
    count: 0
  }
  onIncrement = () => {
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
