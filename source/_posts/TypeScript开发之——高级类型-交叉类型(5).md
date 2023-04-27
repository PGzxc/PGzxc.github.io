---
title: TypeScript开发之——高级类型-交叉类型(5)
categories:
  - 开发
  - C-前端开发
  - TypeScript
tags:
  - TypeScript
abbrlink: fbcbde59
date: 2023-04-27 12:49:10
---
## 一 概述

* 交叉类型
* 交叉类型（&）和接口继承（extends）的对比

<!--more-->

## 二 交叉类型

### 2.1 交叉类型

交叉类型（&）：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用于对象类型）

### 2.2 交叉类型示例代码

示例代码

```
interface Person {
    name: string
}
interface Contact {
    phone: string
}
type PersonDetail = Person & Contact

let obj: PersonDetail = {
    name: 'jack',
    phone: '123456789'
}
```

说明：

* 使用交叉类型后，新的类型 PersonDetail 就同时具备了 Person 和 Contact 的所有属性类型
* 相当于`type PersonDetail ={name:string,phone:string}`

## 三 交叉类型（&）和接口继承（extends）的对比

### 3.1 交叉类型（&）和接口继承（extends）的对比

* 相同点：都可以实现对象类型的组合
* 不同点：两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同

### 3.2 示例代码

示例代码——接口继承

```
interface A{
    fn:(value:number)=>string
}
interface B extends A{
    fn:(value:string)=>string
}
```

示例代码——交叉类型

```
interface A {
    fn: (value: number) => string
}
interface B {
    fn: (value: string) => string
}

type C = A & B

let c: C = {
    fn(value: number | string) {
        return ''
    }
}

c.fn(1)
c.fn('a')
```

说明：

* 以上代码，接口继承会报错（类型不兼容）
* 交叉类型没有错误，可以简单的理解为：`fn:(value:string|number)=>string`
