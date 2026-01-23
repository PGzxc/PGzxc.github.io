---
title: Rust开发之——不可恢复的错误panic(27)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 8635a7ad
date: 2025-08-07 09:45:59
---
## 一 概述

* panic!宏的基本概念与作用
* panic!的执行过程
* 切换至栈终止(Stack Abort)
* panic!与测试

<!--more-->

## 二 panic!宏的基本概念与作用

### 2.1 不可恢复错误的定义

```
当程序遇到无法继续执行的错误（如索引越界、空指针解引用）时，
触发panic!，导致程序崩溃或展开（Unwind）栈。
```

### 2.2 panic!的触发场景

```
1、内置函数触发：
如vec![1,2,3][100]触发索引越界，自动调用panic!。

2、手动调用：
在代码中显式使用panic!("错误信息")。
```

## 三 panic!的执行过程

### 3.1 栈展开(Stack Unwinding)

```
1、默认行为：
Rust 尝试展开栈（清理函数调用栈中的局部变量），并打印错误信息和回溯（Backtrace）。

2、示例输出
thread 'main' panicked at '索引越界', src/main.rs:2:17
```

### 3.2 栈清理与性能

```
展开栈会遍历栈帧并调用析构函数，确保资源释放，但可能产生额外开销
```

## 四 切换至栈终止(Stack Abort)

### 4.1 配置方式

```
在Cargo.toml中添加配置，将panic行为改为终止（适合生产环境减少二进制大小）

[profile.release]
panic = 'abort'
```

### 4.2 终止的特点

```
直接终止程序，不展开栈，不清理局部变量，二进制文件更小，但可能导致资源泄漏。
```

## 五 panic!与测试

```
1、测试断言
assert!和assert_eq!宏内部使用panic!，失败时标记测试用例为失败。

2、示例
assert_eq!(2 + 2, 4);  // 成功
assert!(3 > 5);        // 失败，触发panic
```


## 六 参考

* [Rust中文官网——panic! 与不可恢复的错误](https://rust.bootcss.com/ch09-01-unrecoverable-errors-with-panic.html)