---
title: IOS面试题——Swift运算符(7)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: 6ef3f0f6
date: 2024-03-27 12:10:24
---
## 一 面试题汇总

1. 什么是溢出运算符？
2. 什么是运算符重载？
3. Equatable协议与`==`运算符有什么关系？Swift为哪些类型提供默认的 Equatable 实现？
4. 如何自定义新的运算符？全局作用域使用operator进行声明<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是溢出运算符？

```
在 Swift 中，溢出运算符（Overflow Operators）是用来处理溢出运算的特殊运算符，
适用于数值类型（如 Int、UInt 等）。
当数值超出其类型的表示范围时，溢出运算符可以确保程序不会崩溃或抛出错误，而是以一种定义好的方式进行处理。

溢出运算符的类型：
1.溢出加法运算符（&+）
2.溢出减法运算符（&-）
3.溢出乘法运算符（&*）
```

### 2.2 什么是运算符重载？

```
运算符重载（Operator Overloading）
是指在 Swift 中，允许开发者为自定义的类型（如结构体、类、枚举等）重新定义运算符的行为。
这意味着你可以自定义已有运算符（如 +、-、* 等）如何与自定义类型的实例进行交互，而不需要修改运算符的名称。

常见的运算符重载示例：
1.加法运算符 (+)
2.减法运算符 (-)
...
```

### 2.3 Equatable协议与`==`运算符有什么关系？Swift为哪些类型提供默认的 Equatable 实现？

```
Equatable 协议允许你为类型实现 == 运算符，从而比较两个实例是否相等。
如果一个类型遵守了 Equatable 协议，你就可以使用 == 运算符来比较其实例。
Swift为许多内置类型（如Int、String、Array等）提供了默认的Equatable实现，因此无需手动实现相等性比较逻辑。
```

### 2.4 如何自定义新的运算符？全局作用域使用operator进行声明

```
1.使用 infix、prefix 或 postfix 来定义新的运算符，并用 operator 关键字指定符号。
2.使用函数来实现自定义运算符的行为。
3.可以设置运算符的优先级和结合性，以控制其与其他运算符的相对优先级。
4.自定义运算符使得代码更加简洁、可读，但应注意不要过度使用，以免影响代码的可理解性。
```
## 三 参考

* [简书—Swift运算符](https://www.jianshu.com/p/410f01d9e638)

