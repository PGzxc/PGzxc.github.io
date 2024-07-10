---
title: React开发之——默认路由及匹配(25)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 65ab8326
date: 2023-04-24 10:17:55
---
## 一 概述

* 默认路由
* 匹配模式

<!--more-->

## 二  默认路由

### 2.1 默认路由

* 问题：现在的路由都是点击导航菜单后展示的，如何在进入页面的时候就展示呢？
* 默认路由：表示进入页面时就会匹配的路由
* 默认路由path为：/

### 2.2 默认路由示例

V5版本

```
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <p>进入页面的时候，你能看到我吗？</p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <Route path="/" component={Home} />
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

const Home = () => <p>进入页面的时候，你能看到我吗？</p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

## 三 匹配模式

### 3.1 模糊匹配模式(V5版本)

#### 模糊匹配说明

* 当Link组件的to属性值为 '/login' 时候，为什么默认路由也被匹配成功？
* 默认情况下，React路由是模糊匹配模式
* 模糊匹配规则：只要pathname以path开头就会匹配成功

#### 模糊匹配图示

![][1]

#### 模糊匹配代码(V5版本)

```
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <p>进入页面的时候，你能看到我吗？</p>
const Login = () => <p>我是Login组件的内容</p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <Link to="/first/a/b/c">登录页面</Link>

      <Route path="/" component={Home} />
      <Route path="/first" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

### 3.2 精确匹配

#### 精确匹配说明

* 默认路由认可情况下都会展示，如果避免这种问题？
* 给Route组件添加exact属性，让其变为**精准匹配模式**
* 精确匹配：只有当path和pathname完全匹配时才会展示改路由

#### 精确匹配代码

V5版本

```
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <p>进入页面的时候，你能看到我吗？</p>
const Login = () => <p>我是Login组件的内容</p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/login">登录页面</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
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

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Home = () => <p>我是Home组件的内容</p>
const Login = () => <p>我是Login组件的内容</p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <Link to="/first">登录页面</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/first" element={<Login />} />
      </Routes>
    </div>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day5-img25-mohu-match.png