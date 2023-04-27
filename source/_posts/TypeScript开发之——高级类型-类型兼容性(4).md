---
title: TypeScript开发之——高级类型-类型兼容性(4)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: 3ee1d8e7
date: 2023-04-27 12:48:12
---
## 一 概述

* 两种类型系统
* 类型兼容示例
* 接口兼容性
* 函数兼容性

<!--more-->

## 二 两种类型系统

### 2.1 两种类型系统

两种类型系统：

1. Structural Type System（结构化类型系统） 
2.  Nominal Type System（标明类型系统）

系统类型说明

* TS 采用的是结构化类型系统，也叫做 duck typing（鸭子类型），类型检查关注的是值所具有的形状
* 也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型

### 2.2 结构化类型实例

示例代码

```
class Point {
    x: number
    y: number
}
class Point2D {
    x: number
    y: number
}
const p: Point = new Point2D()
```

说明：

* Point 和 Point2D 是两个名称不同的类
* 变量 p 的类型被显示标注为 Point 类型，但是，它的值却是 Point2D 的实例，并且没有类型错误
* 因为 TS 是结构化类型系统，只检查 Point 和 Point2D 的结构是否相同（相同，都具有 x 和 y 两个属性，属性类型也相同）
* 但是，如果在 Nominal Type System 中（比如，C#、Java 等），它们是不同的类，类型无法兼容

## 三 类型兼容示例

### 3.1 类型兼容说明

* 在结构化类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型，这种说法并不准确
* 更准确的说法：对于对象类型来说，y 的成员至少与 x 相同，则 x 兼容 y（成员多的可以赋值给少的）

### 3.2 类型兼容示例演示

示例代码

```
class Point {
    x: number
    y: number
}
class Point2D {
    x: number
    y: number
}
const p: Point = new Point2D()

class Point3D {
    x: number
    y: number
    z: number
}
const p1: Point = new Point3D()

//错误
const p2: Point3D = new Point()
```

说明：

* Point3D 的成员至少与 Point 相同，则 Point 兼容 Point3D
* 所以，成员多的 Point3D 可以赋值给成员少的 Point

## 四 接口兼容性

### 4.1 接口与接口之间兼容

示例代码

```
interface Point {
    x: number
    y: number
}
interface Point2D {
    x: number
    y: number
}
interface Point3D {
    x: number
    y: number
    z: number
}

let p1: Point
let p2: Point2D
let p3: Point3D

p1 = { x: 1, y: 2 }
p3 = { x: 1, y: 2, z: 3 }
// 正确：
p2 = p1
p1 = p2
p1 = p3

// 错误演示：
// p3 = p1
```

说明：接口之间的兼容性，类似于 class

### 4.2 接口与class之间兼容

示例代码

```
class Point4D {
    x: number
    y: number
    z: number
}
p2 = new Point4D()
```

说明：class 和 interface 之间也可以兼容

## 五 函数兼容性

函数之间兼容性比较复杂，需要考虑：1 参数个数 2 参数类型 3 返回值类型

### 5.1 函数兼容性—参数个数

```
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void

let f1: F1
let f2: F2

f1 = function (num: number) {
    console.log(num)
}
//正确
f2 = f1
//错误
f1 = f2

const arr=['a','b','c']
arr.forEach(()=>{})
arr.forEach((item)=>{})
```

说明：

* 参数个数，参数多的兼容参数少的（或者说，参数少的可以赋值给多的）
* 参数少的可以赋值给参数多的，所以，f1 可以赋值给 f2
* 组 forEach 方法的第一个参数是回调函数，该示例中类型为：(value: string, index: number, array: string[]) => void
* 在 JS 中省略用不到的函数参数实际上是很常见的，这样的使用方式，促成了 TS 中函数类型之间的兼容性
* 并且因为回调函数是有类型的，所以，TS 会自动推导出参数 item、index、array 的类型

### 5.2  函数兼容性—参数类型

```
interface Point2D {
    x: number
    y: number
}
interface Point3D {
    x: number
    y: number
    z: number
}

type F2 = (p: Point2D) => void //相当于有2个参数
type F3 = (p: Point3D) => void //相当于有3个参数

let f2: F2
let f3: F3

f2 = function(p:Point2D){}

//正确
f3 = f2
//错误
f2=f3
```

说明：

* 参数类型，相同位置的参数类型要相同（原始类型）或兼容（对象类型）
* 注意，此处与前面讲到的接口兼容性冲突
* 技巧：将对象拆开，把每个属性看做一个个参数，则，参数少的（f2）可以赋值给参数多的（f3）

### 5.3 函数兼容性—返回值类型

```
//原始类型
type F5=()=>string
type F6=()=>number

let f5:F5
let f6:F6

f5=function(){return "str"}
f6=function(){return 1}

//错误
//f6=f5
//f5=f6

//对象类型
type F7=()=>{name:string}
type F8=()=>{name:string;age:number}

let f7:F7
let f8:F8

f7=function(){return {name:'zhangsan'}}
f8=function(){return {name:'lisi',age:18}}

//正确
f7=f8
//错误
f8=f7
```

说明：

* 返回值类型，只关注返回值类型本身即可
* 如果返回值类型是原始类型，此时两个类型要相同，比如，左侧类型 F5 和 F6
* 如果返回值类型是对象类型，此时成员多的可以赋值给成员少的，比如，右侧类型 F7 和 F8