---
title: Rust开发之——结构体示例(14)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: aecd9e69
date: 2025-07-06 09:32:58
---
## 一 概述

```
本文以:通过一个计算矩形面积的程序示例，
展示了如何从基础变量逐步重构为结构体，并通过派生 trait 增强功能
```

<!--more-->

## 二 使用独立变量

```
1、示例

fn main() {
    let width1 = 30;
    let height1 = 50;
    println!("面积: {}", area(width1, height1));
}
fn area(width: u32, height: u32) -> u32 { width * height }


2、问题
宽和高作为独立变量，缺乏结构性，无法体现二者的关联性。
```

## 三 使用元组

```
1、示例

fn main() {
    let rect1 = (30, 50);
    println!("面积: {}", area(rect1));
}
fn area(dimensions: (u32, u32)) -> u32 { dimensions.0 * dimensions.1 }


2、优缺点
-优点：用元组组合宽高，减少参数数量。
-缺点：依赖索引访问（如.0），字段无命名，可读性差，易混淆宽高顺序。
```

## 四 使用结构体

```
1、定义结构体

struct Rectangle {
    width: u32,
    height: u32,
}


2、调用示例

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("面积: {}", area(&rect1));  // 传递引用避免所有权转移
}
fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}


3、优势
-字段命名明确（width/height），代码意图清晰。
-通过引用（&Rectangle）传递实例，保持调用方的所有权。
```

## 五 派生 Debug trait 实现调试打印

### 5.1 未派生时的错误

```
-尝试直接打印结构体：println!("rect1 is {}", rect1);
-错误信息：Rectangle doesn't implement Display/Debug。
```

### 5.2 解决方案

```
1、添加#[derive(Debug)]注解并使用调试格式：

#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }
fn main() { println!("rect1 is {:?}", rect1); }  // 输出：Rectangle { width: 30, height: 50 }


2、美化格式（{:#?}）：

println!("rect1 is {:#?}", rect1);  // 换行缩进输出字段
```

### 5.3 Debug trait 作用

```
-提供开发者友好的输出格式，用于调试时查看结构体字段值。
-Rust 内置多种可派生 trait（如Debug），通过#[derive]快速添加功能。
```

## 六 参考

* [Rust中文官网——一个使用结构体的示例程序](https://rust.bootcss.com/ch05-02-example-structs.html)