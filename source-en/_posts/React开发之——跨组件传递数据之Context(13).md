---
title: React开发之——跨组件传递数据之Context(13)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: ee6c7679
date: 2023-04-18 11:48:34
---
## 一 概述

*  App组件如何传递数据给Child组件
*  Context使用示例
*  Context总结

<!--more-->

## 二  App组件如何传递数据给Child组件

图示

![][1]

思考：App 组件要传递数据给 Child 组件，该如何处理？

* 处理方式：使用 props 一层层组件往下传递（繁琐）
* 更好的姿势：使用 Context
*  作用：跨组件传递数据（比如：主题、语言等）

## 三 Context使用示例

### 3.1 使用步骤

1- 调用 React. createContext() 创建 Provider（提供数据） 和 Consumer（消费数据） 两个组件

```
const { Provider, Consumer } = React.createContext()
```

2-使用 Provider 组件作为父节点

```
<Provider>
<div className="App">
<Child1 />
</div>
</Provider>
```

3-设置 value 属性，表示要传递的数据

```
<Provider value="pink">
```

4-调用 Consumer 组件接收数据

```
<Consumer>
{data => <span>data参数表示接收到的数据 -- {data}</span>}
</Consumer>
```

### 3.2 完整代码

index.js

```
const { Provider, Consumer } = React.createContext()

class App extends React.Component {
  render() {
    return (
      <Provider value="pink">
        <div className="app">
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = props => {
  return (
    <div className="node">
      <SubNode />
    </div>
  )
}

const SubNode = props => {
  return (
    <div className="subnode">
      <Child />
    </div>
  )
}

const Child = props => {
  return (
    <div className="child">
      <Consumer>{data => <span>我是子节点 -- {data}</span>}</Consumer>
    </div>
  )
}
```

index.css

```
.app {
  height: 100px;
  padding: 10px;
  background-color: #c4d0dc;
}

.node {
  height: 80px;
  padding: 10px;
  background-color: yellowgreen;
}

.subnode {
  height: 60px;
  padding: 10px;
  background-color: #dcdc39;
}

.child {
  height: 40px;
  padding: 10px;
  background-color: skyblue;
}
```

### 3.3 效果图
![][2]

## 四 Context总结

* 如果两个组件是远方亲戚（比如，嵌套多层）可以使用Context实现组件通讯
* Context提供了两个组件：Provider 和 Consumer
* Provider组件：用来提供数据
* Consumer组件：用来消费数据



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img13-context-app2child.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day2-img13-context-sample.png
