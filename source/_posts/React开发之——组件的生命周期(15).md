---
title: React开发之——组件的生命周期(15)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 9974a2ec
date: 2023-04-22 00:20:50
---
## 一 概述

*  组件的生命周期概述
*  生命周期的三个阶段
*  生命周期的三个阶段详述
*  完整生命周期

<!--more-->

## 二  组件的生命周期概述

* 意义：组件的生命周期有助于理解组件的运行方式、完成更复杂的组件功能、分析组件错误原因等
* <font color=red>组件的生命周期</font>：组件从被创建到挂载到页面中运行，再到组件不用时卸载的过程
* 生命周期的每个阶段总是伴随着一些方法调用，这些方法就是生命周期的钩子函数
* 钩子函数的作用：为开发人员在不同阶段操作组件提供了时机
* <font color=red>只有 类组件 才有生命周期</font>

## 三 生命周期的三个阶段

### 3.1 生命周期的三个阶段

![][1]

### 3.2 三个阶段执行说明

* 每个阶段的执行时机
* 每个阶段钩子函数的执行顺序
* 每个阶段钩子函数的作用

## 四 生命周期的三个阶段详述

### 4.1 创建时(挂载阶段)

#### 创建阶段说明

1-执行时机：组件创建时（页面加载时）

2-执行顺序

![][2]

3-各个钩子函数的作用

![][3]

#### 代码演示

执行代码

```
class App extends React.Component {
  constructor(props) {
    super(props)
    console.warn('生命周期钩子函数： constructor')
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    // const title = document.getElementById('title')
    // console.log(title)
    console.warn('生命周期钩子函数： componentDidMount')
  }
  render() {
    console.warn('生命周期钩子函数： render')
    return (
      <div>
        <h1 id="title">统计豆豆被打的次数：</h1>
        <button id="btn">打豆豆</button>
      </div>
    )
  }
}
```

注意事项：不要在render中调用setState()

打印结果：

```
生命周期钩子函数： constructor
周期钩子函数： render
周期钩子函数： componentDidMount
```

### 4.2 更新时(更新阶段)

#### 更新阶段说明

1-执行时机(以下三者任意一种变化，组件就会重新渲染)

```
1. setState() 2. forceUpdate() 3. 组件接收到新的props
```

2-执行顺序

![][4]

3-各个钩子函数的作用

![][5]

#### 更新方式示例代码

1-setState()方式

```
<button onClick={this.handleClick}>打豆豆</button>

handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
```

2-子组件接收到新的props

App组件

```
<Counter count={this.state.count} /
```

Counter组件

```
class Counter extends React.Component {
  render() {
    console.warn('--子组件--生命周期钩子函数： render')
    return <h1>统计豆豆被打的次数：{this.props.count}</h1>
  }
}
```

3-forceUpdate()

```
handleClick = () => {
    this.forceUpdate()
  }
```

#### componentDidUpdate中递归调用处理

```
class Counter extends React.Component {
  render() {
    console.warn('--子组件--生命周期钩子函数： render')
    return <h1 id="title">统计豆豆被打的次数：{this.props.count}</h1>
  }

  componentDidUpdate(prevProps) {
    console.warn('--子组件--生命周期钩子函数： componentDidUpdate')

    console.log('上一次的props：', prevProps, ', 当前的props：', this.props)
    if (prevProps.count !== this.props.count) {
      // this.setState({})
      // 发送ajax请求的代码
    }
  }
}
```

### 4.3 卸载时（卸载阶段）

#### 卸载阶段说明

1-执行时机：组件从页面中消失

2-各个钩子函数的作用
![][6]

#### 示例代码

App组件—销毁时，改变状态

```
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        {this.state.count > 3 ? (
          <p>豆豆被打死了~</p>
        ) : (
          <Counter count={this.state.count} />
        )}
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}
```

Counter组件—销毁时，注销定时器

```
class Counter extends React.Component {
  componentDidMount() {
    // 开启定时器
    this.timerId = setInterval(() => {
      console.log('定时器正在执行~')
    }, 500)
  }

  render() {
    return <h1>统计豆豆被打的次数：{this.props.count}</h1>
  }

  componentWillUnmount() {
    console.warn('生命周期钩子函数： componentWillUnmount')

    // 清理定时器
    clearInterval(this.timerId)
  }
}
```

## 五 完整生命周期

### 5.1 旧版的生命周期

![][1]

### 5.2 新版完整生命周期

![][8]

钩子函数说明

`getDerivedStateFromProps()`

* **`getDerivedStateFromProps`** 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
* 不管原因是什么，都会在*每次*渲染前触发此方法

`shouldComponentUpdate()`

* 根据 **`shouldComponentUpdate()`** 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
* 当 props 或 state 发生变化时，**`shouldComponentUpdate()`** 会在渲染执行之前被调用。返回值默认为 true

`getSnapshotBeforeUpdate()`

* **`getSnapshotBeforeUpdate()`** 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 **`componentDidUpdate()`**
* 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lifecycle.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-create-order.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-create-function.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-update-order.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-update-function.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-unmount-function.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-whole-old.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day3-img15-lefecycle-whole-new.png

