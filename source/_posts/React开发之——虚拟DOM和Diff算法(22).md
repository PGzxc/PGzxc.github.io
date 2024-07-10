---
title: React开发之——虚拟DOM和Diff算法(22)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 9b061bad
date: 2023-04-23 17:51:04
---
## 一 概述

* React如何实现局部更新
* 虚拟 DOM本质
* 虚拟 DOM执行过程
* 虚拟 DOM代码演示

<!--more-->

## 二  React如何实现局部更新

* React 更新视图的思想是：只要 state 变化就重新渲染视图
* 特点：思路非常清晰
* 问题：组件中只有一个 DOM 元素需要更新时，也得把整个组件的内容重新渲染到页面中？不是
* 理想状态：<font color=red>部分更新</font>，只更新变化的地方
* 问题：React 是如何做到部分更新的？<font color=red>虚拟 DOM 配合 Diff 算法</font>

## 三 虚拟 DOM本质

本质上就是一个 JS 对象，用来描述你希望在屏幕上看到的内容（UI）

![][1]

## 四 虚拟 DOM执行过程

### 4.1 过程描述

* 初次渲染时，React 会根据初始state（Model），创建一个<font color=red>虚拟 DOM 对象（树）</font>
* 根据虚拟 DOM 生成真正的 DOM，渲染到页面中
* 当数据变化后（setState()），重新根据新的数据，创建新的虚拟DOM对象（树）
* 与上一次得到的虚拟 DOM 对象，使用 <font color=red>Diff 算法</font> 对比（找不同），得到需要更新的内容
* 最终，React 只将<font color=red>变化的内容</font>更新（patch）到 DOM 中，重新渲染到页面

### 4.2 过程示意图

![][2]

## 五 虚拟 DOM代码演示

### 5.1 代码

1-JSX

```
<div>
     <h1>随机数：</h1>
     <p>{this.state.number}</p>
      <button onClick={this.handleClick}>重新生成</button>
</div>
```

2-DOM描述

```
{
  type: 'div',
  props: {
   children: [
     { type: 'h1', props: {children: '随机数'} },
     { type: 'p', props: {children: 0} }
     ]
   }
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day4-img22-virtual-dom.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day4-img22-diff-dom.png