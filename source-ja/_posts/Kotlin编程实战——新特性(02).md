---
title: Kotlin编程实战——新特性(02)
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: 336cd20a
date: 2022-11-05 09:22:26
---
## 一 概述

* Kotlin 1.1
* Kotlin 1.2 
* Kotlin 1.3(协程正式)
* Kotlin 1.4.0
* 1.4.20

<!--more-->

## 二 Kotlin 1.1

* JavaScript
* 协程(实验性)
* 其他语言特性
* 标准库
* JVM 后端
* JavaScript 后端

## 三 Kotlin 1.2 

### 3.1 多平台项目

* 目标平台-JVM、JavaScript 以及Native 
* 三种模块-公共模块、平台模块包、常规模块
* 编译时-既会生成公共代码也会生成平台相关代码
* 预期声明与实际声明

### 3.2 其他语言特性

* 注解中的数组字面值
* lateinit 顶层属性与局部变量
* 检测 lateinit 变量是否已初始化(isInitialized )
* 内联函数带有默认函数式参数
* 源自显式类型转换的信息会用于类型推断(as T)
* 智能类型转换改进
* 支持 ::foo 作为 this::foo 的简写
* 破坏性变更：try 块后可靠智能转换
* 弃用：数据类弃用 copy
* 弃用：枚举条目中的嵌套类型

### 3.3 标准库

* Kotlin 标准库构件与拆分包
* windowed、chunked、zipWithNext
* fill、replaceAll、shuffle/shuffled
* kotlin-stdlib 中的数学运算
* 用于 BigInteger 与 BigDecimal 的操作符与转换
* 浮点数到比特的转换
* 正则表达式现在可序列化
* 如果可用，Closeable.use 会调用 Throwable.addSuppressed

## 四 Kotlin 1.3(协程正式)

* 语言特性与改进
* 标准库

## 五 1.4.20

* java15支持
* 动态字符串连接

## 六 思维导图

![][2]



[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-kotlin/kotlin-learn-struct-2.png