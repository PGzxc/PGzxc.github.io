---
title: 仓颉开发之——Collection(12)
categories:
  - 开发
  - B-高级语言
  - 仓颉
tags:
  - 仓颉
abbrlink: 64c2a66a
date: 2024-08-19 09:16:00
---
## 一 概述

* Collection概述
* 常见集合
* Iterable

<!--more-->

## 二 Collection概述

* Array：不需要增加和删除元素，但需要修改元素，使用它
* ArrayList：需要频繁对元素增删查改，使用它
* HashSet：每个元素都是唯一的，使用它
* HashMap：存储一系列的映射关系，使用它

## 三 常见集合

### 3.1 ArrayList

* 何时使用：需要频繁增加和删除元素的场景
* 导包：import std.collection.*
* 创建：let a = ArrayList\<String>()
* for-in 循环遍历：for (i in list) {}
* 修改 ArrayList：list[0] = 3
* 增加 ArrayList 的大小： list.append(i)

### 3.2 HashSet

* 何时使用：不重复元素的 Collection
* 导包：import std.collection.*
* 创建：let a = HashSet\<String>()
* for-in 循环遍历： for (i in mySet) {}
* 修改 HashSet：mySet.put(0) 

### 3.3 HashMap

1. 何时使用：构造元素为键值对的 Collection
2. 导包：import std.collection.*
3. 创建：let b = HashMap<String, Int64>([("a", 0), ("b", 1), ("c", 2)]) 
4. for-in 循环遍历： for ((k, v) in map) {}
5. 修改 HashMap：map["a"] = 3

## 四 Iterable

* 用户自定义类型实现类似的遍历操作
* 实现Iterable 接口的 iterator()方法
* Iterator中的next()方法用于判断是否有下一个值

## 五 思维导图

![][1]


## 六 参考

* [仓颉官方文档—Collection ](https://developer.huawei.com/consumer/cn/doc/openharmony-cangjie/1_10collection-_u7c7b_u578b)
* [仓颉编程语言入门教程](https://developer.huawei.com/consumer/cn/training/course/slightMooc/C101718903607800132)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-hmos/cangjie-xmind-9-collection.png