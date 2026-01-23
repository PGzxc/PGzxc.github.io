---
title: React开发之——setState方法说明(18)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: df3a21bd
date: 2023-04-22 23:52:00
---
## 一 概述

*  setState()是异步更新数据的
*  setState推荐语法
*  setState()第二个参数

<!--more-->

## 二  setState()是异步更新数据的

### 2.1 使用说明

* <font color=red>setState()</font> 是<font color=red>异步</font>更新数据的
*  注意：使用该语法时，后面的 setState() 不要依赖于前面的 setState()
* 可以多次调用 setState() ，只会触发一次重新渲染

### 2.2 示例

setState代码

```
handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
    console.log('count：', this.state.count) // 1
    this.setState({
      count: this.state.count + 1 // 1 + 1
    })
    console.log('count：', this.state.count) // 1
 }
```

打印结果

```
count:1
count:1
```

## 三 setState推荐语法

### 3.1 使用说明

* 推荐：使用 setState((state, props) => {}) 语法
* 参数state：表示最新的state
*  参数props：表示最新的props

### 3.2 示例代码

setState((state,props)=>{})代码

```
handleClick = () => {
    this.setState((state, props) => {
      return {
        count: state.count + 1 // 1 + 1
      }
    })
    this.setState((state, props) => {
      console.log('第二次调用：', state)
      return {
        count: state.count + 1
      }
    })
    console.log('count：', this.state.count) // 1
 }
```

显示结果

```
计算器：3
```

## 四 setState()第二个参数

### 4.1 使用说明

* 场景：在状态更新（页面完成重新渲染）后立即执行某个操作
* 语法： <font color=red>setState(updater[, callback])</font>

### 4.2 示例代码

第二个参数代码

```
handleClick = () => {
    this.setState(
      (state, props) => {
        return {
          count: state.count + 1
        }
      },
      () => {
        console.log('状态更新完成：', this.state.count) // 2
        console.log(document.getElementById('title').innerText)
        document.title = '更新后的count为：' + this.state.count
      }
    )
    console.log(this.state.count) // 1
 } 
```

打印结果

```
状态更新完成： 2
计数器：2
```

