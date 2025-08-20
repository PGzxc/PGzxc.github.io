---
title: Rust开发之——读取文件(37)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: be4ff7ad
date: 2025-08-21 07:10:38
---
## 一 概述

```
本文介绍在 Rust 中读取文件的实现方法
```

<!--more-->

## 二 准备测试文件

```
为测试文件读取功能，在项目根目录创建poem.txt，
内容为艾米莉・狄金森的诗（示例文本），用于验证文件读取是否正常。
```

## 三 读取文件的代码实现

### 3.1 引入文件操作模块

```
通过use std::fs;导入标准库的文件操作模块，以便使用文件读取功能。
```

### 3.2 核心读取逻辑

```
使用fs::read_to_string(filename)读取指定文件内容，该函数返回Result<String>：
 -成功时，返回包含文件内容的Ok(String)；
 -失败时（如文件不存在），返回Err，通过expect处理错误（若出错则打印提示并终止程序）。
```

### 3.3 完整代码示例

```
use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();
    let query = &args[1]; // 搜索字符串（暂未使用）
    let filename = &args[2]; // 目标文件名

    println!("Searching for {}", query);
    println!("In file {}", filename);

    // 读取文件内容
    let contents = fs::read_to_string(filename)
        .expect("读取文件时发生错误");

    println!("文件内容:\n{}", contents); // 打印文件内容
}
```

## 四 运行与验证

### 4.1 执行运行

```
cargo run the poem.txt
```

### 4.2 输出内容

```
Searching for the
In file poem.txt
文件内容:
I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!
```

## 五 参考

* [Rust中文官网—读取文件](https://rust.bootcss.com/ch12-02-reading-a-file.html)