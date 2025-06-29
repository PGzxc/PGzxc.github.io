---
title: Rust开发之——注释(8)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 56ec7aef
date: 2025-06-29 09:05:22
---
## 一 概述

* 注释的作用
* 注释的类型及写法
* 文档注释

<!--more-->

## 二 注释的作用

```
注释是程序员在源码中留下的记录，编译器会忽略注释，但有助于阅读代码的人理解代码含义。
```

## 三 注释的类型及写法

### 3.1 单行注释

```
1、格式：
以双斜杠//开头，到本行末尾结束。

2、示例
// hello, world
let lucky_number = 7; // I’m feeling lucky today
```

### 3.2 多行注释写法

```
1、写法
若注释超过一行，需在每一行开头都添加//，

2、示例：
// So we’re doing something complicated here, long enough that we need
// multiple lines of comments to do it! Whew! Hopefully, this comment will
// explain what’s going on.
```

### 3.3 注释的位置

```
可放在代码行末尾或所解释代码的上一行，推荐使用后者（如放在代码行上方），使代码更清晰。
```

## 四 文档注释

```
文档注释是 Rust 的另一种注释类型，
将在第 14 章 “将 crate 发布到 Crates.io” 部分详细讨论，网页中未展开说明
```


## 五 参考

* [Rust中文官网——注释](https://rust.bootcss.com/ch03-04-comments.html)