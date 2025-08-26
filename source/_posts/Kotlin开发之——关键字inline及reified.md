---
title: Kotlin开发之——关键字inline及reified
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: e35633ae
date: 2025-08-26 10:08:30
---
## 一 概述

```
本文介绍Kotlin中的两个关键字的用法、底层原理及示例
 -inline
 -reified
```

<!--more-->

## 二 inline 关键字

### 2.1 定义

```
inline 放在函数定义前，表示编译器会将函数体代码直接拷贝到调用处，而不是生成单独的方法调用。

作用是 减少 Lambda 对象创建的开销，提升性能。
```

### 2.2 使用场景

```
高阶函数优化（避免频繁创建 Lambda 对象）
性能优化（减少方法调用栈深度）
内存优化（避免额外内存分配）
```

### 2.3 示例

```
inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("耗时: ${end - start}ms")
}

fun main() {
    measureTime {
        Thread.sleep(500)
    }
}
```

说明：编译后，`measureTime` 的内容会直接“拷贝”到调用处，避免了方法调用

## 三 noinline

### 3.1 说明

```
如果某些 Lambda 不需要内联，可以用 noinline
```

### 3.2 示例

```
inline fun doSomething(block1: () -> Unit, noinline block2: () -> Unit) {
    block1()  // 被内联
    block2()  // 保留为函数对象
}
```

## 四 reified 关键字

### 4.1 概念

```
reified 必须和 inline 搭配使用，用来解决 Kotlin 泛型类型擦除 问题。

加上 reified 后，可以在函数内部直接使用 T::class、is T 这样的语法。
```

### 4.2 使用场景

```
类型判断（is T）
获取 Class 信息（T::class.java）
简化泛型工厂、反射、JSON 解析
```

### 4.3 示例

1、示例 1：类型判断

```
inline fun <reified T> checkType(value: Any): Boolean {
    return value is T
}

fun main() {
    println(checkType<String>("Hello"))  // true
    println(checkType<Int>("Hello"))     // false
}
```

2、示例 2：获取 Class

```
inline fun <reified T> getType(): Class<T> {
    return T::class.java
}

fun main() {
    println(getType<String>())  // class java.lang.String
    println(getType<Int>())     // int
}
```

3、示例 3：泛型 JSON 解析

```
inline fun <reified T> Gson.fromJson(json: String): T =
    this.fromJson(json, T::class.java)

fun main() {
    val json = """{"name":"Tom","age":18}"""
    val user: User = Gson().fromJson(json)
    println(user.name)  // Tom
}
```

说明：如果不用 `reified`，就必须手动传 `Class<T>`，写法会很冗长

## 五 inline + reified 总结

### 5.1 总结

```
1、inline
 优化性能（减少方法调用）
 避免 Lambda 对象额外分配
 可配合 noinline 使用

2、reified
 必须和 inline 一起使用
 解决泛型擦除，可以用 T::class、is T
 常用于反射、工厂、序列化/反序列化
```

### 5.2 实际开发场景

```
1、示例
inline fun <reified T : Activity> Context.startActivity() {
    val intent = Intent(this, T::class.java)
    this.startActivity(intent)
}

// 调用时更简洁：
context.startActivity<MainActivity>()

2、说明
不用 reified的话，就要写 startActivity(Intent(this, MainActivity::class.java))，麻烦得多
```

