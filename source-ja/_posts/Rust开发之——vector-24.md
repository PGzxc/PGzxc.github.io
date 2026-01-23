---
title: Rust开发之——vector(24)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: df9ef30c
date: 2025-07-18 06:28:41
---
## 一 概述

* Vector 的基本概念与创建
* Vector 的基本操作
* Vector 与所有权/借用规则
* Vector 的内存管理
* Vector 的类型限制

<!--more-->

## 二 Vector 的基本概念与创建

### 2.1 定义与特点

```
-Vector 是存储相同类型元素的动态数组，数据存于堆中，可在运行时添加 / 删除元素。
-与数组的区别：数组长度固定且存于栈，Vector 长度可变且存于堆。
```

### 2.2 创建方式

```
1、方式1：Vec::new()：创建空向量：
let mut v: Vec<i32> = Vec::new();  // 需类型标注


2、方式2：vec!宏：初始化带值的向量：
let v = vec![1, 2, 3];  // 自动推断为Vec<i32>
let v = vec![0; 5];     // 5个0，Vec<i32>
```

## 三 Vector 的基本操作

### 3.1 添加元素

```
push()：在末尾添加元素，向量可变（mut）：

let mut v = Vec::new();
v.push(5);
v.push(6);
```

### 3.2 访问元素

```
1、索引访问：v[index]，越界时运行时 panic：

let v = vec![1, 2, 3];
let third = v[2];  // 合法
let does_not_exist = v[100];  // 运行时panic: index out of bounds


2、get()方法：返回Option<&T>，安全访问：

if let Some(third) = v.get(2) {
    println!("第三个元素: {}", third);
} else {
    println!("索引越界");
}
```

### 3.3 遍历元素

```
1、不可变引用遍历：
for i in &v {
    println!("{}", i);
}


2、可变引用遍历：
for i in &mut v {
    *i += 1;  // 修改元素值
}
```

## 四 Vector 与所有权/借用规则

### 4.1 所有权转移

```
向量包含堆数据，赋值或传递给函数时所有权转移：

let v1 = vec![1, 2, 3];
let v2 = v1;  // v1所有权转移至v2，v1失效
```

### 4.2 借用限制

```
同一时间只能有一个可变引用或多个不可变引用：

let mut v = vec![1, 2, 3];
let a = &v;       // 不可变引用
let b = &v;       // 多个不可变引用允许
let c = &mut v;   // 错误：存在不可变引用时无法获取可变引用
```

## 五 Vector 的内存管理

### 5.1 动态扩容机制

```
当元素超过容量时，Vector 分配更大内存块，
复制旧数据并释放旧内存，保证操作的均摊时间复杂度为 O (1)。
```

### 5.2 容量相关方法

```
capacity()：返回当前分配的内存可存储元素数量。
reserve()：预分配指定容量，避免多次扩容：

let mut v = Vec::new();
v.reserve(10);  // 预分配10个元素的空间
```

## 六 Vector 的类型限制

```
-元素类型必须相同：所有元素需为同一类型，通过泛型（后续章节）实现灵活类型支持。
-示例错误：let v = vec![1, "two"];（i32 与 & str 类型不同，编译报错）。
```

## 七 参考

* [Rust中文官网——vector 用来储存一系列的值](https://rust.bootcss.com/ch08-01-vectors.html)