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
模式匹配 是Swift中的一种强大特性，它允许你检查值的类型、结构或内容，并根据匹配的情况执行相应的代码。
模式匹配通常用于 switch 语句、if case 语句、guard case 语句等场合，可以简化条件判断和代码逻辑。

常用于：
1.基本的模式匹配 - switch 语句
2.元组模式匹配
3.类型模式匹配
4.值绑定
5.if case 和 guard case 的模式匹配
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
_：匹配任意值，通常用于忽略匹配的具体内容。
_?：专门用于匹配 Optional 类型的值，可以匹配 some 或 none，并且不关心具体的值。
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

