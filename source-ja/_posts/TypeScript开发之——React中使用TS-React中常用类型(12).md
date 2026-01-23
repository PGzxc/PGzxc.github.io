---
title: TypeScript开发之——React中使用TS-React中常用类型(12)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: 776860af
date: 2023-04-29 10:24:13
---
## 一 概述

* 常用类型介绍
* 函数组件
* class组件

<!--more-->

## 二 常用类型介绍

React 是组件化开发模式，React 开发主要任务就是写组件，两种组件：1 函数组件 2 class 组件

### 2.1 函数组件

* 组件的类型
* 组件的属性（props）
* 组件属性的默认值（defaultProps）
* 事件绑定和事件对象

### 2.2 class 组件

* 组件的类型、属性、事件
* 组件状态（state）

## 三 函数组件

### 3.1 组件和属性类型 

1-组件属性

```
type Props = { name: string; age?: number }
```

2-函数组件类型

```
const Hello: FC<Props> = ({ name, age }) => (
  <div>
    你好，我叫：{name},我{age}岁了
  </div>
)
```

3-调用Hello组件

```
<Hello name='rose' />
```

4-函数组件简化

```
const Hello = ({ name, age }:Props) => (
  <div>
    你好，我叫：{name},我{age}岁了
  </div>
)
```

### 3.2 组件属性的默认值（defaultProps）

1-为函数组件属性添加默认值(defaultProps)

```
type Props = { name: string; age?: number }
const Hello: FC<Props> = ({ name, age }) => (
  <div>
    你好，我叫：{name},我{age}岁了
  </div>
)

Hello.defaultProps ={
  name:'',
  age:18,
}
```

2-TS简化

```
const Hello = ({ name, age =20}:Props) => (
  <div>
    你好，我叫：{name},我{age}岁了
  </div>
)
```

### 3.3 事件和事件对象

1-按钮点击事件

```
<button onClick={onClick}>点赞</button>

const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('点击了', e.target)
}
```

2-文本输入事件

```
<input title='输入' onChange={onChange} />

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('点击了', e.target.value)
}
```

3-如何获取e的类型(如下图把鼠标放在e上)

```
<input title='title' onChange={e=>{}} />
```

## 四 class组件

### 4.1 组件类型

1-定义属性Props

```
type Props ={message?:string}
```

2-定义状态State

```
type State ={count:number}
```

3-class组件的几种类型

```
class C1 extends React.Component{} //无props无state
class C2 extends React.Component<Props>{} //有props无stae
class C3 extends React.Component<{},State>{} //无props有state
class C4 extends React.Component<Props,State>{} //有props，state
```

### 4.2 组件属性和默认值

1-属性和默认值(通过静态属性)

```
type Props = { name: string; age?: number }

class Hello extends React.Component<Props>{

  static defaultProps: Partial<Props> = {
    age: 18
  }

  render() {
    const { name, age } = this.props
    return <div>你好，我叫：{name}，我 {age} 岁了</div>
  }
}
```

2-属性和默认值(解构赋值)

```
type Props = { name: string; age?: number }

class Hello extends React.Component<Props>{

  render() {
    const { name, age = 20 } = this.props
    return <div>你好，我叫：{name}，我 {age} 岁了</div>
  }
}
```

### 4.3 状态和事件

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type State = { count: number }

class Counter extends React.Component<{}, State>{

  state: State = {
    count: 0
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return <div>计数器：{this.state.count}
      <button onClick={this.handleClick}>+1</button>
    </div>
  }
}

const App = () => (
  <div>
    <Counter />
  </div>
)


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
```

## 五 参考

* [类型检查](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)
* [React文档-静态类型检查](https://legacy.reactjs.org/docs/static-type-checking.html)
* [React+TS备忘单](https://github.com/typescript-cheatsheets/react)

