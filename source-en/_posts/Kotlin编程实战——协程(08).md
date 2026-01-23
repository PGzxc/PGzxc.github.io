---
title: Kotlin编程实战——协程(08)
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: 7a7d0a5f
date: 2022-11-05 09:40:47
---
## 一 概述

* 协程基础
* 取消与超时
* 组合挂起函数
* 协程上下文与调度器
* 异步流(Flow)

<!--more-->

## 二 协程基础

* 第一个协程程序
* 桥接阻塞与非阻塞的世界
* 等待一个作业
* 结构化的并发
* 作用域构建器
* 提取函数重构
* 协程很轻量

## 三 取消与超时

* 取消协程的执行：job.cancel()
* 取消是协作的
* 使计算代码可取消
* 在 finally 中释放资源
* 运行不能取消的代码块
* 超时

## 四 组合挂起函数

* 默认顺序调用
* 使用 async 并发
* 惰性启动的 async
* async 风格的函数
* 使用 async 的结构化并发

## 五  协程上下文与调度器

* 协程上下文(CoroutineContext)
* 协程调度器 (CoroutineDispatcher)
* 子协程
* 父协程的职责
* 命名协程以用于调试
* 组合上下文中的元素
* 协程作用域
* 线程局部数据

## 六 异步流(Flow)

* 表示多个值
* 流是冷的(收集的时候才运行)
* 流取消基础
* 流构建器
* 过渡流操作符
* 流是连续的
* 流上下文
* 缓冲
* 组合多个流
* 展平流

## 七 思维导图

![][1]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-kotlin/kotlin-learn-struct-8.png