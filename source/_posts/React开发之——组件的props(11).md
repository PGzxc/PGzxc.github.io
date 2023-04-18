---
title: React开发之——组件的props(11)
categories:
  - 开发
  - C-前端开发
  - React
tags:
  - React
abbrlink: ca7021d5
date: 2023-04-18 10:19:55
---
## 一 概述

*  props概述
*  组件的props示例
*  组件的props特点

<!--more-->

## 二 props概述

* 组件是封闭的，要接收外部数据应该通过props 来实现
* props的作用：接收传递给组件的数据
* 传递数据：给组件标签添加属性
* 接收数据：函数组件通过参数props接收数据，类组件通过 this.props 接收数据

## 三 组件的props示例

### 3.1 传递数据

```
<Hello name="jack" age={19}/>
```

说明：

* 通过name，age属性传值

### 3.2 接受数据

#### 通过方法接受数据

代码

```
const Hello=(props)=>{
  console.log(props)
  return <div><h1>props:{props.name}</h1></div>
}
```

说明：

* 方法通过props接受数据
* 通过props.属性名赋值

#### 通过类接受数据

代码：

```
class Hello extends React.Component{
  render(){
    return <div><h1>props:{this.props.name}</h1></div>
  }
}
```

说明：

* 类中通过this.props接受数据
* 通过this.props.属性名赋值

## 四 组件的props特点

### 4.1 props传递数据的类型

可以给组件传递任意类型的数据，如

* 数组：`<Hello  colors={['red','green','blue']} />`
* 函数：`<Hello fn={()=>console.log('这是函数')} />`
* 元素：`<Hello tag={<p>这是P标签</p>} />`

### 4.2 props 是只读的对象，只能读取属性的值，无法修改对象

当给name属性重新赋值时，会出现错误

```
this.props.name='rose'
```

错误信息如下

```
Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```

### 4.3 使用类组件时，如果写了构造函数，应该将 props 传递给 super()，否则，无法在构造函数中获取到 props！

1-未将props传递给super时

```
class Hello extends React.Component {
  constructor(){
    super()
    console.log(this.props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>props:{this.props.name}</h1>
        {this.props.tag}
      </div>
    )
  }
}
```

说明：

* constructor构造方法中的this.props为undefined
* render方法中的this.props已赋值

2-将props传递给super时

```
class Hello extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>props:{this.props.name}</h1>
        {this.props.tag}
      </div>
    )
  }
}
```

说明：

* constructor构造方法中的this.props和render方法中的this.props均已赋值

