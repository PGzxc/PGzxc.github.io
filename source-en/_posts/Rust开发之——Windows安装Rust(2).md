---
title: Rust开发之——Windows安装Rust(2)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 7c876feb
date: 2025-01-06 09:30:46
---
## 一 概述

* Rustup安装
* Rust更新
* Rust卸载

<!--more-->

## 二 Rustup安装

### 2.1 Rust下载地址

rust下载地址：https://www.rust-lang.org/zh-CN/tools/install

![][1]

### 2.2 安装环境

* 系统：Windows 11 专业版 23H2
* visual-cpp-build-tools：https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/

### 2.3 Rust安装

1-双击安装包，弹窗如下窗口，选择安装模式

![][2]

2-输入安装模式(1默认)，开始安装

![][3]

4-安装完成后，显示如下界面(需要配置)

![][4]

### 2.4 Rust配置

1-添加环境变量

```
USERPROFILE:C:\Users\83422
```

2-Path

```
%USERPROFILE%\.cargo\bin
```

### 2.5 查看指令

打开 shell 并运行如下行

```
rustc --version
```

显示如下：

```
rustc 1.83.0 (90b35a623 2024-11-26)
```

## 三 Rust更新

Rust更新使用如下指令

```
rustup update
```

图示

![][5]

## 四 Rust卸载

Rust卸载使用如下指令

```
rustup self uninstall
```

图示

![][6]

## 五 参考

* [Rust官网—安装 Rust](https://www.rust-lang.org/zh-CN/tools/install)
* [Rust程序设计语言—安装](https://rust.bootcss.com/ch01-01-installation.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-2-install-web-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-2-install-opt-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-2-install-start-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-2-install-finish-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-2-update-cmd-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-rust/rust-2-uninstall-cmd-6.png
