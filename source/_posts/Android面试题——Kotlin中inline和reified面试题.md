---
title: Android面试题——Kotlin中inline和reified面试题
categories:
  - 面试相关
  - Android面试题
tags:
  - Android面试题
abbrlink: cfb5b09d
date: 2025-08-26 10:15:55
---
## 一 概述

```
本文介绍：Kotlin中inline和reified面试题
```

<!--more-->

## 二 inline相关

### 2.1 什么是 inline 函数？为什么需要？

```
inline 表示内联函数，编译器会在调用处直接展开函数体代码，而不是生成方法调用。
主要用途是减少 Lambda 创建和函数调用的开销。
特别是在高阶函数（函数参数是 Lambda）中，可以避免额外的对象分配。
```

### 2.2 inline 的优缺点？

```
1、优点：
 避免 Lambda 对象的分配，减少 GC 压力。
 减少函数调用栈深度，提高性能。

2、缺点：
 代码展开后，字节码体积可能会变大（尤其是函数体很大时）。
 不适合过大函数，否则会造成方法膨胀（code bloat）。
```

### 2.3 inline 和 noinline有什么区别？

```
1、说明
默认情况下，传入 inline 函数的 Lambda 参数也会被内联。

如果某些 Lambda 不适合内联（比如要作为对象存储/返回），
就需要用 noinline 修饰，这样该 Lambda 不会被内联。

2、示例
inline fun doSomething(block1: () -> Unit, noinline block2: () -> Unit) {
    block1()  // 内联
    block2()  // 保留为对象
}
```

### 2.4 crossinline 的作用是什么？

```
1、说明
crossinline 用于禁止 Lambda 里面使用 非局部返回。

Kotlin Lambda 默认支持 return，直接返回外层函数，
但某些场景（如异步回调）不允许这样，需要 crossinline。

2、示例
inline fun runCross(crossinline block: () -> Unit) {
    Thread {
        block()  // 如果不加 crossinline，这里 return 会报错
    }.start()
}
```

## 三 reified相关

### 3.1 什么是 reified？为什么必须和 inline搭配？

```
reified 意为“具体化”，用于解决 Kotlin 泛型类型擦除 的问题。
JVM 上泛型会在运行时擦除，无法直接获取 T 的类型。
加上 reified 后，编译器会把泛型的 Class 信息传入，使得我们可以用 T::class、is T 等操作。
由于实现依赖于内联展开（需要在调用处保留具体类型），所以必须和 inline 搭配。
```

### 3.2 给一个 reified 的实际开发案例

```
1、例如 Android 中常用的 startActivity 简化写法
inline fun <reified T : Activity> Context.startActivity() {
    val intent = Intent(this, T::class.java)
    this.startActivity(intent)
}

// 使用时非常简洁
context.startActivity<MainActivity>()

2、如果不用 reified，必须手动写 MainActivity::class.java，代码更冗长
```

### 3.3 如果不使用 reified，要怎么写？

```
1、说明
需要额外传递 Class<T> 参数，比如

2、示例
fun <T: Activity> Context.startActivity(clazz: Class<T>) {
    val intent = Intent(this, clazz)
    this.startActivity(intent)
}

context.startActivity(MainActivity::class.java)
```

### 3.4 reified 的限制是什么？

```
只能用于 inline 泛型函数。
不能用在类的泛型声明上。
reified 泛型类型参数不能作为可变类型（in/out）返回。
```

### 3.5 inline + reified 在 JSON 序列化场景怎么用？

```
1、用 Gson/Kotlinx.serialization 时，可以简化解析写法
inline fun <reified T> Gson.fromJson(json: String): T =
    this.fromJson(json, T::class.java)

val user: User = Gson().fromJson("""{"name":"Tom","age":18}""")

2、避免了手动写 User::class.java
```

## 四 综合题

### 4.1 `inline`、`noinline`、`crossinline`、`reified` 总结？

```
inline：内联函数，减少 Lambda/调用开销。
noinline：禁止某些 Lambda 内联，保留为对象。
crossinline：禁止 Lambda 使用非局部返回。
reified：必须和 inline 搭配，解决泛型擦除，可在运行时获取具体类型。
```

### 4.2 如果是 Android 面试，通常会问到

```
为什么 Gson 的泛型解析要配合 reified？
startActivity 简化写法怎么实现？
crossinline 和 noinline 的区别？
```

