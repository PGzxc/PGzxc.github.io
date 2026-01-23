---
title: Rust开发之——泛型(30)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: e25d6682
date: 2025-08-12 11:35:23
---
## 一 概述

* 泛型的核心概念与优势
* 泛型函数
* 泛型结构体
* 泛型枚举
* 泛型方法
* 类型参数命名约定
* 泛型与单态化

<!--more-->

## 二 泛型的核心概念与优势

### 2.1 定义

```
泛型是一种使用类型参数（Type Parameters）编写可复用代码的机制，
类似其他语言的 “模板”，但通过 Rust 的类型系统在编译时确保安全。
```

### 2.2 优势

```
代码复用：避免为不同类型重复实现相同逻辑（如排序函数可用于 i32、String 等）。
类型安全：编译器在编译时检查类型一致性，避免运行时类型错误。
```

## 三 泛型函数

### 3.1 语法格式

```
在函数名后用尖括号声明类型参数，可在参数和返回值中使用
类型约束：T: PartialOrd表示 T 需实现PartialOrd trait（支持部分排序）
fn largest<T: PartialOrd>(list: &[T]) -> T {
    let mut largest = list[0];
    for &item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

### 3.2 调用示例

```
let number_list = vec![34, 50, 25, 100, 65];
let result = largest(&number_list);  // T推导为i32

let char_list = vec!['y', 'm', 'a', 'q'];
let result = largest(&char_list);     // T推导为char
```

## 四 泛型结构体

### 4.1 定义方式

```
在结构体名称后声明类型参数，可用于字段类型：
特性：字段类型需一致（均为 T），但可通过多个类型参数支持不同类型（如Point<T, U>）
struct Point<T> {
    x: T,
    y: T,
}
```

### 4.2 实例化与使用

```
let integer = Point { x: 5, y: 10 };      // T为i32
let float = Point { x: 1.0, y: 4.0 };     // T为f64
```

## 五 泛型枚举

```
1、枚举中的泛型成员
枚举成员可包含泛型数据，如标准库的Option<T>：

enum Option<T> {
    Some(T),
    None,
}

2、其他示例
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

## 六 泛型方法

### 6.1 在impl块中定义泛型方法

```
为泛型结构体添加方法时，需在impl后声明类型参数：

struct Point<T> { x: T, y: T }
impl<T> Point<T> {
    fn x(&self) -> &T { &self.x }
    fn y(&self) -> &T { &self.y }
}
```

### 6.2 方法特化

```
可针对特定类型实现方法（Rust 1.31 + 部分支持）
impl Point<f32> {
    fn distance_to_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

## 七 类型参数命名约定

```
单字母大写：常用T（Type）、U、V等，如Vec<T>、HashMap<K, V>。
描述性命名：复杂场景可使用如Key、Value、Iterator等有意义的名称
```

##  八 泛型与单态化

```
编译期处理：Rust 通过单态化将泛型代码实例化为具体类型的代码，避免运行时开销。
本质：泛型是编译时概念，生成的机器码中无泛型痕迹，仅包含具体类型的实现。
```

## 九 参考

* [Rust中文官网——泛型数据类型](https://rust.bootcss.com/ch10-01-syntax.html)