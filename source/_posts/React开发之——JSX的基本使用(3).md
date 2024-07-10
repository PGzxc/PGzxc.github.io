---
title: React开发之——JSX的基本使用(3)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: a2dfbfae
date: 2023-04-16 12:26:04
---
## 一 概述

* createElement() 的问题
* JSX 简介
* JSX使用步骤
* JSX总结

<!--more-->

## 二  createElement() 的问题

### 2.1 createElement()与JSX比较

![][1]

### 2.2 createElement() 的问题

* 繁琐不简洁
* 不直观，无法一眼看出所描述的结构
* 不优雅，用户体验不爽

## 三 JSX简介

* <font color=red>JSX</font> 是 <font color=red>JavaScript XML</font> 的简写，表示在 JavaScript 代码中写 XML（HTML） 格式的代码
* 优势：声明式语法更加直观、与HTML结构相同，降低了学习成本、提升开发效率
* <font color=red>JSX 是 React 的核心内容</font>

## 四 JSX使用步骤

### 3.1 使用 JSX 语法创建 react 元素

```
const title =<h1>Hello React</h1>
```

### 3.2 使用 render() 方法渲染 react 元素到页面中

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  title
);
```

## 五 JSX总结

### 5.1 JSX小结

* 推荐使用JSX语法创建React元素
* 写JSX就跟写HTML一样，更加直观、友好
* JSX语法更能体现React的声明式特点（描述UI长什么样子）

### 5.2 为什么脚手架中可以使用 JSX 语法

* JSX 不是标准的 ECMAScript 语法，它是 ECMAScript 的语法扩展
* 需要使用 babel 编译处理后，才能在浏览器环境中使用
* create-react-app 脚手架中已经默认有该配置，无需手动配置
* 编译 JSX 语法的包为：@babel/preset-react 

### 5.3 注意点

* React元素的属性名使用驼峰命名法

* 特殊属性名：class -> <font color=red>className</font>、for -> htmlFor、tabindex -> tabIndex 

* 没有子节点的React元素可以用 /> 结束

* 推荐：使用<font color=red>小括号包裹 JSX</font> ，从而避免 JS 中的自动插入分号陷阱

  ```
  //使用小括号包裹JSX
  const div=(
    <div>Hello JSX</div>
  )
  ```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img3-createelement-problem.png
