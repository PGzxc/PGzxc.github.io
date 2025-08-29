---
title: Rust开发之——错误信息输出(41)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: c38e7726
date: 2025-08-29 07:54:06
---
## 一 概述

```
文本介绍 Rust 中如何将错误信息输出到标准错误(stderr)而非标准输出(stdout)
```

<!--more-->

## 二 标准输出与标准错误的区别

```
1、标准输出（stdout）：
用于程序的正常输出信息（如搜索结果），可被重定向到文件。

2、标准错误（stderr）：
专门用于错误信息（如参数错误、文件读取失败），
即使标准输出被重定向，错误信息仍会显示在屏幕上，方便用户及时察觉问题。
```

## 三 现有问题：错误信息误输出到标准输出

```
此前minigrep使用println!宏输出错误信息，
导致错误信息会被一并重定向到文件(如执行cargo run > output.txt时，错误信息会写入output.txt)，
不符合命令行程序的预期行为。
```

## 四 解决方案：使用`eprintln!`输出错误信息

```
1、说明
Rust 标准库提供eprintln!宏，专门用于将内容输出到标准错误流。
修改代码中打印错误的位置，将println!替换为eprintln!：

2、示例
// src/main.rs
fn main() {
    let args: Vec<String> = env::args().collect();

    // 解析参数错误时，用eprintln!输出
    let config = Config::new(&args).unwrap_or_else(|err| {
        eprintln!("参数解析错误: {}", err); // 替换为eprintln!
        process::exit(1);
    });

    // 运行程序错误时，用eprintln!输出
    if let Err(e) = minigrep::run(config) {
        eprintln!("程序错误: {}", e); // 替换为eprintln!
        process::exit(1);
    }
}
```

## 五 验证修改效果

```
错误场景：执行cargo run > output.txt（无参数，触发错误），错误信息显示在屏幕上，output.txt为空。
正常场景：执行cargo run to poem.txt > output.txt（正确参数），搜索结果写入output.txt，屏幕无输出。
```

## 六 参考

* [Rust中文官网—将错误信息输出到标准错误而不是标准输出](https://rust.bootcss.com/ch12-06-writing-to-stderr-instead-of-stdout.html)