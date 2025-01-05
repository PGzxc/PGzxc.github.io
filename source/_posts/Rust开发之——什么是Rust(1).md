---
title: Rust开发之——什么是Rust(1)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 858e9f35
date: 2025-01-05 08:45:57
---
## 一 概述

* Rust官网及文档
* Rust介绍
* Rust可以做什么

<!--more-->

## 二 Rust官网及文档

### 2.1Rust官网

官方网站地址：https://www.rust-lang.org/zh-CN/

![][1]

### 2.2 学习文档

* Rust官方文档(英文)：https://doc.rust-lang.org/reference/index.html
* Rust 程序设计语言 简体中文版：https://kaisery.github.io/trpl-zh-cn/ch01-01-installation.html

## 三 Rust介绍

### 3.1 介绍

* Rust 是一种快速、高并发、安全且具有授权性的编程语言, 最初由 Graydon Hoare 于 2006 年创造和发布
* 现在它是一种开源语言，主要由 Mozilla 团队和许多开源社区成员共同维护和开发。
* 它的目标是 C 和 C++占主导地位的系统编程领域。

### 3.2 Rust的目标

Rust 语言瞄准的是工业系统的霸者 — C++ 语言

### 3.3 Rust的三大特点

Rust语言是一门系统编程语言，它有三大特点：

* 运行快
* 防止段错误
* 保证线程安全

### 3.4 系统编程语言

系统级编程是相对于应用级编程而言。

一般来说，系统级编程意味着更底层的位置，它更接近于硬件层次，并未上层的应用软件提供支持。

系统级编程语言一般具有以下特点：

* 可以在资源非常受限的环境下执行
* 运行时开销很小，非常高效
* 很小的运行库，甚至于没有
* 可以允许直接的内存操作

## 四 Rust可以做什么

* 可以使用 Rust 编写操作系统、游戏引擎和许多性能关键型应用程序。
* 可以使用它构建高性能的 Web 应用程序、网络服务，类型安全的数据库对象关系映射（Object Relational Mapping，ORM）库，还可以将程序编译成 WebAssembly 在 Web 浏览器上运行
* Rust 还在为嵌入式平台构建安全性优先的实时应用程序方面获得了相当大的关注，例如 Arm 基于 Cortex-M 的微控制器，目前该领域主要由 C 语言主导。Rust 因其广泛的适用性在多个领域都表现良好。

## 五 参考

* [百度百科—Rust语言](https://baike.baidu.com/item/Rust%E8%AF%AD%E8%A8%80)
* [为什么要使用Rust语言](https://www.go-edu.cn/2022/06/04/rust-01-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8Rust%E8%AF%AD%E8%A8%80/)
* [Rust官网](https://www.rust-lang.org/zh-CN/tools/install)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-1-first-web-1.png
