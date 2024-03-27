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
在编程中，溢出运算符是用于处理整数运算中可能发生的溢出情况的一种特殊运算符。
当在进行整数运算时，如果结果超出了目标数据类型的表示范围，就会发生溢出。
溢出运算符允许开发者明确地指示编译器，允许这种溢出情况的发生，而不是默认产生运行时错误。

在 Swift 中，有两种溢出运算符：&+（溢出加法）和&-（溢出减法）。
这两个运算符可以用于对整数进行加法和减法运算，而不会因为结果超出数据类型范围而导致运行时错误。

示例：
swift
Copy code
let x: UInt8 = 250
let y: UInt8 = 10

// 使用溢出运算符进行加法运算
let sum = x &+ y // 250 + 10 = 260，超出 UInt8 的表示范围，会发生溢出
print(sum) // 输出：10

// 使用溢出运算符进行减法运算
let difference = x &- y // 250 - 10 = 240，超出 UInt8 的表示范围，会发生溢出
print(difference) // 输出：240

在这个示例中，我们使用了 &+ 和 &- 溢出运算符来执行加法和减法运算。
即使结果超出了 UInt8 的表示范围（0 到 255），我们也不会收到编译器错误或者运行时错误。
相反，结果会在发生溢出后进行回绕，重新从数据类型的最小值或最大值开始计算。
```

### 2.2 什么是运算符重载？

```
运算符重载（Operator Overloading）是一种编程技术，
它允许你重新定义已有的运算符（如加法、减法、乘法等）的行为，以适应自定义类型的需求
。通过运算符重载，你可以为自定义类型提供与内置类型相似的语法和行为，从而使代码更加直观和易于理解。

在 Swift 中，可以通过实现特定的运算符函数来对运算符进行重载。
例如，通过实现 + 运算符函数，你可以为自定义类型定义加法运算的行为。
Swift 中的运算符重载仅适用于自定义类型，不能用于内置类型。

示例：
下面是一个自定义向量类型 Vector，我们将为其重载加法运算符 +：

struct Vector {
    var x: Double
    var y: Double
    
    // 定义加法运算符函数
    static func + (left: Vector, right: Vector) -> Vector {
        return Vector(x: left.x + right.x, y: left.y + right.y)
    }
}

let vector1 = Vector(x: 1.0, y: 2.0)
let vector2 = Vector(x: 3.0, y: 4.0)

let sum = vector1 + vector2 // 使用 + 运算符进行向量相加
print(sum) // 输出：Vector(x: 4.0, y: 6.0)

在这个示例中，我们通过实现 + 运算符函数，为自定义类型 Vector 定义了加法运算的行为。
当我们对两个 Vector 实例使用 + 运算符时，实际上是调用了我们自定义的加法运算符函数，
从而实现了向量相加的功能。
```

### 2.3 Equatable协议与`==`运算符有什么关系？Swift为哪些类型提供默认的 Equatable 实现？

```
Equatable 协议是 Swift 中的一个协议，用于表示可比较相等性的类型。
该协议要求遵循者实现一个相等性运算符 ==，用于比较两个实例是否相等。
当类型遵循 Equatable 协议时，可以使用 == 运算符来比较两个该类型的实例，判断它们是否相等。

在 Swift 中，对于某些内置的数据类型（如整数、浮点数、字符串、数组、字典、集合等），
编译器会自动为其提供默认的 Equatable 实现。
这意味着你无需手动为这些类型编写相等性运算符的实现，即可直接使用 == 运算符来比较它们的相等性。

示例：

let a = 5
let b = 5
if a == b {
    print("a 等于 b")
} else {
    print("a 不等于 b")
}

let str1 = "Hello"
let str2 = "Hello"
if str1 == str2 {
    print("str1 等于 str2")
} else {
    print("str1 不等于 str2")
}
在这个示例中，我们分别比较了两个整数 a 和 b，以及两个字符串 str1 和 str2 的相等性。
由于整数和字符串都是遵循 Equatable 协议的类型，并且 Swift 提供了默认的 Equatable 实现，
因此我们可以直接使用 == 运算符来比较它们的相等性。
```

### 2.4 如何自定义新的运算符？全局作用域使用operator进行声明

```
在 Swift 中，你可以通过使用 operator 关键字在全局作用域中声明自定义的运算符。
自定义运算符可以是新的前缀、后缀、中缀运算符，也可以是赋值运算符。

语法：

prefix operator <operator> // 前缀运算符声明
postfix operator <operator> // 后缀运算符声明
infix operator <operator>: <precedence> // 中缀运算符声明，指定优先级

<operator>：自定义的运算符符号。
<precedence>：运算符的优先级，可以是预定义的优先级组，也可以是一个整数，越高的优先级，优先级越高。

示例：

// 定义一个自定义的前缀逻辑非运算符
prefix operator +++

// 为前缀逻辑非运算符实现逻辑非操作
prefix func +++(operand: Bool) -> Bool {
    return !operand
}

// 使用自定义的前缀逻辑非运算符
let x = true
let y = +++x // 等同于 !x
print(y) // 输出：false

在这个示例中，我们使用 prefix 关键字声明了一个名为 +++ 的前缀运算符。
然后，我们为这个运算符实现了一个函数，用于对布尔值进行逻辑非操作。
最后，我们使用了自定义的前缀运算符 +++ 来对一个布尔值进行逻辑非操作。
```
## 三 参考

* [简书—Swift运算符](https://www.jianshu.com/p/410f01d9e638)

