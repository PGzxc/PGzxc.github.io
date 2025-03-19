---
title: IOS面试题——Swift内存管理(9)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: 602f36ee
date: 2024-03-27 15:55:38
---
## 一 面试题汇总

1. swift 中内存管理方案？ARC引用类型有几种？strong、weak、unowned
2. Swift闭包循环引用如何产生，怎么解决？
3. 能否在定义闭包属性的同时引用self？lazy
4. 如果lazy属性是闭包调用的结果，是否需要考虑循环引用问题？
5. 什么是逃逸闭包?逃逸闭包能否捕获inout参数？@escaping<!--more-->
6. Swift中指针类型有哪几种？

## 二 面试题解答(仅供参考)

### 2.1 swift 中内存管理方案？ARC引用类型有几种？strong、weak、unowned

```
在 Swift 中，内存管理是通过 ARC 来进行的，主要分为以下几种引用类型：

1.强引用（Strong Reference）：默认行为，保持对象不被释放。
2.弱引用（Weak Reference）：不会保持对象，不会增加引用计数，当对象释放时，自动变为 nil。
3.无主引用（Unowned Reference）：类似于弱引用，但对象释放后不会自动变为 nil，访问已释放的对象会引发错误。

ARC 会自动管理这些引用类型，帮助开发者减少内存泄漏和循环引用的问题。
```

### 2.2 Swift闭包循环引用如何产生，怎么解决？

```
闭包循环引用发生在闭包捕获了 self，同时 self 又持有对闭包的引用，形成强引用循环。

解决方法：
1.使用 weak 引用：当你希望避免闭包强引用对象时，可以使用 weak，并且确保对象在闭包执行期间可能会被释放。
2.使用 unowned 引用：当你确信闭包中的对象在闭包调用时不会被释放时，可以使用 unowned，避免强引用循环。
3.捕获列表：通过捕获列表 [weak self] 或 [unowned self] 明确指定闭包如何捕获对象，从而避免循环引用
```

### 2.3 能否在定义闭包属性的同时引用self？lazy

```
1.lazy 关键字允许闭包在第一次使用时初始化，这样可以避免在初始化对象时就捕获 self。
2.如果闭包中引用 self，使用 weak 或 unowned 来避免闭包循环引用。
3.weak引用会在对象被释放后自动置为nil，而unowned引用则假设对象不会被释放，
如果对象被释放，访问会导致运行时错误。
```

### 2.4 如果lazy属性是闭包调用的结果，是否需要考虑循环引用问题？

```
即使是 懒加载闭包属性，如果闭包捕获了self，并且self又持有对闭包的引用，依然会引发闭包循环引用。

为了解决这个问题，可以使用 weak 或 unowned 引用来避免循环引用
1.weak引用适用于self可能被释放的情况，闭包中捕获的self会在对象释放时自动变为 nil。
2.unowned引用适用于self不会被释放的情况，如果self被释放，访问闭包中的self会导致运行时错误。
```
### 2.5 什么是逃逸闭包?逃逸闭包能否捕获inout参数？@escaping

```
1.逃逸闭包是指在函数返回后才执行的闭包，通常用于异步任务、回调等场景。
2.使用 @escaping 标记闭包为逃逸闭包。
3.逃逸闭包不能捕获 inout 参数，因为 inout 参数的作用域仅限于函数内部，不能在闭包内修改或访问它。
```

### 2.6 Swift中指针类型有哪几种？

```
Swift 中的指针类型主要有：

1.UnsafePointer：指向常量的指针。
2.UnsafeMutablePointer：指向可变值的指针。
3.UnsafeMutableRawPointer：指向原始内存的可变指针。
4.UnsafeRawPointer：指向原始内存的不可变指针。
5.AutoreleasingUnsafeMutablePointer：自动释放的可变指针。

这些指针类型为与 C 语言和底层操作系统进行交互提供了灵活性，
但在正常的 Swift 开发中，一般不需要直接使用指针类型，除非涉及到与底层内存管理或其他语言的交互。
```

## 三 参考

* [简书—Swift内存管理](https://www.jianshu.com/p/410f01d9e638)

