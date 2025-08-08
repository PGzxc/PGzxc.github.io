---
title: Rust开发之——可恢复的错误Result(28)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: e596261f
date: 2025-08-08 09:02:16
---
## 一 概述

* Result枚举的基本概念与作用
* Result的基本处理方式
* Result的组合操作与错误传播
* 错误类型的转换与组合
* Result与Option的对比

<!--more-->

## 二 Result枚举的基本概念与作用

### 2.1 可恢复错误的定义

```
当程序遇到可处理的错误（如文件不存在、网络请求失败）时，
返回Result类型，允许调用者选择恢复逻辑。
```

### 2.2 Result<T, E>的结构

```
Ok(T)：操作成功，包含返回值T。
Err(E)：操作失败，包含错误信息E。
示例：文件读取函数返回Result<Vec<u8>, io::Error>。
```

## 三 Result的基本处理方式

### 3.1 模式匹配处理

```
1、说明
通过match表达式分别处理Ok和Err情况

2、示例
use std::fs::File;
fn main() {
    let f = File::open("hello.txt");
    let f = match f {
        Ok(file) => file,
        Err(error) => panic!("打开文件失败: {:?}", error),
    };
}
```

### 3.2 错误处理的灵活性

```
panic（如上述示例）。
返回错误给调用者。
提供默认值（如or_else方法）。
```

## 四 Result的组合操作与错误传播

### 4.1 ?操作符(问号操作符)

```
1、说明
简化错误传播，自动将Err返回给调用者：

2、示例
use std::fs::File;
use std::io::Read;
fn read_file() -> Result<String, std::io::Error> {
    let mut f = File::open("hello.txt")?;  // 若失败，直接返回Err
    let mut s = String::new();
    f.read_to_string(&mut s)?;  // 同上
    Ok(s)
}

3、等价转换：
?在Err时调用From::from转换错误类型，并返回。
```

### 4.2 ?的适用范围

```
只能在返回Result的函数中使用，不能在main函数（默认返回()）中直接使用，需包装成Result。
```

## 五 错误类型的转换与组合

### 5.1 From trait 与错误转换

```
1、说明
错误类型可通过实现From trait 转换为其他错误类型，便于统一处理：

2、示例
use std::io;
use std::num::ParseIntError;
fn to_u32(s: &str) -> Result<u32, io::Error> {
    s.parse::<u32>().map_err(|e: ParseIntError| {
        io::Error::new(io::ErrorKind::InvalidData, e)
    })
}
```

### 5.2 闭包与错误处理

```
使用map、map_err、and_then等方法处理Result中的值和错误

let f = File::open("hello.txt")
    .map(|file| file)
    .map_err(|error| panic!("打开文件失败: {:?}", error));
```

## 六 Result与Option的对比

```
1、相似性：
均为枚举类型，通过模式匹配处理不同情况。

2、区别：
Option<T>表示值的存在性（Some/None）。
Result<T, E>表示操作的成功 / 失败，包含错误信息E。
```


## 六 参考

* [Rust中文官网——panic! 与不可恢复的错误](https://rust.bootcss.com/ch09-01-unrecoverable-errors-with-panic.html)