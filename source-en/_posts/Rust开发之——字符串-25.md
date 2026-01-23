---
title: Rust开发之——字符串(25)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: c4098624
date: 2025-07-22 07:45:21
---
## 一 概述

* String 的基本概念与创建
* String 的基本操作
* 字符串的遍历方式
* String 的内存与安全性

<!--more-->

## 二 String 的基本概念与创建

### 2.1 与字符串字面值的区别

```
1、字符串字面值（&str）：
不可变，存储于二进制文件，类型为&str。

2、String 类型：
可变，存储于堆，可动态修改内容，类型为String。
```

### 2.2 创建方式

```
1、String::from()：从字符串字面值或其他类型转换
let s = String::from("hello");  // 从字面值创建
let s = String::from(vec![b'h', b'e', b'l', b'l', b'o']);  // 从字节向量创建

2、to_string()方法：从实现Display trait 的类型转换：
let num = 123;
let s = num.to_string();  // "123"
```

## 三 String 的基本操作

### 3.1 修改字符串

```
1、push()：添加单个字符（类型为char）：
let mut s = String::from("hello");
s.push('w');  // "hellow"

2、push_str()：添加字符串切片（&str）：
s.push_str(", world");  // "hellow, world"

3、容量与增长：
String 自动管理内存，扩容时复制数据并释放旧内存。
```

### 3.2 拼接字符串

```
1、+运算符：拼接两个 String，右操作数转为字符串切片
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2;  // "Hello, world!"，s1所有权转移至s3

2、format!宏：更灵活的拼接，不转移所有权：
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");
let s = format!("{}-{}-{}", s1, s2, s3);  // "tic-tac-toe"
```

### 3.3 字节、标量值与字符的区别

```
-字节（Byte）：String 本质是Vec<u8>，存储 UTF-8 编码的字节序列。
-标量值（Scalar Value）：Unicode 代码点（如U+0048对应 'H'）。
-字符（char）：Rust 的char类型表示 Unicode 标量值，占 4 字节，如'é'对应U+00E9。
```

## 四 字符串的遍历方式

### 4.1 按字节遍历

```
直接遍历 String 或&str，获取每个 UTF-8 字节：

let s = String::from("Héllo");
for b in s.bytes() {
    println!("{}", b);  // 输出每个字节的数值
}
```

### 4.2 按字符遍历

```
使用chars()方法获取char类型，正确处理 Unicode 字符：

for c in s.chars() {
    println!("{}", c);  // 正确输出'H', 'é', 'l', 'l', 'o'
}
```

### 4.3 按 UTF-8 码点遍历

```
手动处理 UTF-8 编码，适用于底层操作：

let s = "Здравствуйте";
for i in 0..s.len() {
    let char = &s[i..i+1];  // 错误：可能切到UTF-8字符中间
}
警告：直接通过索引访问字符串可能导致非法 UTF-8 序列，Rust 不允许这种操作
```

## 五 String 的内存与安全性

### 5.1 UTF-8 编码保证

```
Rust 的 String 和&str始终是有效的 UTF-8 序列，编译时检查非法编码，避免运行时错误。
```

### 5.2 所有权与借用规则

```
作为堆数据结构，String 遵循所有权规则：

let s1 = String::from("hello");
let s2 = s1;  // s1所有权转移至s2，s1失效

可变借用限制：同一时间只能有一个可变引用或多个不可变引用。
```

## 六 参考

* [Rust中文官网——使用字符串存储 UTF-8 编码的文本](https://rust.bootcss.com/ch08-02-strings.html)