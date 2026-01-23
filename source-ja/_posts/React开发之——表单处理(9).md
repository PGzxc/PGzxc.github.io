---
title: React开发之——表单处理(9)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: 1ce8919a
date: 2023-04-17 18:27:54
---
## 一 概述

*  受控组件和非受控组件(DOM方式)概念
*  受控组件示例
*  多表单元素优化
*  非受控组件示例

<!--more-->

## 二  受控组件和非受控组件(DOM方式)概念

### 2.1 受控组件

图示

![][1]

说明：

* HTML 中的表单元素是可输入的，也就是有自己的可变状态
* 而，React 中可变状态通常保存在 state 中，并且只能通过 setState() 方法来修改
* React将 state 与表单元素值value绑定到一起，<font color=red>由 state 的值来控制表单元素的值</font>
* 受控组件：其值受到 React 控制的表单元素

### 2.2 非受控组件(DOM方式)

*  说明：借助于 ref，使用原生 DOM 方式来获取表单元素值
*  ref 的作用：获取 DOM 或组件

## 三 受控组件示例

### 3.1 input文本框

代码

```
class App extends React.Component {
  state = {
    txt: ''
  }
  handleTxt = (e) => {
    this.setState({
      txt: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.txt} onChange={this.handleTxt} />
      </div>
    )
  }
}
```

效果图

![][2]

### 3.2 textarea富文本框

代码

```
class App extends React.Component {
  state = {
    areatxt: ''
  }
  handleAreaTxt = (e) => {
    this.setState({
      areatxt: e.target.value
    })
  }

  render() {
    return (
      <div>
        <textarea value={this.state.areatxt} onChange={this.handleAreaTxt}></textarea>
      </div>
    )
  }
}
```

### 3.3 select下拉框

代码

```
class App extends React.Component {
  state = {
    city: ''
  }
  handleCity = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  render() {
    return (
      <div>
        <select value={this.state.city} onChangeCapture={this.handleCity}>
          <option value="sh">上海</option>
          <option value="bj"> 北京</option>
          <option value="gz">广州</option>
        </select>
      </div>
    )
  }
}
```

### 3.4 复选框

```
class App extends React.Component {
  state = {
    isChecked: false
  }
  handleChecked = (e) => {
    this.setState({
      isChecked: e.target.checked
    })
  }
  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChecked} />
      </div>
    )
  }
}
```

## 四 多表单元素优化

### 4.1 优化说明

* 给表单元素添加name属性，名称与 state 相同
* 根据表单元素类型获取对应值
* 在 change 事件处理程序中通过 [name] 来修改对应的state

### 4.2 优化代码

```
class App extends React.Component {
  state = {
    txt: '',
    areatxt: '',
    city: '',
    isChecked: false
  }
  handleChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <input name="txt" type="text" value={this.state.txt} onChange={this.handleChange} />
        <br />
        <textarea name="areatxt" value={this.state.areatxt} onChange={this.handleChange}></textarea>
        <br />
        <select name="city" value={this.state.city} onChangeCapture={this.handleChange}>
          <option value="sh">上海</option>
          <option value="bj"> 北京</option>
          <option value="gz">广州</option>
        </select>
        <br />
        <input name="isChecked" type="checkbox" checked={this.state.isChecked} onChange={this.handleChange} />
      </div>
    )
  }
}
```

## 五 非受控组件示例

### 5.1 使用步骤

*  调用 React.createRef() 方法创建一个 ref 对象
* 将创建好的 ref 对象添加到文本框中
* 通过 ref 对象获取到文本框的值

### 5.2 示例代码

```
class App extends React.Component {
  constructor() {
    super()
    this.txtRef = React.createRef()
  }
  getTxt = () => {
    console.log('文本框的值为：', this, this.txtRef.current.value)
  }
  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef} />
        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img9-react-state.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-react/react-day1-img9-input-text.png