---
title: React开发之——路由的执行过程(24)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: ab2c0e6c
date: 2023-04-24 00:27:00
---
## 一 概述

* 路由的执行过程
* 编程式导航

<!--more-->

## 二  路由的执行过程

### 2.1 路由的执行过程说明

* 当我们点击Link组件的时候，修改了浏览器地址栏中的url
* React路由监听地址栏url的变化
* React路由内部遍历所有的Route组件，拿着Route里面path规则与pathname进行匹配
* 当路由规则（path）能够匹配地址栏中的pathname时，就展示该Route组件的内容

### 2.2 路由的执行过程示例

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const First = () => <p>页面一的内容</p>
const Home = () => <h2>这是Home组件的内容</h2>

const App = () => (
  <Router>
    <div>
      <h1>React路由基础</h1>
      <div>
        <Routes>
          <Route path="/first" component={First} />
          <Route path="/home" component={Home} />
        </Routes>
      </div>
      <Link to="/first">页面一</Link>
      <br />
      <Link to="/home">首页</Link>
    </div>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

## 三 编程式导航

### 3.1 编程式导航说明

* 场景：点击登录按钮，登录成功后，通过代码跳转到后台首页，如何实现？
* 编程式导航：<font color=red>通过 JS 代码来实现页面跳转</font>
* history 是 React 路由提供的，用于获取<font color=red>浏览器历史记录</font>的相关信息
* <font color=red>v5版本：push(path)</font>：跳转到某个页面，参数 path 表示要跳转的路径
* <font color=red>v5版本：go(n)</font>： 前进或后退到某个页面，参数 n 表示前进或后退页面数量（比如：-1 表示后退到上一页）

### 3.2 示例

V5版本

```
import React from 'react'
import ReactDOM from 'react-dom'

/* 
  编程式导航
*/

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Login extends React.Component {
  handleLogin = () => {
    // 使用编程式导航实现路由跳转
    // ...省略其他功能代码
    this.props.history.push('/home')
  }
  render() {
    return (
      <div>
        <p>登录页面：</p>
        <button onClick={this.handleLogin}>登录</button>
      </div>
    )
  }
}

const Home = props => {
  const handleBack = () => {
    // go(-1) 表示返回上一个页面
    props.history.go(-1)
  }
  return (
    <div>
      <h2>我是后台首页</h2>
      <button onClick={handleBack}>返回登录页面按钮</button>
    </div>
  )
}

const App = () => (
  <Router>
    <div>
      <h1>编程式导航：</h1>
      <Link to="/login">去登录页面</Link>

      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

V6版本

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/home')
  }

  return (
    <div>
      <p>登录页面</p>
      <button onClick={handleLogin}>登录</button>
    </div>
  )
}

const Home = (props) => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <h2>我是后台首页</h2>
      <button onClick={handleBack}>返回登录页面按钮</button>
    </div>
  )
}

const App = () => (
  <Router>
    <div>
      <h1>编程式导航：</h1>
      <Link to="/login">去登录页面</Link>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/home" element={<Home></Home>} />
      </Routes>
    </div>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

## 四 参考

* [CSDN—react v6 编程式导航](https://blog.csdn.net/sktt11/article/details/129181523)
* [React Router](https://reactrouter.com/en/main/upgrading/v5)
