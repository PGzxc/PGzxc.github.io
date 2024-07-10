---
title: React开发之——组件更新机制(20)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 282b568d
date: 2023-04-23 12:57:04
---
## 一 概述

*  setState() 的两个作用
*  组件更新过程
*  组件更新示例

<!--more-->

## 二  setState() 的两个作用

* 修改state
* 更新组件

## 三 组件更新过程

过程：父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件子树（当前组件以其所有子组件）

![][1]

## 四 组件更新示例

### 4.1 示例代码

1-App跟组件

```
class App extends React.Component {
  state = {
    color: '#369'
  }

  getColor() {
    return Math.floor(Math.random() * 256)
  }

  changeBG = () => {
    this.setState(() => {
      return {
        color: `rgb(${this.getColor()}, ${this.getColor()}, ${this.getColor()})`
      }
    })
  }

  render() {
    console.log('根组件')
    return (
      <div className="app" style={{ backgroundColor: this.state.color }}>
        <button onClick={this.changeBG}>根组件 - 切换颜色状态</button>
        <div className="app-wrapper">
          <Parent1 />
          <Parent2 />
        </div>
      </div>
    )
  }
}
```

2-左侧组件

```
// ------------------------左侧---------------------------

class Parent1 extends React.Component {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState((state) => ({ count: state.count + 1 }))
  }
  render() {
    console.log('左侧父组件')
    return (
      <div className="parent">
        <h2>
          左侧 - 父组件1
          <button onClick={this.handleClick}>点我（{this.state.count}）</button>
        </h2>
        <div className="parent-wrapper">
          <Child1 />
          <Child2 />
        </div>
      </div>
    )
  }
}

class Child1 extends React.Component {
  render() {
    console.log('左侧子组件 - 1')
    return <div className="child">子组件1-1</div>
  }
}
class Child2 extends React.Component {
  render() {
    console.log('左侧子组件 - 2')
    return <div className="child">子组件1-2</div>
  }
}
```

3-右侧组件

```
// ------------------------右侧---------------------------

class Parent2 extends React.Component {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState((state) => ({ count: state.count + 1 }))
  }

  render() {
    console.log('右侧父组件')
    return (
      <div className="parent">
        <h2>
          右侧 - 父组件2
          <button onClick={this.handleClick}>点我（{this.state.count}）</button>
        </h2>
        <div className="parent-wrapper">
          <Child3 />
          <Child4 />
        </div>
      </div>
    )
  }
}

class Child3 extends React.Component {
  render() {
    console.log('右侧子组件 - 1')
    return <div className="child">子组件2-1</div>
  }
}
class Child4 extends React.Component {
  render() {
    console.log('右侧子组件 - 2')
    return <div className="child">子组件2-2 </div>
  }
}
```

4-渲染App

```
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

### 4.2 点击左侧按钮

```
左侧父组件
左侧子组件-1
左侧子组件-2
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day4-img2-component-update.png