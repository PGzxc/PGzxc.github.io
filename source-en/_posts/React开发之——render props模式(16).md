---
title: React开发之——render props模式(16)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: a11b366e
date: 2023-04-22 12:12:01
---
## 一 概述

*  React组件复用概述
*  render props模式思路分析
*  render props模式实现步骤
*  render props模式复用示例(render prop+children)
*  render props模式优化

<!--more-->

## 二  React组件复用概述

### 2.1 Mouse位置显示和图片跟随

![][1]

### 2.2 React组件复用概述

* 思考：如果两个组件中的部分功能相似或相同，该如何处理？
* 处理方式：<font color=red>复用</font>相似的功能（联想函数封装）
* 复用什么？1. <font color=red>state</font> 2. <font color=red>操作state的方法</font> （组件状态逻辑 ）
* 两种方式：1. <font color=red>render props模式</font> 2. <font color=red>高阶组件（HOC）</font>
* 注意：这两种方式<font color=red>不是新的API</font>，而是利用React自身特点的编码技巧，演化而成的固定模式（写法）

## 三 render props模式思路分析

### 3.1 思路

将要复用的state和操作state的方法封装到一个组件中

### 3.2  问题1：如何拿到该组件中复用的state？

在使用组件时，添加一个值为函数的prop，通过 函数参数 来获取（需要组件内部实现）

```
<Mouse render={(mouse)=>{}} />
```

### 3.3 问题2：如何渲染任意的UI？

```
<Mouse render={(mouse)=>(<p>鼠标当前位置：{mouse.x},{mouse.y}</p>)}
```

## 四 render props模式实现步骤

### 4.1 使用步骤

* 创建Mouse组件，在组件中提供复用的<font color=red>状态逻辑</font>代码（1. 状态 2. 操作状态的方法）
* 将要<font color=red>复用的状态</font>作为 props.render(<font color=red>state</font>) 方法的参数，暴露到组件外部
* 使用 props.render() 的<font color=red>返回值</font>作为要渲染的内容

### 4.2 示例代码

Mouse组件

```
class Mouse extends React.Component {
  // 鼠标位置state
  state = {
    x: 0,
    y: 0
  }

  // 鼠标移动事件的事件处理程序
  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    return this.props.render(this.state)
  }
}
```

App组件给Mouse传递数据

```
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props 模式</h1>
        <Mouse
          render={(mouse) => {
            return (
              <p>
                鼠标位置：{mouse.x} {mouse.y}
              </p>
            )
          }}
        />
      </div>
    )
  }
}
```

## 五 render props模式复用示例(render prop+children)

### 5.1 Mouse组件的复用

#### 复用说明：

* Mouse组件负责：封装复用的状态逻辑代码（1. 状态 2. 操作状态的方法）
* 状态：鼠标坐标（x, y）
* 操作状态的方法：鼠标移动事件
* 传入的render prop负责：使用复用的状态来渲染UI结构

#### 示例代码

Mouse组件

```
class Mouse extends React.Component {
  // 鼠标位置state
  state = {
    x: 0,
    y: 0
  }

  // 鼠标移动事件的事件处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    return this.props.render(this.state)
  }
}
```

复用组件

```
<Mouse render={mouse => {return (<p>鼠标位置：{mouse.x} {mouse.y}</p>)}}/>
```

### 5.2 children代替render属性

#### childern使用说明：

* 注意：并不是该模式叫 render props 就必须使用名为render的prop，实际上可以使用任意名称的prop
* 把prop是一个函数并且告诉组件要渲染什么内容的技术叫做：render props模式
* 推荐：使用 <font color=red>children</font> 代替 render 属性

#### 示例代码

App组件

```
<Mouse>
      {mouse => {return (<p>鼠标位置：{mouse.x} {mouse.y}</p>)}}
</Mouse>
```

Mouse组件渲染时

```
render() {
    return this.props.children(this.state)
  }
```

## 六 render props模式优化

### 6.1 优化1——给 render props 模式添加 props校验

```
Mouse.propTypes = {
  chidlren: PropTypes.func.isRequired
}
```

### 6.2 应该在组件卸载时解除 mousemove 事件绑定

```
componentWillUnmount() {
   window.removeEventListener('mousemove', this.handleMouseMove)
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img16-render-props-view.gif

