---
title: Rust开发之——开发工具VSCode安装与配置(4)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 26e611a9
date: 2025-06-25 14:57:47
---
## 一 概述

* VSCode开发环境
* VSCode插件安装
* VSCode的第一个示例

<!--more-->

## 二 VSCode开发环境

* 系统：Windows 11 专业版 24H2
* Rust: 1.87.0 
* build tools：Visual Studio 2022

## 三 VSCode插件安装

1-打开VSCode，点击左侧的扩展，搜索`Rust`安装

![][1]

2、可能需要的扩展

```
Rust
rust-analyzer
rust-project
```

![][2]

## 四 Rust的第一个示例

### 4.1 创建项目

1、使用如下指令创建项目(扩展暂时不可用)

```
cargo new hello_cargo
```

说明：cargo随rust已安装

![][3]

### 4.2 项目目录结构

![][4]

### 4.3 运行项目

1、在src/main.rs文件中，上方有个Run|Debug，点击运行

![][5]

2、控制台显示打印内容

```
Hello, world!
```

## 五 参考

* [Rust程序设计语言_Hello,Cargo](https://rust.bootcss.com/ch01-03-hello-cargo.html)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-4-vscode-search-rust-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-4-vscode-kuo-list-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-4-vscode-cargo-new-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-4-vscode-cargo-struct-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-4-vscode-cargo-run-5.png