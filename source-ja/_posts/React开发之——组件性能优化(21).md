---
title: React开发之——组件性能优化(21)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 73bbc636
date: 2023-04-23 16:52:20
---
## 一 概述

*  性能优化——减轻 state
*  性能优化——避免不必要的重新渲染
*  性能优化——纯组件

<!--more-->

## 二  性能优化——减轻 state

### 2.1 使用说明

* <font color=red>减轻 state</font>：只存储跟组件渲染相关的数据（比如：count / 列表数据 / loading 等）
* 注意：不用做渲染的数据不要放在 state 中，比如定时器 id等
*  对于这种需要在多个方法中用到的数据，应该放在 this 中

### 2.2 减轻state示例

```
class Hello extends Component {
  componentDidMount() {
    // timerId存储到this中，而不是state中
    this.timerId = setInterval(() => {}, 2000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  render() {}
}
```

## 三 性能优化——避免不必要的重新渲染

### 3.1 使用说明

* 组件更新机制：父组件更新会引起子组件也被更新，这种思路很清晰
* 问题：子组件没有任何变化时也会重新渲染
* 如何避免不必要的重新渲染呢？
* 解决方式：使用<font color=red>钩子函数 shouldComponentUpdate(nextProps, nextState)</font>
* 作用：通过返回值决定该组件是否重新渲染，返回 true 表示重新渲染，false 表示不重新渲染
*  触发时机：更新阶段的钩子函数，组件重新渲染前执行 （shouldComponentUpdate  render）

### 3.2 shouldComponentUpdate示例

```
shouldComponentUpdate(nextProps, nextState) {
    // 返回false，阻止组件重新渲染
    // return false

    // 最新的状态：
    console.log('最新的state：', nextState)
    // 更新前的状态：
    console.log('this.state:', this.state)

    return true
  }
```

说明：

* 返回false，阻止组件重新渲染
* 返回true，组件重新渲染
* 最新的状态：nextState
* 更新前的状态：this.state

### 3.3 案例随机数(比较state)——数值相同不重新渲染

```
class App extends React.Component {
  state = {
    number: 0
  }

  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3)
      }
    })
  }

  // 因为两次生成的随机数可能相同，如果相同，此时，不需要重新渲染
  shouldComponentUpdate(nextProps, nextState) {
    console.log('最新状态：', nextState, ', 当前状态：', this.state)
    return nextState.number !== this.state.number
  }

  render() {
    console.log('render')
    return (
      <div>
        <h1>随机数：{this.state.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
```

### 3.4 案例随机数(比较props)——数值相同不重新渲染

```
class App extends React.Component {
  state = {
    number: 0
  }

  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3)
      }
    })
  }
  render() {
    return (
      <div>
        <NumberBox number={this.state.number} />
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log('最新props：', nextProps, ', 当前props：', this.props)
    // 如果前后两次的number值相同，就返回false，不更新组件
    return nextProps.number !== this.props.number
  }
  render() {
    console.log('子组件中的render')
    return <h1>随机数：{this.props.number}</h1>
  }
}
```

## 四 性能优化——纯组件

### 4.1 纯组件使用说明

* 纯组件：PureComponent 与 React.Component 功能相似
* 区别：PureComponent 内部自动实现了 shouldComponentUpdate 钩子，不需要手动比较
* 原理：纯组件内部通过分别 对比 前后两次 props 和 state 的值，来决定是否重新渲染组件

### 4.2 纯组件示例

1-子组件使用纯组件

```
class NumberBox extends React.PureComponent {
  render() {
    console.log('子组件中的render')
    return <h1>随机数：{this.props.number}</h1>
  }
}
```

2-父组件使用纯组件

```
class App extends React.PureComponent {
  state = {
    number: 0
  }
  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3)
      }
    })
  }
  render() {
    console.log('父组件中的render')
    return (
      <div>
        <h1>随机数：{this.state.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
```

### 4.3 纯组件shallow compare

#### 使用说明：

* 说明：纯组件内部的对比是 <font color=red>shallow compare</font>（浅层对比）
* 对于值类型来说：比较两个值是否相同（直接赋值即可，没有坑）

#### 示例代码

1-基本数据类型

```
let number = 0
let newNumber = number
newNumber = 2
console.log(number === newNumber) // false
```

2-值类型

```
const newObj = { ...this.state.obj, number: Math.floor(Math.random() * 3) }
    this.setState(() => {
      return {
        obj: newObj
      }
    })
```
