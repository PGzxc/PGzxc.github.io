---
title: IOS面试题——Swift模式匹配(12)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: 8bd99169
date: 2024-03-27 16:43:18
---
## 一 面试题汇总

1. 什么是模式匹配？
2. 什么是通配符模式？标识符模式？值绑定模式？元组模式？枚举Case模式？可选模式？类型转换模式？表达式模式？
3. 通配符匹配中`_`和`_?`有什么区别？
4. 枚举Case模式中`if case`语句是什么？<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是模式匹配？

```
模式匹配（Pattern Matching）是一种在编程中用于检查数据是否符合某种模式或者结构的技术。
在很多编程语言中都有模式匹配的支持，包括 Swift、Python、Haskell 等。
它通常用于条件语句、循环语句、函数参数匹配等场景中。

在 Swift 中，模式匹配是一种强大且灵活的特性，
它支持多种模式，包括常量模式、变量模式、元组模式、可选模式、枚举模式、结构体模式等。
通过模式匹配，可以轻松地对数据进行分解、匹配和提取，以实现灵活的逻辑控制和数据处理。

以下是一些常见的 Swift 中模式匹配的用法：

1-switch 语句中的模式匹配： 使用 switch 语句可以根据不同的情况对数据进行匹配和处理。

let value = 5
switch value {
case 0:
    print("Value is zero")
case 1...5:
    print("Value is between 1 and 5")
default:
    print("Value is greater than 5")
}

2-元组模式匹配： 可以使用元组模式匹配来同时匹配多个值。

let point = (1, 2)
switch point {
case (0, 0):
    print("Origin")
case (_, 0):
    print("On x-axis")
case (0, _):
    print("On y-axis")
case (-2...2, -2...2):
    print("Inside the square")
default:
    print("Outside the square")
}

3-可选模式匹配： 使用可选模式匹配来判断可选值是否包含特定值。

let optionalValue: Int? = 5
if case .some(5) = optionalValue {
    print("Value is 5")
}

4-枚举模式匹配： 可以使用枚举模式匹配来匹配枚举值。

enum Direction {
    case north
    case south
    case east
    case west
}

let direction = Direction.east
switch direction {
case .north, .south:
    print("Moving north or south")
case .east, .west:
    print("Moving east or west")
}

通过模式匹配，可以编写出更加简洁、清晰和安全的代码，提高代码的可读性和可维护性。
```

### 2.2 什么是通配符模式？标识符模式？值绑定模式？元组模式？枚举Case模式？可选模式？类型转换模式？表达式模式？

```
在 Swift 中，模式匹配提供了多种模式来匹配数据。下面是常见的模式类型：

1-通配符模式（Wildcard Pattern）： 使用下划线 _ 表示，匹配任意值。

let value = 5
switch value {
case _:
    print("Match any value")
}

2-标识符模式（Identifier Pattern）： 使用标识符来匹配值，并且将匹配到的值绑定到标识符上。

let point = (3, 4)
switch point {
case let (x, y):
    print("x is \(x), y is \(y)")
}

3-值绑定模式（Value-Binding Pattern）： 使用 let 或 var 关键字将匹配到的值绑定到一个常量或变量上。

let point = (3, 4)
switch point {
case let (x, y) where x == y:
    print("x and y are equal, both are \(x)")
}

4-元组模式（Tuple Pattern）： 使用元组来匹配复合类型的值。

let point = (3, 4)
switch point {
case (0, 0):
    print("Origin")
case (_, 0):
    print("On x-axis")
case (0, _):
    print("On y-axis")
case (_, _):
    print("Arbitrary point")
}

5-枚举 Case 模式（Enumeration Case Pattern）： 使用枚举成员来匹配枚举类型的值。

enum Direction {
    case north
    case south
    case east
    case west
}

let direction = Direction.east
switch direction {
case .north, .south:
    print("Moving north or south")
case .east, .west:
    print("Moving east or west")
}

6-可选模式（Optional Pattern）： 
使用 if case let 或 if case var 来匹配可选类型的值，并将解包后的值绑定到一个常量或变量上。

let optionalValue: Int? = 5
if case let .some(value) = optionalValue {
    print("Value is \(value)")
}

7-类型转换模式（Type-Casting Pattern）： 使用 is 或 as 关键字来检查值的类型，并且将其转换为特定类型。

let array: [Any] = [5, "Hello", true]
for element in array {
    if let value = element as? Int {
        print("Found an integer: \(value)")
    } else if let value = element as? String {
        print("Found a string: \(value)")
    } else if let value = element as? Bool {
        print("Found a boolean: \(value)")
    }
}

8-表达式模式（Expression Pattern）： 使用表达式来匹配值。

let number = 5
switch number {
case 1...10:
    print("Number is between 1 and 10")
case 11...20:
    print("Number is between 11 and 20")
default:
    print("Number is not in the range")
}

这些模式提供了灵活的方式来匹配和处理不同类型的值，并且可以在 switch 语句、if 语句等地方使用。
```

### 2.3 通配符匹配中`_`和`_?`有什么区别？

```
在 Swift 中，通配符模式用于匹配任意值，包括忽略值或可选值。
_ 和 _? 是两种不同的通配符模式，它们的区别在于对可选值的处理方式。

1-_： 下划线 _ 用于匹配任意值，包括可选类型的值。
当使用 _ 时，表示忽略匹配到的值，不对其进行绑定。

let optionalValue: Int? = 5
if case _ = optionalValue {
    print("Matched any optional value")
}
在这个示例中，_ 匹配了可选类型的值 optionalValue，但是没有将匹配到的值绑定到任何标识符上。

2-_?： 下划线加问号 _? 也用于匹配任意值，但它只匹配可选类型的值，
并且将匹配到的值解包并绑定到一个标识符上。如果匹配到的值是 nil，则匹配失败。

let optionalValue: Int? = 5
if case let _? = optionalValue {
    print("Matched a non-nil optional value")
}

在这个示例中，_? 匹配了可选类型的值 optionalValue，
如果 optionalValue 不为 nil，则将其解包并绑定到一个标识符上，否则匹配失败。

总结来说，_ 用于忽略任意值，包括可选值，而 _? 则专门用于匹配可选值，
并且将非 nil 的可选值解包并绑定到一个标识符上。
```

### 2.4 枚举Case模式中`if case`语句是什么？

```
if case 语句是 Swift 中用于模式匹配的一种语法结构，特别用于匹配枚举的不同 case。
它允许你在条件语句中对枚举类型进行匹配，并且只在匹配成功时执行对应的代码块。

通常情况下，if case 语句与可选绑定一起使用，以检查枚举是否匹配特定的 case，
并且将匹配到的值绑定到一个标识符上。
如果匹配成功，代码块内的语句将会执行。

下面是一个简单的示例，演示了 if case 语句的使用：

enum Result {
    case success(Int)
    case failure(String)
}

let result = Result.success(10)

if case .success(let value) = result {
    print("Success with value: \(value)")
} else {
    print("Not a success")
}
```

## 三 参考

* [简书—Swift模式匹配](https://www.jianshu.com/p/410f01d9e638)

