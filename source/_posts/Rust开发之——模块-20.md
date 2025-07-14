---
title: Rust开发之——模块(20)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: fa839781
date: 2025-07-14 08:37:14
---
## 一 概述

* 模块的核心概念与作用
* 模块树结构
* 模块的实际应用场景

<!--more-->

## 二 模块的核心概念与作用

### 2.1 模块的定义

```
1、概念
模块用于将 crate 中的代码分组，通过mod关键字定义，可嵌套其他模块或项（函数、结构体、枚举等）。

2、示例：
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }
    mod serving {
        fn take_order() {}
        // 其他服务函数
    }
}
```

### 2.2 模块的价值

```
-组织代码：按功能分组（如餐厅的 “前台”“后台” 模块），提升可读性和可维护性。
-控制私有性：通过pub关键字控制项的可见性，隐藏内部实现细节。
```

## 三 模块树结构

### 3.1 层级关系

```
1、概念
模块构成树形结构，根为隐式的crate模块，src/lib.rs或src/main.rs是 crate 根文件。

2、示例结构：

crate
└── front_of_house
    ├── hosting
    │   ├── add_to_waitlist
    │   └── seat_at_table
    └── serving
        ├── take_order
        └── take_payment


3、术语：
-嵌套模块为 “子模块”（如hosting是front_of_house的子模块）。
-同层级模块为 “兄弟模块”（如hosting与serving）
```

### 3.2 与文件系统的类比

```
模块树类似文件系统目录结构，通过路径（Path）定位项，
如crate::front_of_house::hosting::add_to_waitlist。
```

## 四 模块的实际应用场景

```
-代码组织：将相关功能（如餐厅的接待、服务）分组到同一模块，便于新增功能时定位代码位置。
-私有性控制：未标记pub的项默认私有，仅模块内部可见，外部需通过公有接口访问（后续章节详细介绍）。
```


## 五 参考

* [Rust中文官网——定义模块来控制作用域与私有性](https://rust.bootcss.com/ch07-02-defining-modules-to-control-scope-and-privacy.html)