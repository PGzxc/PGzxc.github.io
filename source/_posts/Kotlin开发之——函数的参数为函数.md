---
title: Kotlin开发之——函数的参数为函数
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - Kotlin
abbrlink: c991574e
date: 2021-07-01 17:07:24
---
## 一 说明

群里有人问了这个一个问题，现象如下：类的构造方法为一个函数时，如何传值？
![][1]

调用时？

![][2]
<!--more-->

## 二 问题分析

### 2.1 构造函数

```
class QRcodeAnalyzer(private val resultHandler: (String?) -> Unit)
```
### 2.2 参数分析
* val后面的resultHandler是一个变量(函数可以作为变量)
* 对象后面`:`是对象类型` (String?) -> Unit)`
* ` (String?) -> Unit)`：调用前参数是可空String类型，调用后没有参数返回，是一个函数
* 综合起来：resultHandler是一个参数是可空String类型，无返回值的函数

## 三 函数编写

### 3.1  参数-简单形式

```
class QRcodeAnalyzer(private val resultHandler: (String?) -> Unit)
val handler=fun(str:String?){
    print(str)
}
fun main() {
    var a=QRcodeAnalyzer(handler)
}
```

### 3.2 参数-简写形式(将fun去掉)

```
class QRcodeAnalyzer(private val resultHandler: (String?) -> Unit)
val handler = { str: String? ->
    print(str)
}
fun main() {
    var a=QRcodeAnalyzer(handler)
}
```

### 3.3 函数形式(`handler()`)

```
class QRcodeAnalyzer(private val resultHandler: (String?) -> Unit)
fun handler():(str:String?)->Unit= { print(it)}
fun main() {
    var a=QRcodeAnalyzer(handler())
}
```




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-kotlin/kotlin-param-fun-define.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-kotlin/kotlin-param-fun-use.png