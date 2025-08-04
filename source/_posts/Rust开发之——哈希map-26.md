---
title: Rust开发之——哈希map(26)
categories:
  - 开发
  - B-高级语言
  - Rust
tags:
  - Rust
abbrlink: '937e453'
date: 2025-08-04 09:46:26
---
## 一 概述

* Hash Map 的基本概念与创建
* Hash Map 的基本操作
* Hash Map 的所有权与类型
* Hash Map 与其他集合的性能对比
* Hash Map 的应用场景

<!--more-->

## 二 Hash Map 的基本概念与创建

### 2.1 定义与特点

```
1、Hash Map
也称为 HashMap 是存储键值对（Key-Value）的集合，键必须可哈希（实现Hash和Eq trait）。

2、与其他集合的区别：
-Vector：按索引访问，适合有序数据。
-Hash Map：按键访问，适合快速查找关联数据。
```

### 2.2 创建方式

```
1、HashMap::new()：创建空哈希映射：
use std::collections::HashMap;
let mut scores = HashMap::new();  // 需导入HashMap

2、插入键值对：
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

3、from_iter方法：从迭代器创建：
let teams = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
let scores: HashMap<_, _> = teams.into_iter().zip(initial_scores.into_iter()).collect();
```

## 三 Hash Map 的基本操作

### 3.1 访问值

```
1、get()方法：通过键获取值，返回Option<&V>：

let team_name = String::from("Blue");
if let Some(score) = scores.get(&team_name) {
    println!("{}队得分: {}", team_name, score);
}


2、索引访问：
不支持直接通过scores[key]访问，需用get()或模式匹配。
```

### 3.2 修改值

```
1、插入或覆盖：重复插入同键会覆盖旧值：
scores.insert(String::from("Blue"), 20);  // 原值10被覆盖为20

2、仅插入不存在的键：entry()方法结合or_insert：
scores.entry(String::from("Red")).or_insert(0);  // 若Red不存在，插入0

3、更新现有值：结合get_mut和模式匹配：
if let Some(score) = scores.get_mut(&team_name) {
    *score += 10;  // 增加值
}
```

### 3.3 遍历键值对

```
1、不可变遍历：
for (key, value) in &scores {
    println!("{}: {}", key, value);
}

2、可变遍历：
for (key, value) in &mut scores {
    *value += 1;  // 修改值
}
```

## 四 Hash Map 的所有权与类型

### 4.1 键值的所有权

```
插入时，Hash Map 获取键和值的所有权：
let key = String::from("Blue");
scores.insert(key, 10);  // key所有权转移至scores

若键或值为引用，需确保引用的有效性。
```

### 4.2 键的可哈希性

```
键类型必须实现Hash和Eq trait：
基本类型（如i32、String）已实现。
自定义类型需手动派生或实现这些 trait。
```

## 五 Hash Map 与其他集合的性能对比

```
-查找效率：平均时间复杂度 O (1)，适用于高频查找场景。
-与 B 树的对比：Hash Map 在平均情况下更快，B 树在最坏情况下更稳定（如有序数据）。
```

## 六 Hash Map 的应用场景

```
1、字典与映射：
如单词到定义的映射、用户 ID 到用户信息的映射。

2、统计频率：计算文本中单词出现的次数：
let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    *map.entry(word).or_insert(0) += 1;
}
```

## 七 参考

* [Rust中文官网——哈希 map 储存键值对](https://rust.bootcss.com/ch08-03-hash-maps.html)