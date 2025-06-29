---
title: Rust开发之——流程控制(9)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: f34f617d
date: 2025-06-30 04:56:33
---
## 一 概述

* if 表达式
* 循环

<!--more-->

## 二 if 表达式

### 2.1 基本用法

```
1、判断条件
条件必须为bool类型，若条件为真执行if代码块，否则执行else代码块（可选）。

2、示例：

fn main() {
    let number = 3;
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

### 2.2 多重条件判断

```
1、多重判断条件
用else if组合多个条件，按顺序检查，执行首个为真的分支。

2、示例：

if number % 4 == 0 { ... } 
else if number % 3 == 0 { ... } 
else { ... }
```

### 2.3 在let中使用if

```
1、说明
if是表达式，可将结果赋值给变量，要求各分支返回值类型一致。

2、示例：
let number = if condition { 5 } else { 6 };  // number为i32类型
```

## 三 循环

### 3.1 loop循环(无限循环)

```
1、使用方式
终止方式：用break关键字退出循环，可带返回值。

2、示例：

let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;  // 返回20
    }
};
```

### 3.2 while循环(条件循环)

```
1、使用方式
当条件为真时执行循环体，避免loop+if的嵌套，更简洁。

2、示例：

let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
// 输出：
```

### 3.3 for循环(遍历循环)

```
1、使用方式
遍历集合：通过for element in collection遍历数组、向量等。

2、示例

let a = [10, 20, 30];
for num in a.iter() {
    println!("{}", num);
}
```

### 3.4 范围遍历

```
1、说明
结合Range类型（如1..4表示 1,2,3），可配合rev()反转顺序。

2、示例
for number in (1..4).rev() {
    println!("{}!", number);  // 输出3! 2! 1!
}
```

## 四 参考

* [Rust中文官网——控制流](https://rust.bootcss.com/ch03-05-control-flow.html#if-%E8%A1%A8%E8%BE%BE%E5%BC%8F)