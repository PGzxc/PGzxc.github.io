---
title: Rust开发之——变量与常量(5)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: d4136cf1
date: 2025-06-26 12:03:05
---
## 一 概述

* 变量 let mut
* 常量const
* 使用let关键词多次隐藏

<!--more-->

## 二 变量 let mut

### 2.1 说明

```
Rust中通过let mut来声明一个变量
变量的值，可再次修改
```

### 2.2 示例

```
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

## 三 常量const

### 3.1 说明

```
Rust中通过const类声明常量
常量的值不能再次赋值
```

### 3.2 示例

```
const MAX_POINTS: u32 = 100_000;
```

### 四 使用let关键词多次隐藏

### 4.1 说明

```
Rust中将let声明的变量多次赋值的过程称为隐藏
```

### 4.2 示例

```
fn main() {
    let x = 5;

    let x = x + 1;

    let x = x * 2;

    println!("The value of x is: {}", x);
}
```

## 五 参考

* [Rust中文官网——变量与可变性](https://rust.bootcss.com/ch03-01-variables-and-mutability.html)