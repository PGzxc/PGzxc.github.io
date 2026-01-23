---
title: Rust开发之——方法语法(15)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: c88f4a87
date: 2025-07-07 08:54:55
---
## 一 概述

* 方法与函数的核心区别
* 方法语法与自动引用机制
* 带参数的方法与关联函数
* impl块的特性

<!--more-->

## 二 方法与函数的核心区别

### 2.1 定义上下文

```
1、概念
方法在结构体（或枚举、trait）的impl（implementation）块中定义，
首个参数为self，代表调用方法的实例。

2、示例：将函数area改写为方法：

struct Rectangle { width: u32, height: u32 }
impl Rectangle {
    fn area(&self) -> u32 { self.width * self.height }
}
let rect = Rectangle { width: 30, height: 50 };
println!("面积: {}", rect.area());  // 方法语法：实例.方法()
```

### 2.2 self参数的三种形式

```
- &self：不可变借用（默认，仅读取实例数据）。
- &mut self：可变借用（修改实例数据）。
- self：获取实例所有权（适用于方法将实例转换为其他类型时）。
```

## 三 方法语法与自动引用机制

### 3.1 方法调用语法

```
-格式：实例.方法名(参数)，如rect.area()。
-等价于手动引用：(&rect).area()（Rust 自动处理引用和解引用）
```

### 3.2 自动引用原理

```
-当调用方法时，Rust 根据self的类型自动添加&、&mut或*，避免手动解引用。
-示例：p1.distance(&p2)与(&p1).distance(&p2)等效。
```

## 四 带参数的方法与关联函数

### 4.1 多参数方法

```
1、概念
除self外可添加其他参数，如判断矩形包含关系的can_hold方法：

2、示例
impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
let rect1 = Rectangle { width: 30, height: 50 };
println!("是否包含？{}", rect1.can_hold(&rect2));
```

### 4.2 关联函数（Associated Functions）

```
1、概念
定义在impl块中，无self参数，通过结构体名::函数名调用。

2、用途：
作为构造函数（如创建正方形矩形）：

2、示例
impl Rectangle {
    fn square(size: u32) -> Rectangle {  // 关联函数
        Rectangle { width: size, height: size }
    }
}
let sq = Rectangle::square(3);  // 调用方式
```

## 五 impl块的特性

### 5.1 单结构体多impl块

```
1、说明
允许为同一个结构体定义多个impl块（如分离不同功能）：

2、示例
impl Rectangle { fn area(...) { ... } }
impl Rectangle { fn can_hold(...) { ... } }
```

### 5.2 组织代码优势

```
将结构体相关的所有行为集中在impl块中，提升代码可读性与维护性。
```

## 六 参考

* [Rust中文官网——方法语法](https://rust.bootcss.com/ch05-03-method-syntax.html)