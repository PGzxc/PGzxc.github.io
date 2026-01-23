---
title: Kotlin开发之——几个常用关键字
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: 613a63f4
date: 2025-11-06 09:36:06
---
## 一 概述

```
本文介绍：
 - Kotlin中三个常用特性：inline(内联函数)、reified(具体化类型参数)和扩展函数
 -场景：单独使用+结合使用
```

<!--more-->

## 二 单独使用

### 2.1 扩展函数(Extension Functions)

1、说明

```
扩展函数允许在不继承类、不修改原类代码的前提下，为现有类（包括第三方库的类）添加新的函数。
它本质是 “静态工具函数的语法糖”，但使用起来更自然。
```

2、基本语法

```
// 为 String 类添加扩展函数：判断是否为纯数字
fun String.isAllDigits(): Boolean {
    return this.all { it.isDigit() } // this 指代调用者（String 实例）
}

// 使用
fun main() {
    val str = "12345"
    println(str.isAllDigits()) // 输出 true
}
```

3、核心特点

```
-扩展函数的 “接收者类型”（如上面的String）写在函数名前，用.分隔；
-函数内部用this指代调用该函数的对象(接收者实例)；
-静态解析：扩展函数不影响原类的继承关系，调用时根据 “声明类型” 而非 “运行时类型” 决定（无多态）；
-不能访问原类的私有/保护成员(本质是外部函数，仅能访问公开成员)
```

4、应用场景

```
-为第三方库的类(如String、List)添加实用功能（避免创建工具类）；
-简化代码调用（如list.lastOrNull()替代if (list.isEmpty()) null else list[list.size-1]）
```

### 2.2 内联函数(inline functions)

1、说明

```
inline修饰的函数在编译时会被"内联"到调用处(即函数体直接替换调用代码)，而非通过常规函数调用(压栈、跳转)执行。
其核心作用是消除高阶函数中 lambda 的额外开销。
```

2、为什么需要 inline？

```
1、说明
Kotlin 中，lambda 表达式会被编译为匿名类（或函数对象），
每次调用含 lambda 参数的函数时，可能创建额外对象，导致性能开销。
而inline可以避免这种开销

2、示例
// 普通高阶函数（有lambda开销）
fun normalFunc(block: () -> Unit) {
    block()
}

// 内联高阶函数（无lambda开销）
inline fun inlineFunc(block: () -> Unit) {
    block()
}

3、编译后
编译后，inlineFunc { ... }的调用处会直接插入block()的内容，
而normalFunc则会保留函数调用和 lambda 对象的创建。
```

3、关键特性

```
1、仅适合短函数：
内联会复制函数体到所有调用处，若函数复杂，会导致字节码膨胀；

2、noinline修饰符：若内联函数的多个 lambda 参数中，部分不需要内联，可用noinline排除
inline fun inlineTest(inlineBlock: () -> Unit, noinline noInlineBlock: () -> Unit) {
    inlineBlock() // 内联
    noInlineBlock() // 不内联（可作为对象传递）
}

3、crossinline修饰符：
限制 lambda 中不能使用return（避免中断外层函数执行），常用于 lambda 需要被异步调用或存储的场景：

inline fun async(crossinline block: () -> Unit) {
    Thread { block() }.start() // 若block用return，会尝试中断Thread的run()，不合理
}
```

### 2.3 具体化类型参数(reified type parameters)

1、说明

```
由于 JVM 的类型擦除，泛型参数在运行时无法直接获取（如List<String>和List<Int>在运行时都是List）。
而reified允许在内联函数中获取泛型参数的实际类型，突破类型擦除限制。
```

2、基本用法

```
reified必须与inline配合使用（只有内联函数能在编译时确定泛型的实际类型）

// 用reified获取泛型实际类型，判断对象是否为该类型
inline fun <reified T> isType(obj: Any): Boolean {
    return obj is T // 若没有reified，这里会报错（无法检查T的类型）
}

// 使用
fun main() {
    println(isType<String>("hello")) // true
    println(isType<Int>("hello"))    // false
}
```

3、应用场景

```
1、简化反射操作（如创建泛型实例、获取类信息）
inline fun <reified T> createInstance(): T {
    return T::class.java.getDeclaredConstructor().newInstance()
}

2、类型过滤（如集合中筛选特定类型元素）
inline fun <reified T> List<*>.filterType(): List<T> {
    return this.filterIsInstance<T>()
}
```

## 三 3者的结合使用

### 3.1 说明

```
扩展函数、inline、reified经常结合，以实现 “增强现有类 + 高效 + 突破类型擦除” 的功能。
```

### 3.2 示例：为集合扩展 “按类型过滤” 功能

```
// 扩展List，添加按类型过滤的内联函数（带reified参数）
inline fun <reified T> List<*>.filterByType(): List<T> {
    val result = mutableListOf<T>()
    for (item in this) {
        if (item is T) { // 因reified，可直接判断item是否为T类型
            result.add(item)
        }
    }
    return result
}

// 使用
fun main() {
    val mixedList = listOf(1, "a", 3, "b", 5)
    val ints = mixedList.filterByType<Int>() // 筛选出所有Int
    println(ints) // [1, 3, 5]
}
```

说明：

```
-filterByType是List<*>的扩展函数，增强了集合功能；
-用inline消除 lambda（若有）的开销；
-用reified T突破类型擦除，直接在函数内判断元素是否为T类型。
```

## 四 总结

```
-扩展函数：为现有类添加功能，语法简洁；
-inline：内联函数体到调用处，优化高阶函数的 lambda 开销；
-reified：配合 inline 使用，允许在运行时获取泛型实际类型，突破类型擦除；
-三者结合：可实现高效、灵活的工具函数（如 Kotlin 标准库中的filterIsInstance、runCatching等）。
```

