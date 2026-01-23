---
title: Rust开发之——包和crate(19)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 80f46a4c
date: 2025-07-13 09:12:00
---
## 一 概述

* 包与 crate 的定义
* Cargo 创建包的默认结构
* crate 的作用域与命名空间

<!--more-->

## 二 包与 crate 的定义

### 2.1 crate

```
1、本质：
crate 是 Rust 的编译单元，分为二进制（Binary）和库（Library）两种类型。

2、crate 根文件：
-二进制 crate：默认根文件为src/main.rs。
-库 crate：默认根文件为src/lib.rs。

3、作用：
将相关功能分组，形成独立作用域，避免命名冲突（如rand crate 的功能通过rand作用域访问）。
```

### 2.2 包(Package)

```
1、组成：
包含一个或多个 crate 的集合，通过Cargo.toml描述构建方式。

2、规则：
-一个包最多包含 1 个库 crate。
-可包含多个二进制 crate（通过src/bin/目录下的文件定义）。
-至少包含 1 个 crate（库或二进制）。
```

## 三 Cargo 创建包的默认结构

```
1、命令示例：
cargo new my-project

2、生成文件：
-Cargo.toml：包的配置文件。
-src/main.rs：二进制 crate 的根文件（包名与 crate 名一致）。

3、扩展场景：
-若包含src/lib.rs，则同时存在库 crate。
-src/bin/目录下的每个文件对应一个二进制 crate。
```

## 四 crate 的作用域与命名空间

```
1、功能隔离：
每个 crate 的功能在自身作用域内命名，避免与其他 crate 冲突。
示例：自定义Rng结构体与rand crate 的Rng trait 不冲突，可通过rand::Rng访问外部功能。

2、依赖管理：
通过引入外部 crate（如rand），在项目中复用功能，提升开发效率。
```

## 五 参考

* [Rust中文官网——包和 crate](https://rust.bootcss.com/ch07-01-packages-and-crates.html)