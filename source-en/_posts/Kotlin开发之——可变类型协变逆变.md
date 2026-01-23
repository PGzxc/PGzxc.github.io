---
title: Kotlin开发之——可变类型协变逆变
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: 6a8061e1
date: 2025-08-26 10:09:37
---
## 一 概述

```
本文介绍Kotlin 中的可变类型协变/逆变(in/out)
```

<!--more-->

## 二 背景：Java vs Kotlin

```
在 Java 里，有 ? extends T（协变）和 ? super T（逆变）。
在 Kotlin 里，使用 out / in 来表示类型参数的可变性（variance）
```

## 三 基础概念

### 3.1 协变(out)

```
关键字：out

含义：只能生产（produce）不能消费（consume）。

泛型类型 Producer<out T> 表示：
只能安全地从中获取 T 类型的值（读），但不能安全地放入 T 类型的值（写）。

保证：Producer<Cat> 可以安全地当作 Producer<Animal> 使用（子类型可替换为父类型）。

适用场景：只读泛型容器
```

### 3.2 逆变(in)

```
关键字：in

含义：只能消费（consume）不能生产（produce）。

泛型类型 Consumer<in T> 表示：
只能安全地向其中传入 T 类型的值（写），但不能安全地从中获取 T（读时只能得到 Any?）。

保证：Consumer<Animal> 可以安全地当作 Consumer<Cat> 使用（父类型可替换为子类型）。

适用场景：只写泛型容器。
```

### 3.3 不变(invariant)

```
默认泛型参数是 invariant（不变）。

例如 Box<T>，Box<Cat> 和 Box<Animal> 没有继承关系。
```

## 四  示例代码

### 4.1 协变 out

```
1、示例
open class Animal {
    fun feed() = println("Feeding animal")
}

class Cat : Animal() {
    fun meow() = println("Meow")
}

// 协变的生产者
class Producer<out T>(private val value: T) {
    fun produce(): T = value
}

fun main() {
    val catProducer: Producer<Cat> = Producer(Cat())
    val animalProducer: Producer<Animal> = catProducer // ✅ 协变成立

    val animal: Animal = animalProducer.produce()
    animal.feed()
}

2、说明：
 这里 `Producer<Cat>` 可以赋值给 `Producer<Animal>`，因为它只会“产出” `T` 类型。
```

### 4.2 逆变 in

```
1、示例
open class Animal
class Cat : Animal()
class Dog : Animal()

// 逆变的消费者
class Consumer<in T> {
    fun consume(item: T) {
        println("Consumed: $item")
    }
}

fun main() {
    val animalConsumer: Consumer<Animal> = Consumer()
    val catConsumer: Consumer<Cat> = animalConsumer // ✅ 逆变成立

    catConsumer.consume(Cat()) // ✅ 可以传入 Cat
}

2、说明
这里 Consumer<Animal> 可以赋值给 Consumer<Cat>，因为它只会“消费” T 类型
```

### 4.3 不变(对比)

```
class Box<T>(val value: T)

fun main() {
    val catBox: Box<Cat> = Box(Cat())
    // val animalBox: Box<Animal> = catBox // ❌ 不成立，编译错误
}
```

## 五 总结

### 5.1 PECS 原则（Java/Kotlin 通用）

```
如果你要“生产”T（返回值），用 out。
如果你要“消费”T（参数），用 in。
如果两者都要（读写），就不能用协变/逆变，只能用不变。
```

### 5.2 口诀

```
out = 协变，生产者，只读，子类型 → 父类型
in = 逆变，消费者，只写，父类型 → 子类型
默认 = 不变，不能替换
```

### 5.3 常见应用

```
1、List<out T>
Kotlin 中的 List 是协变的，只能读，不能写。

2、Comparable<in T>
Comparable 是逆变的，只能用于比较输入对象。

3、函数类型
(in T) -> out R，参数是逆变的，返回值是协变的。
```

