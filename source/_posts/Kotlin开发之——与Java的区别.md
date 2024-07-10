---
title: Kotlin开发之——与Java的区别
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 区别
abbrlink: ba69d8f8
date: 2017-12-19 18:16:06
---
# 前言
语句和表达式在Kotlin和Java中是不一样的。

- 在Kotlin中，if是一个表达式，不是一个语句
- 表达式有返回值，语句不返回任何值
- 在Kotlin中，绝大多数的控制结构都是表达式，除了一些Loops循环
- Kotlin通过把控制结构和表达式一起让我们可以非常简洁地表达很多常见的模式
- Java中的赋值是表达式，而在Kotlin中，赋值变成了语句，从而帮助我们避免对比较和赋值产生混淆
<!--more-->

# 实例

- java中赋值   

	![][1]

注：java中"="是赋值表达式，返回a=8的结果给b，输出b==8

- Kotlin中赋值

	![][2]

注：Kotlin中"="是语句，b需要表达式，不匹配，出错！



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/java-express.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/kotlin-express.png