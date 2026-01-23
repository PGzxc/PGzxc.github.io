---
title: Kotlin编程实战——开始(03)
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: 1f2ab655
date: 2022-11-05 09:25:45
---
## 一 概述

* 基本语法
* 习惯用法
* 编码规范

<!--more-->

## 二 基本语法

* 包的定义与导入
* 程序入口点
* 函数
* 变量(var/val)
* 注释
* 字符串模板
* 条件表达式
* 空值与 null 检测
* 类型检测与自动类型转换
* for 循环
* while 循环
* when 表达式
* 使用区间（range）
* 集合
* 创建基本类及其实例

## 三 习惯用法

* 创建 DTOs（POJOs/POCOs）
* 函数的默认参数
* 过滤 list(filter)
* 检测元素是否存在于集合中(in&!in)
* 字符串内插("Name $name")
* 类型判断(is)
* 遍历 map/pair型list
* 使用区间(for (i in 1..100))
* 只读 list(listOf("a", "b", "c"))
* 只读 map(mapOf("a" to 1)
* 访问 map(map["key"])
* 延迟属性(by lazy)
* 扩展函数(String.spaceToCamelCase())
* 创建单例(object Resource {})
* If not null 缩写
* If not null and else 缩写
* if null 执行一个语句
* 在可能会空的集合中取第一元素(firstOrNull())
* if not null 执行代码(value?.let{})
* 映射可空值（如果非空的话）
* 返回 when 表达式
* “try/catch”表达式
* “if”表达式
* 返回类型为 Unit 的方法的 Builder 风格用法
* 单表达式函数
* 对一个对象实例调用多个方法 （with）
* 配置对象的属性（apply）
* Java 7 的 try with resources
* 对于需要泛型信息的泛型函数的适宜形式
* 使用可空布尔
* 交换两个变量
* TODO()：将代码标记为不完整

## 四 编码规范

* 源代码组织
* 命名规则
* 格式化
* 文档注释
* 避免重复结构

## 五 思维导图

![][1]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-kotlin/kotlin-learn-struct-3.png