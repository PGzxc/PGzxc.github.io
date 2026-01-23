---
title: Rust开发之——接受命令行参数(36)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 7531c83d
date: 2025-08-20 08:25:06
---
## 一 概述

```
主要介绍了 Rust 中如何接受和处理命令行参数，以实现一个简单的minigrep工具为例
```

<!--more-->

## 二 项目创建与目标

```
1、使用cargo new minigrep创建二进制项目

2、目标是让程序接受两个命令行参数：
要搜索的字符串（searchstring）和被搜索的文件名（example-filename.txt）

3、运行方式为cargo run searchstring example-filename.txt。
```

## 三 读取命令行参数的方法

### 3.1 使用`std::env::args`函数

```
该函数返回一个迭代器（iterator），包含所有命令行参数，
可通过collect方法转换为Vec<String>集合
```

### 3.2 示例代码

```
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect(); // 收集参数到vector
    println!("{:?}", args); // 打印参数列表
}
```

## 四 参数的结构与注意事项

### 4.1 参数列表的构成

```
1、构成
迭代器的第一个元素（args[0]）是程序自身的路径（如target/debug/minigrep），
后续元素为用户传入的参数。

2、示例输出（运行cargo run needle haystack）
["target/debug/minigrep", "needle", "haystack"]
```

### 4.2 处理无效 Unicode

```
std::env::args在参数包含无效 Unicode 时会触发panic，若需支持无效 Unicode，可使用std::env::args_os，其返回OsString类型（跨平台兼容，但处理更复杂）
```

## 五 提取并使用参数(保存参数到变量)

```
1、说明
从参数列表中提取用户传入的搜索字符串和文件名（分别对应args[1]和args[2]）

2、示例
let args: Vec<String> = env::args().collect();
let query = &args[1]; // 搜索字符串
let filename = &args[2]; // 文件名

println!("Searching for {}", query);
println!("In file {}", filename);
```

## 六 参考

* [Rust中文官网—接受命令行参数](https://rust.bootcss.com/ch12-01-accepting-command-line-arguments.html)