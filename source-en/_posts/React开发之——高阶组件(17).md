---
title: React开发之——高阶组件(17)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: a3c4e3cc
date: 2023-04-22 22:47:51
---
## 一 概述

*  高阶组件概述
*  高阶组件思路分析
*  高阶组件实现步骤
*  高阶组件设置displayName
*  高阶组件传递props

<!--more-->

## 二  高阶组件概述

- 目的：<font color=red>实现状态逻辑复用</font>
- 采用 <font color=red>包装(装饰)模式</font>，比如说：手机壳
- 手机：获取保护功能
- 手机壳：提供保护功能
- 高阶组件就相当于手机壳，通过包装组件，增强组件功能

## 三 高阶组件思路分析

### 3.1 接收要包装的组件，返回增强后的组件

高阶组件（HOC，Higher-Order Component）是一个函数，接收要包装的组件，返回增强后的组件

```
const EnhancedComponent = withHOC(WrappedComponent)
```

### 3.2 通过prop将复用的状态传递给被包装组件WrappedComponent

高阶组件内部创建一个类组件，在这个类组件中提供复用的状态逻辑代码，通过prop将复用的状态传递给
被包装组件 WrappedComponent

```
// 高阶组件内部创建的类组件：
class Mouse extends React.Component {
  render() {
    return <WrappedComponent {...this.state} />
  }
}
```

##  四 高阶组件实现步骤

### 4.1 使用步骤说明

* 创建一个函数，名称约定以<font color=red> with 开头</font>
* 指定函数参数，参数应该以大写字母开头（作为要渲染的组件）
* 在函数内部创建一个类组件，<font color=red>提供复用的状态逻辑代码</font>，并返回
* 在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件
* 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面中

### 4.2 高阶组件创建过程

1-创建高阶组件

```
function withMouse(WrappedComponent) {
  // 该组件提供复用的状态逻辑
  class Mouse extends React.Component {
    // 鼠标状态
    state = {
      x: 0,
      y: 0
    }

    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    // 控制鼠标状态的逻辑
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }

    render() {
      return <WrappedComponent {...this.state} />
    }
  }

  return Mouse
}
```

2-测试高阶组件

```
const Position = (props) => (
  <p>
    鼠标当前位置：(x: {props.x}, y: {props.y})
  </p>
)

// 猫捉老鼠的组件：
const Cat = (props) => (
  <img
    src={img}
    alt=""
    style={{
      position: 'absolute',
      top: props.y - 64,
      left: props.x - 64
    }}
  />
)
```

3-增强组件

```
// 获取增强后的组件：
const MousePosition = withMouse(Position)

// 调用高阶组件来增强猫捉老鼠的组件：
const MouseCat = withMouse(Cat)
```

4-渲染组件

```
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>高阶组件</h1>
        {/* 渲染增强后的组件 */}
        <MousePosition />
        <MouseCat />
      </div>
    )
  }
}
```

## 五 高阶组件设置displayName

### 5.1 设置displayName说明

* 使用高阶组件存在的问题：得到的两个组件名称相同
* 原因：默认情况下，React使用<font color=red>组件名称</font>作为 displayName
* 解决方式：为 高阶组件 设置 <font color=red>displayName</font> 便于调试时区分不同的组件
* displayName的作用：用于设置调试信息（React Developer Tools信息）

### 5.2 设置displayName示例

1-高阶组件内部设置displayName

```
Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
```

2-getDisplayName方法

```
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
```

## 六 高阶组件传递props

### 6.1 传递props说明

* 问题：props丢失
* 原因：高阶组件没有往下传递props
* 解决方式：渲染 WrappedComponent 时，将 <font color=red>state</font> 和 <font color=red>this.props</font> 一起传递给组件

### 6.2 示例

1-使用高级组件时，传递props值

```
<MousePosition a="1" />
```

2-高级组件内，传递方式

```
render() {
   console.log('Mouse:', this.props)
   return <WrappedComponent {...this.state} {...this.props} />
}
```

