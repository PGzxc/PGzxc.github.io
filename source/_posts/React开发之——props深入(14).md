---
title: React开发之——props深入(14)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: '31900699'
date: 2023-04-18 12:41:00
---
## 一 概述

*  children 属性
*  props 校验
*  props 的默认值

<!--more-->

## 二  children 属性

### 2.1 children属性说明

* children 属性：表示组件标签的子节点。当组件标签有子节点时，props 就会有该属性
* children 属性与普通的props一样，值可以是任意值（文本、React元素、组件，甚至是函数）

### 2.2 children示例

1-代码示例-组件

```
const Test = () => <button>我是button组件</button>

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>组件标签的字节点：</h1>
        {this.props.children}
      </div>
    )
  }
}

// 渲染组件
ReactDOM.render(
  <App>
    <Test />
  </App>,
  document.getElementById('root')
)
```

2-代码示例-文本

```
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>组件标签的字节点：{this.props.children}</h1>
      </div>
    )
  }
}

ReactDOM.render(<App>我是子节点</App>, document.getElementById('root'))
```

3-代码示例-函数

```
class App extends React.Component {
  render() {
    this.props.children()
    return (
      <div>
        <h1>组件标签的字节点：</h1>
      </div>
    )
  }
}

ReactDOM.render(<App>{() => console.log('这是一个函数')}</App>, document.getElementById('root'))
```

## 三 props 校验

### 3.1 未校验的问题

代码

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const App = (props) => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item}</li>)

  return <ul>{lis}</ul>
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App colors={19}></App>)
```

错误信息

```
index.js:7 Uncaught TypeError: arr.map is not a function
```

问题说明：

* 对于组件来说，props 是外来的，无法保证组件使用者传入什么格式的数据】
* 如果传入的数据格式不对，可能会导致组件内部报错
* 关键问题：组件的使用者不知道明确的错误原因

### 3.2 props校验

1-使用步骤

* 安装包 prop-types （yarn add prop-types / npm i props-types）
* 导入 prop-types 包
* 使用组件名.propTypes = {} 来给组件的props添加校验规则
* 校验规则通过 PropTypes 对象来指定

2-示例代码

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PropTypes from 'prop-types'

const App = (props) => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item}</li>)

  return <ul>{lis}</ul>
}
// 添加props校验
App.propTypes = {
  colors: PropTypes.array
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App colors={19}></App>)
```

3-错误信息(明确给出类型问题)

```
react-jsx-dev-runtime.development.js:87 Warning: Failed prop type: Invalid prop `colors` of type `number` supplied to `App`, expected `array`.
```

4-props校验说明：

* props 校验：允许在创建组件的时候，就指定 props 的类型、格式等
* 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性

### 3.3 props 校验—约束规则

约束规则

* 常见类型：array、bool、func、number、object、string
* React元素类型：element
* 必填项：isRequired
* 特定结构的对象：shape({ })

示例代码

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PropTypes from 'prop-types'

const App = (props) => {
  return (
    <div><h1>props校验</h1></div>
  )
}
// 添加props校验
App.propTypes = {
  a: PropTypes.number,
  fn: PropTypes.func.isRequired,
  tag: PropTypes.element,
  filter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number
  })
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App></App>)
```

## 四 props 的默认值

### 4.1 使用说明

* 场景：分页组件  每页显示条数
* 作用：给 props 设置默认值，在未传入 props 时生效
* 通过App.defaultProps设置默认值

### 4.2 示例代码

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PropTypes from 'prop-types'

const App = (props) => {
  return (
    <div><h1>此处展示props的默认值:{props.pageSize}</h1></div>
  )
}
// 添加props校验
App.defaultProps = {
  pageSize:10
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App pageSize={20}></App>)
```

说明：

* 未设置pageSize时，显示App.defaultProps的默认值
* 设置了pageSize时，显示设置的pageSize值

## 五 参考

* [npm-pro-types](https://www.npmjs.com/package/prop-types)
* [React-PropTypes](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)


