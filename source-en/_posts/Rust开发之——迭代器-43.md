---
title: Rust开发之——迭代器(43)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: d0b5954e
date: 2025-09-06 09:05:33
---
## 一 概述

```
本文主要介绍了 Rust 中迭代器（Iterators）的概念、特性、用法及自定义实现，
迭代器是处理元素序列的强大工具，通过统一的接口简化了遍历逻辑
```

<!--more-->

## 二 迭代器的基本概念与特性

### 2.1 定义

```
迭代器是处理元素序列的工具，负责遍历序列中的每一项并判断序列结束的逻辑。
Rust 的迭代器是惰性的(lazy)，即创建后若不被使用（如通过方法消费），则不会产生任何效果。
```

### 2.2 创建方式

```
对集合（如Vec）调用方法生成迭代器：
 -iter()：生成不可变引用的迭代器（元素类型为&T）。
 -iter_mut()：生成可变引用的迭代器（元素类型为&mut T）。
 -into_iter()：生成获取元素所有权的迭代器（元素类型为T）。
```

## 三 Iterator trait 与核心方法

```
1、概念
所有迭代器都实现Iterator trait，其定义包含关联类型Item（迭代器返回元素的类型）
和唯一必须实现的方法next(&mut self) -> Option<Self::Item>：
next方法每次调用返回序列中的下一个元素（封装在Some中），序列结束时返回None。

2、示例
let v1 = vec![1, 2, 3];
let mut iter = v1.iter();
assert_eq!(iter.next(), Some(&1));  // 第一次调用返回第一个元素
assert_eq!(iter.next(), Some(&2));  // 第二次调用返回第二个元素
assert_eq!(iter.next(), Some(&3));
assert_eq!(iter.next(), None);      // 序列结束
```

## 四 迭代器的适配器类型

### 4.1 消费适配器(Consuming Adaptors)

```
1、概念
调用后会消耗迭代器（获取所有权），并返回一个结果。
常见方法：
  sum()：计算迭代器中所有元素的总和（要求元素实现Sum trait）
 
2、示例
let v1 = vec![1, 2, 3];
let total: i32 = v1.iter().sum();  // total = 6
```

### 4.2 迭代器适配器(Iterator Adaptors)

```
1、概念
生成新的迭代器（不直接消费原迭代器），因惰性特性，需配合消费适配器才能生效。
常见方法：
 map(|x| ...)：对每个元素应用闭包，生成新元素的迭代器。
 filter(|x| ...)：通过闭包过滤元素，仅保留闭包返回true的元素。
 
2、示例（使用map和collect）
let v1 = vec![1, 2, 3];
let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();  // v2 = [2, 3, 4]
```

## 五 迭代器与闭包的结合

```
1、概念
迭代器适配器常与闭包配合，利用闭包捕获环境的能力实现灵活逻辑。
例如，filter方法使用闭包过滤元素：

2、示例
#[derive(Debug)]
struct Shoe { size: u32, style: String }

// 过滤出指定尺寸的鞋子
fn shoes_in_my_size(shoes: Vec<Shoe>, size: u32) -> Vec<Shoe> {
    shoes.into_iter()
        .filter(|s| s.size == size)  // 闭包捕获环境中的size
        .collect()
}
```

## 六 自定义迭代器

### 6.1 自定义迭代器

```
1、说明
通过为结构体实现Iterator trait，可创建自定义迭代器，只需实现next方法，
即可复用 trait 提供的其他默认方法。

2、示例：Counter迭代器(生成 1~5 的序列)
struct Counter { count: u32 }

impl Counter {
    fn new() -> Self { Counter { count: 0 } }
}

// 实现Iterator trait
impl Iterator for Counter {
    type Item = u32;  // 关联类型：迭代器返回u32

    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;
        if self.count < 6 { Some(self.count) } else { None }
    }
}
```

### 6.2 使用自定义迭代器的其他方法

```
1、说明
实现next后，可使用zip、skip、map等默认方法

2、示例
let sum: u32 = Counter::new()
    .zip(Counter::new().skip(1))  // 配对(1,2), (2,3), (3,4), (4,5)
    .map(|(a, b)| a * b)         // 计算乘积：2, 6, 12, 20
    .filter(|x| x % 3 == 0)      // 保留能被3整除的：6, 12
    .sum();                      // 总和：18
```

## 七 总结

```
迭代器是 Rust 中处理序列的核心工具，通过Iterator trait 提供统一接口，支持灵活的遍历、转换和过滤操作。
其惰性特性确保高效性，而自定义迭代器则允许扩展到各种序列场景。
结合闭包和适配器方法，迭代器能简化代码并提高可读性，是函数式编程风格的重要体现。
```

## 八 参考

* [Rust中文官网—使用迭代器处理元素序列](https://rust.bootcss.com/ch13-02-iterators.html)