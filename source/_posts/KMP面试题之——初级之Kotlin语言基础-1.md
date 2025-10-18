---
title: KMP面试题之——初级之Kotlin语言基础(1)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: 9a39b32f
date: 2025-10-13 09:14:33
---
## 一 概述

```
1.Kotlin与Java的主要区别是什么？(类型推断、空安全、扩展函数、协程、数据类)
2.Kotlin 的 data class 与 sealed class 有何区别？(数据承载 vs 状态封装)
3.什么是扩展函数？有什么使用场景？
4.Kotlin 协程(Coroutine)与线程的区别？
5.suspend 函数底层是如何实现的？(状态机转换)
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 Kotlin与Java的区别

1、对比项

|             特性             |              Kotlin              |          Java           |     优势     |
| :--------------------------: | :------------------------------: | :---------------------: | :----------: |
|           类型推断           |  编译器自动推断类型(val x = 5)   | 需显式声明 (int x = 5;) |     简洁     |
|     空安全(Null Safety)      | 类型系统区分可空与非空 (String?) |   默认可空，易空指针    |   安全性高   |
| 扩展函数(Extension Function) |      无需继承即可扩展类功能      |    需静态方法或继承     | 代码复用性高 |
|       协程(Coroutine)        |       轻量异步模型(非阻塞)       |    基于线程(重量级)     |  并发性能好  |
|      数据类(Data Class)      | 自动生成 equals/hashCode/copy 等 |       需手动重写        |  开发效率高  |
|   智能类型转换(Smart Cast)   |     自动判断类型(Smart Cast)     |       需显式强转        |  代码更简洁  |
|        默认与命名参数        |       支持默认值与命名调用       |         不支持          |   函数灵活   |
|     Lambda 与函数式编程      |             一等公民             |      Java 8 后支持      |  表达力更强  |

2、核心总结

```
Kotlin 相比 Java 更简洁、安全（Null 安全）、现代化（函数式+协程），显著提升代码可维护性。
```

### 2.2 data class 与 sealed class

1、对比项

|   特性   |                  data class                  |                         sealed class                         |
| :------: | :------------------------------------------: | :----------------------------------------------------------: |
| 核心用途 |            数据承载(DTO / Model)             |                 状态封装(状态机 / 分支控制)                  |
| 自动方法 |  自动生成 equals、hashCode、toString、copy   |                         不会自动生成                         |
| 继承限制 |                  默认final                   |                     限制继承范围(同文件)                     |
| 常见场景 |             网络响应、数据库实体             |                    UI 状态管理、错误封装                     |
|   示例   | data class User(val id:Int, val name:String) | sealed class UiState { object Loading : UiState() <br>data class Success(val data: List\<Item>) : UiState()<br> data class Error(val msg:String) : UiState() } |

2、总结

```
data class → 数据载体（强调属性与结构）
sealed class → 受控状态集（强调类型安全与分支穷尽）
常用于 MVVM 的 ViewState 模型（sealed class 封装状态，data class 承载数据）
```

### 2.3 扩展函数

1、定义

```
扩展函数允许你在不修改类源码、不使用继承的情况下，为现有类添加新功能。

fun String.lastChar(): Char = this[this.length - 1]
println("Hello".lastChar()) // 输出 'o'
```

2、核心特征

```
实质是静态分发函数（编译期确定），不会修改原类。
静态绑定：根据接收者的静态类型决定调用函数。
```

3、使用场景

```
工具扩展：替代 Utils.xxx()→ fun File.readTextUTF8() = this.readText(Charsets.UTF_8)
DSL 构建：Compose、Anko、Ktor 等 Kotlin DSL 基石
增强第三方类功能：为 Retrofit/OkHttp 添加辅助方法
伴生对象扩展：模拟“静态方法扩展”
```

### 2.4 协程与线程

1、对比

|  对比项  |         协程(Coroutine)         |    线程(Thread)     |
| :------: | :-----------------------------: | :-----------------: |
| 调度方式 |  用户态(由 Kotlin 调度器管理)   | 内核态(由 OS 管理)  |
| 创建开销 |            小(KB 级)            |      大(MB 级)      |
| 切换成本 |           用户态切换            |  内核态上下文切换   |
| 阻塞行为 |      suspend挂起不阻塞线程      |   sleep()阻塞线程   |
| 生命周期 |      受 Scope 控制，可取消      |      独立存在       |
| 并发模型 |       顺序代码 + 异步挂起       | 并行执行 + 同步机制 |
| 应用场景 | IO 密集任务(网络、数据库、动画) |    CPU 密集计算     |

2、总结

```
协程是“轻量级线程”，通过挂起/恢复机制在单线程中实现高并发。
它构建在线程之上，但避免线程切换的高成本。
```

### 2.5 suspend挂起函数

1、核心原理

```
suspend 并不新建线程，而是通过状态保存实现可挂起函数，在挂起点让出线程，恢复后从上次执行位置继续。
```

2、状态机模型(编译后)

```
suspend fun example() {
    val a = api1()
    val b = api2(a)
    println(b)
}
编译器会将其转换为类似：
fun example(continuation: Continuation<Any?>): Any? {
    when (continuation.label) {
        0 -> { continuation.label = 1; return api1(continuation) }
        1 -> { continuation.label = 2; val a = continuation.result; return api2(a, continuation) }
        2 -> { val b = continuation.result; println(b); return Unit }
    }
}
```

3、运行机制

```
-编译器将函数转换为 状态机（State Machine）。
-每个挂起点对应一个状态（label）。
-Continuation 保存执行上下文与返回点。
-挂起时返回 COROUTINE_SUSPENDED，恢复时跳转到相应状态继续执行。
```

4、总结

```
suspend 函数是编译器生成的 Continuation 状态机，实现“非阻塞异步逻辑”，是 Kotlin 协程的核心
```

## 三 总结

|             面试官常问              |                  回答要点                  |
| :---------------------------------: | :----------------------------------------: |
|      Kotlin 相比 Java 的优势？      | 简洁、安全（空安全）、协程异步、函数式编程 |
| data class 与 sealed class 的区别？ |     前者用于数据结构，后者用于状态控制     |
|      扩展函数是否真正修改类？       |           否，本质是静态分发函数           |
|        协程为什么比线程轻？         |        用户态切换，依靠挂起恢复机制        |
|       suspend 函数底层实现？        | 编译为状态机，利用 Continuation 保存上下文 |

