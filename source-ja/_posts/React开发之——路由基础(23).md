---
title: React开发之——路由基础(23)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 84b6b1f6
date: 2023-04-23 23:31:10
---
## 一 概述

* React路由介绍
* 路由的使用步骤
* 常用组件说明

<!--more-->

## 二  React路由介绍

### 2.1 React前端路由

* 现代的前端应用大多都是 <font color=red>SPA</font>（单页应用程序），也就是只有一个 HTML 页面的应用程序
* 因为它的用户体验更好、对服务器的压力更小，所以更受欢迎
* 为了有效的使用单个页面来管理原来多页面的功能，前端路由应运而生

### 2.2 路由说明

* 前端路由的功能：让用户从一个视图（页面）导航到另一个视图（页面）
* 前端路由是一套映射规则，在React中，是 <font color=red>URL路径</font> 与 <font color=red>组件</font> 的对应关系
* 使用React路由简单来说，就是配置 <font color=red>路径</font>和<font color=red>组件</font>（配对）

## 三 路由的使用步骤

### 3.1 安装react-router-dom

```
yarn add react-router-dom
```

### 3.2 导入路由组件

V5版本

```
import { BrowserRouter, Route, Link } from "react-router-dom"
```

V6版本

```
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
```

### 3.3 使用 Router 组件包裹整个应用

```
<Router>
    <div>
      <h1>React路由基础</h1>
    </div>
</Router>
```

### 3.4  使用 Link 组件作为导航菜单（路由入口）

```
<Link to="/first">页面一</Link>
```

### 3.5 使用 Route 组件配置路由规则和要展示的组件（路由出口）

V5版本

```
const First = () => <p>页面一的内容</p>

<Router>
    <div>
      <h1>React路由基础</h1>
      {/* 4 指定路由入口 */}
      <Link to="/first">页面一</Link>
        {/* 5 指定路由出口 */}
      <Route path="/first" component={First} />
    </div>
</Router>
```

V6版本

```
const First = () => <p>页面一的内容</p>

<Router>
    <div>
      <h1>React路由基础</h1>
      {/* 4 指定路由入口 */}
      <Link to="/first">页面一</Link>
      <Routes>
        <Route path="/first" element={<First />} />
      </Routes>
    </div>
</Router>
```

## 四 常用组件说明

### 4.1 Router组件

* 包裹整个应用，一个React应用只需要使用一次
* 两种常用的Router： HashRouter和BrowserRouter
* HashRouter： 使用URL的哈希值实现 （localhost:3000/#/first）
* 推荐 BrowserRouter：使用H5的history API实现（localhost3000/first）

### 4.2 Link组件

* 用于指定导航链接（a标签）
* 最终Link会编译成a标签，而to属性会被编译成 a标签的href属性

### 4.3 Route组件

* 指定路由展示组件相关信息
* path属性：路由规则，这里需要跟Link组件里面to属性的值一致
* component属性：展示的组件
* Route写在哪，渲染出来的组件就在哪

## 五 参考

* [CSDN—Error: A ＜Route＞ is only ever to be used as the child](https://blog.csdn.net/weixin_42150719/article/details/125803688)
* [NPM—React Router DOM](https://www.npmjs.com/package/react-router-dom)
