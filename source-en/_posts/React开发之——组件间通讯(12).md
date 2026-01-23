---
title: React开发之——组件间通讯(12)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: edb3bd6f
date: 2023-04-18 11:17:01
---
## 一 概述

*  组件间通讯介绍
*  组件通讯的三种方式
*  父组件传递数据给子组件
*  子组件传递数据给父组件
*  兄弟组件间通讯

<!--more-->

## 二  组件间通讯介绍

* 组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据
* 在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能
* 而在这个过程中，多个组件之间不可避免的要共享某些数据
* 为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通。这个过程就是组件通讯

## 三 组件通讯的三种方式

组件之间的通讯分为 3 种：

* 父组件 -> 子组件
* 子组件 -> 父组件
* 兄弟组件

## 四 父组件传递数据给子组件

### 4.1 过程描述

* 父组件提供要传递的state数据
* 给子组件标签添加属性，值为 state 中的数据
* 子组件中通过 props 接收父组件中传递的数据

### 4.2 示例代码

```
class Parent extends React.Component {
  state = {
    lastName: '父组件数据'
  }
  render() {
    return (
      <div className="parent">
        父组件
        <Child name={this.state.lastName} />
      </div>
    )
  }
}

const Child = (props) => {
  console.log('子组件：', props)
  return (
    <div className="child">
      <p>子组件，接收到父组件的数组：{props.name}</p>
    </div>
  )
}
// 渲染组件
ReactDOM.render(<Parent />, document.getElementById('root'))
```

### 4.3 效果图

![][1]

## 五 子组件传递数据给父组件

### 5.1 实现思路

思路：利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数

* 父组件提供一个回调函数（用于接收数据）
* 将该函数作为属性的值，传递给子组件
* 子组件通过 props 调用回调函数
* 将子组件的数据作为参数传递给回调函数

### 5.2 示例代码

```
// 父组件
class Parent extends React.Component {
  state = {
    parentMsg: ''
  }

  // 提供回调函数，用来接收数据
  getChildMsg = (data) => {
    console.log('接收到子组件中传递过来的数据：', data)

    this.setState({
      parentMsg: data
    })
  }

  render() {
    return (
      <div className="parent">
        父组件：{this.state.parentMsg}
        <Child getMsg={this.getChildMsg} />
      </div>
    )
  }
}

// 子组件
class Child extends React.Component {
  state = {
    msg: '传递数据给父组件'
  }

  handleClick = () => {
    // 子组件调用父组件中传递过来的回调函数
    this.props.getMsg(this.state.msg)
  }

  render() {
    return (
      <div className="child">
        子组件： <button onClick={this.handleClick}>点我，给父组件传递数据</button>
      </div>
    )
  }
}
```

### 5.3 效果图

![][2]

## 六 兄弟组件间通讯

### 6.1 过程描述

* 将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态
* 思想：状态提升
* 公共父组件职责：1. 提供共享状态 2. 提供操作共享状态的方法
* 要通讯的子组件只需通过 props 接收状态或操作状态的方法

![][3]

### 6.2 示例代码

```
// 父组件
class Counter extends React.Component {
  // 提供共享状态
  state = {
    count: 0
  }

  // 提供修改状态的方法
  onIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <Child1 count={this.state.count} />
        <Child2 onIncrement={this.onIncrement} />
      </div>
    )
  }
}

const Child1 = (props) => {
  return <h1>计数器：{props.count}</h1>
}

const Child2 = (props) => {
  return <button onClick={() => props.onIncrement()}>+1</button>
}
```

### 6.3 效果图
![][4]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img12-communite-p2z.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img12-communite-z2f.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img12-communite-xd.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img12-communite-xd-counter.gif