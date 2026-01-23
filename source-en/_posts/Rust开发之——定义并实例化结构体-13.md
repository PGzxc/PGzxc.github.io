---
title: Rust开发之——定义并实例化结构体(13)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: 4493729b
date: 2025-07-04 08:52:24
---
## 一 概述

* 结构体的基本定义
* 结构体实例化与操作
* 语法糖与便捷操作
* 特殊结构体类型
* 结构体与所有权

<!--more-->

## 二 结构体的基本定义

```
1、语法
使用struct关键字定义，字段需命名并指定类型

2、示例
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

3、说明
-类似元组但字段有命名，访问时不依赖顺序（如user1.username）。
-字段类型可不同，需整体声明在大括号内。
```

## 三 结构体实例化与操作

### 3.1 创建实例

```
1、说明
通过结构体名 + 键值对（字段名：值）创建，顺序不限：

2、示例
let user1 = User {
    email: String::from("xxx@example.com"),
    username: String::from("user123"),
    active: true,
    sign_in_count: 1,
};
```

### 3.2 修改字段值

```
1、声明关键字：
实例需声明为mut可变：

2、示例
let mut user1 = User {...};
user1.email = String::from("new@example.com");
```

### 3.3 函数返回结构体

```
1、说明
函数可返回结构体实例，利用表达式隐式返回：

2、示例
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

## 四 语法糖与便捷操作

### 4.1 字段初始化简写

```
1、说明
当参数名与字段名相同时，可省略字段名：

2、示例
fn build_user(email: String, username: String) -> User {
    User { email, username, ... }  // 等价于email: email, username: username
}
```

### 4.2 结构体更新语法

```
1、说明
基于现有实例创建新实例，未显式设置的字段沿用原值：

2、示例
let user2 = User {
    email: String::from("new@example.com"),
    username: String::from("user456"),
    ..user1  // 继承user1的active和sign_in_count
};
```

## 五 特殊结构体类型

### 5.1 元组结构体

```
1、概念
无命名字段，仅按类型区分，用于为元组赋予类型含义：

2、示例
struct Color(i32, i32, i32);  // RGB颜色
struct Point(i32, i32, i32); // 三维坐标
let black = Color(0, 0, 0);

3、特性：
不同元组结构体类型不同（如Color和Point不可互换）
```

### 5.2 类单元结构体

```
1、说明
无任何字段，类似()，用于实现trait（第十章详细介绍）：

2、示例
struct UnitStruct;  // 无字段声明
```

## 六 结构体与所有权

### 6.1 数据所有权原则

```
1、说明
推荐使用拥有所有权的类型（如String）而非引用（如&str），确保结构体存活时数据有效。

2、示例：若存储引用需添加生命周期标注（未标注会编译报错）：

struct User {
    username: &str,  // 错误：需生命周期参数
    email: &str,
    ...
}

3、解决方案：
使用String替代引用，或在第十章学习生命周期后处理。
```

## 七 参考

* [Rust中文官网——定义并实例化结构体](https://rust.bootcss.com/ch05-01-defining-structs.html)