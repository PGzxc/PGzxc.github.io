---
title: Rust开发之——路径Path(21)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 1b952ad6
date: 2025-07-15 09:19:45
---
## 一 概述

* 路径的两种形式：绝对路径与相对路径
* Rust 的私有性规则
* 特殊相对路径：super
* 路径选择与私有性应用场景

<!--more-->

## 二 路径的两种形式：绝对路径与相对路径

### 2.1 绝对路径

```
1、概念
从 crate 根开始，以crate关键字或 crate 名开头，后跟双冒号分隔的标识符。

2、示例：
crate::front_of_house::hosting::add_to_waitlist()。
```

### 2.2 相对路径

```
1、概念
从当前模块开始，以self、super或模块名开头。

2、示例：
front_of_house::hosting::add_to_waitlist()（基于当前模块层级）。
```

## 三 Rust 的私有性规则

### 3.1 默认私有性

```
1、概念
所有项（模块、函数、结构体等）默认私有，父模块无法访问子模块的私有项，但子模块可访问父模块的项。

2、示例：
未标记pub的hosting模块无法被外部访问，编译时提示module is private。
```

### 3.2 pub关键字暴露路径

```
1、模块公有化：
在模块定义前加pub，允许外部访问该模块，但模块内容仍需单独标记pub。

2、示例
pub mod hosting {  // 模块公有，但内部函数仍私有
    pub fn add_to_waitlist() {}  // 函数需额外标记pub
}
```

### 3.3 函数 / 方法公有化

```
直接在定义前加pub
```

### 3.4 结构体公有化

```
1、概念
结构体加pub后，字段仍默认私有，需逐个标记pub。

2、示例
pub struct Breakfast {
    pub toast: String,       // 公有字段
    seasonal_fruit: String,  // 私有字段
}
```

### 3.5 枚举公有化

```
1、概念
枚举加pub后，所有成员自动公有。

2、示例
pub enum Appetizer { Soup, Salad }  // 成员Soup和Salad均公有
```

## 四 特殊相对路径：super

```
1、作用：
从父模块开始构建相对路径，类似文件系统的..。

2、示例：

mod back_of_house {
    fn fix_incorrect_order() {
        super::serve_order();  // 调用父模块的serve_order函数
    }
}
```

## 五 路径选择与私有性应用场景

```
-绝对路径优势：代码移动时更稳定，适合跨模块调用。
-相对路径优势：模块结构调整时更灵活，适合同模块内层级调用。
-私有性封装：隐藏内部实现细节（如结构体的私有字段），仅暴露必要接口（如公有构造函数）
```

## 五 参考

* [Rust中文官网——路径用于引用模块树中的项](https://rust.bootcss.com/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html)