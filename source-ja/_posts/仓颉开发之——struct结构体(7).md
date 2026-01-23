---
title: 仓颉开发之——struct结构体(7)
categories:
  - 开发
  - B-高级语言
  - 仓颉
tags:
  - 仓颉
abbrlink: 5da05413
date: 2024-08-12 11:55:15
---
## 一 概述

* 定义struct类型
* 创建struct实例
* mut函数

<!--more-->

## 二 定义struct类型

### 2.1 struct定义

```
struct Rectangle {
    let width: Int64
    let height: Int64

    public init(width: Int64, height: Int64) {
        this.width = width
        this.height = height
    }

    public func area() {
        width * height
    }
}
```

说明：

* struct 类型的定义以关键字 struct 开头，后跟 struct 的名字，接着是定义在一对花括号中的 struct 定义体
* struct 定义体中可以定义一系列的成员变量、成员属性（参见[属性](https://developer.huawei.com/consumer/cn/doc/openharmony-cangjie/prop)）、静态初始化器、构造函数和成员函数。

### 2.2 struct 成员变量

```
struct Rectangle {
    let width: Int64
    var height: Int64
    static let maxArea = 100
   } 
```

说明：

* width：不可变成员变量
* height：可变成员变量
* maxArea：静态成员变量

### 2.3 struct 静态初始化器( static init )

```
struct Rectangle {
    static let degree: Int64
    static init() {
        degree = 180
    }
}
```

说明：

* 静态初始化器以关键字组合 static init 开头
* 用来对静态成员变量进行初始化

### 2.4 struct 构造函数

1-普通构造函数(init开头)

```
struct Rectangle {
    let width: Int64
    let height: Int64

    public init(width: Int64) {
        this.width = width
        this.height = width
    }

    public init(width: Int64, height: Int64) { // Ok: overloading
        this.width = width
        this.height = height
    }

    public init(height: Int64) { // Error, redefinition 
        this.width = height
        this.height = height
    }
}
```

2-主构造函数

```
struct Rectangle {
    public Rectangle(name: String, let width: Int64, let height: Int64) {}
}
```

说明：

* 主构造函数的参数列表中也可以定义普通形参(name)
* struct 中不存在自定义构造函数（包括主构造函数），并且所有实例成员变量都有初始值，则会自动为其生成一个无参构造函数

### 2.5 struct 成员函数

```
struct Rectangle {
    let width: Int64 = 10
    let height: Int64 = 20

    public func area() {
        this.width * this.height
    }

    public static func typeName(): String {
        "Rectangle"
    }
}
```

说明：

* area 是实例成员函数，typeName 是静态成员函数
* 实例成员函数中可以通过 this 访问实例成员变量

### 2.6 struct 成员的访问修饰符

|  No  |  修饰符   |                             说明                             |
| :--: | :-------: | :----------------------------------------------------------: |
|  1   |  private  |                     在 struct 定义内可见                     |
|  2   | internal  | 仅当前包及子包（包括子包的子包，详见[包](https://developer.huawei.com/consumer/cn/doc/openharmony-cangjie/toplevel_access)章节）内可见 |
|  3   | protected | 当前模块（详见[包](https://developer.huawei.com/consumer/cn/doc/openharmony-cangjie/toplevel_access)章节）可见 |
|  4   |  public   |                        模块内外均可见                        |

### 2.7 禁止递归 struct

```
struct R1 { // Error, 'R1' recursively references itself
    let other: R1
}
struct R2 { // Error, 'R2' and 'R3' are mutually recursive
    let other: R3
}
struct R3 { // Error, 'R2' and 'R3' are mutually recursive
    let other: R2
}
```

说明：递归和互递归定义的 struct 均是非法的

## 三 创建struct实例

### 3.1 创建实例

```
let r = Rectangle(10, 20)
```

### 3.2 实例变量访问

```
let width = r.width   // width = 10
let height = r.height // height = 20
let a = r.area()      // a = 200
```

### 3.3 实例变量赋值(let变量改为var变量)

```
struct Rectangle {
    public var width: Int64
    public var height: Int64

    public init(width: Int64, height: Int64) {
        this.width = width
        this.height = height
    }

    public func area() {
        width * height
    }
}

main() {
    var r = Rectangle(10, 20) // r.width = 10, r.height = 20
    r.width = 8               // r.width = 8
    r.height = 24             // r.height = 24
    let a = r.area()          // a = 192
}
```

## 四 mut 函数

### 4.1 何谓mut函数

```
struct Foo {
    var i = 0

    public func g() {
        i += 1  // Error, the value of a instance 
    }
}
```

说明：

* struct 类型是值类型，其实例成员函数无法修改实例本身
* 成员函数 g 中不能修改成员变量 i 的值，会出错
* mut 函数是一种可以修改 struct 实例本身的特殊的实例成员函数，在 mut 函数内部拥有原地修改字段的能力

### 4.2 mut 函数定义

```
struct Foo {
    var i = 0

    public mut func g() {
        i += 1  // ok
    }
}
```

说明：

* 增加 mut 修饰符之后，即可在函数体内修改成员变量 i 的值
* mut 只能修饰实例成员函数，不能修饰静态成员函数。
* mut 函数中的 this 不能被捕获，也不能作为表达式。不能在 mut 函数中对 struct 的实例成员变量进行捕获

## 五 思维导图

![][1]

## 六 参考

* [仓颉官方文档](https://developer.huawei.com/consumer/cn/doc/openharmony-cangjie/define_struct)
* [仓颉编程语言入门教程](https://developer.huawei.com/consumer/cn/training/course/slightMooc/C101718903607800132)

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/cangjie-xmind-4-struct.png