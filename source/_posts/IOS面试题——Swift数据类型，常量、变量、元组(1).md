---
title: IOS面试题——Swift数据类型，常量、变量、元组(1)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: cf7877a4
date: 2024-03-27 10:32:05
---
## 一 面试题汇总

1. 值类型和引用类型区别，swift中值类型有哪些，引用类型有哪些。和OC相比有什么区别？
2. Optional可选类型属于引用类型还是值类型？如何实现的
3. 常量和变量分别如何声明？
4. 可选类型解包方式有哪些？
5. 多重可选项的情况是怎么处理的？<!--more-->
6. 什么是可选链？可选链的结果是可选项么？
7. 什么是元祖，元祖能做什么？
8. 什么是字面量，字面量协议可以做什么？

## 二 面试题解答(仅供参考)

### 2.1 值类型和引用类型区别，swift中值类型有哪些，引用类型有哪些。和OC相比有什么区别？

```
在 Swift 中，主要的区别是值类型是按值传递的，而引用类型是按引用传递的。

1-值类型（Value Types）：

1.1-结构体（Structs）：结构体是一种用于封装相关属性和方法的数据类型。
1.2-枚举（Enums）：枚举是一种用于定义一组相关值的数据类型。
1.3-元组（Tuples）：元组是将多个值组合在一起形成一个复合值的方式。

2-引用类型（Reference Types）：
2.1-类（Classes）：类是一种复杂数据类型，它允许创建具有共享行为和状态的对象。
2.2-闭包（Closures）：闭包是可以在代码中被传递和引用的独立的功能代码块。

3-区别与 OC 相比：
3.1-赋值方式：Swift 中的值类型在赋值和传递时是复制的，而引用类型则是传递引用。
3.2-内存管理：Swift 中的引用类型由 ARC（自动引用计数）来管理内存，
类似于 Objective-C，但 Swift 中没有像 Objective-C 中的强引用循环问题。
3.3-可变性：在 Swift 中，结构体是值类型，因此默认情况下是不可变的，
需要使用 mutating 关键字来声明可变方法。而 Objective-C 中的类默认是可变的。
3.4-协议（Protocols）：Swift 中的值类型和引用类型都可以遵循协议，
而 Objective-C 中只有类可以遵循协议。
3.5-可选链式调用：Swift 中的可选链式调用使得处理值类型和引用类型的方式更加统一。

总的来说，Swift 中的值类型和引用类型更加统一，提供了更加清晰和一致的语义，
并且减少了一些常见的编程错误，比如强引用循环问题。
```

### 2.2 Optional可选类型属于引用类型还是值类型？如何实现的

```
在 Swift 中，Optional（可选类型）属于枚举类型，而枚举类型本身是值类型。
所以，Optional 也是值类型。

Optional 是用来表示一个值是否存在的类型。它可以包含一个具体的值，也可以表示值不存在（nil）。
在 Swift 中，Optional 是通过一个枚举来实现的，
它有两个 case：一个是 .some(Wrapped)，表示值存在，并包含具体的值；
另一个是 .none，表示值不存在，即 nil。

下面是 Optional 的简化实现：

swift
Copy code
enum Optional<Wrapped> {
    case some(Wrapped)
    case none
}

这样，你就可以使用 Optional 来包装任何类型的值，使得这些值可以是有值的，也可以是 nil。

由于 Optional 是值类型，因此在传递参数或者赋值给其他变量时，会进行值的复制。
这样的设计使得 Swift 中的空值处理更加安全和可靠
```

### 2.3 常量和变量分别如何声明？

```
在 Swift 中，你可以使用 let 关键字声明常量（不可变变量），使用 var 关键字声明变量（可变变量）。
```

### 2.4 可选类型解包方式有哪些？

```
在 Swift 中，解包可选类型的值有多种方式，主要取决于你需要的情况和你对可选值的信任程度。
下面是几种常用的解包方式：

1-强制解包（Force Unwrapping）：
使用感叹号 ! 来强制解包可选值。如果可选值为 nil，强制解包将导致运行时错误。
因此，只有在你确定可选值一定有值时才应该使用强制解包。

let optionalValue: Int? = 42
let unwrappedValue = optionalValue! // 强制解包

2-可选绑定（Optional Binding）：
使用可选绑定来判断可选值是否包含值，并且将其解包赋值给一个临时的非可选变量。
可选绑定通过 if let 或 guard let 语句来实现。

if let unwrappedValue = optionalValue {
    // 使用 unwrappedValue
} else {
    // 可选值为 nil 的处理逻辑
}

3-可选链式调用（Optional Chaining）：
使用可选链式调用可以在可选值不为 nil 时调用属性、方法或下标，并且不需要解包。
如果可选值为 nil，则整个调用链会返回 nil。

let length = optionalString?.count // 使用可选链式调用获取字符串的长度

4-隐式解包可选类型（Implicitly Unwrapped Optionals）：
在声明可选类型时使用感叹号 ! 而不是问号 ?，
表示你信任这个可选值一定会有值，并且在访问时不需要每次解包。
但是，如果在使用时发现可选值为 nil，则会触发运行时错误。

let implicitlyUnwrappedValue: Int! = optionalValue
let unwrappedValue = implicitlyUnwrappedValue // 不需要显式解包

5-nil 合并运算符（Nil Coalescing Operator）：
使用 ?? 运算符来提供一个默认值，如果可选值为 nil，则返回默认值。

let unwrappedValue = optionalValue ?? defaultValue // 使用默认值 defaultValue

每种解包方式都有其适用的场景，需要根据具体情况来选择最合适的方式。
```

### 2.5 多重可选项的情况是怎么处理的？

```
在 Swift 中，多重可选项是指一个可选值包含另一个可选值的情况。
这种情况下，你需要使用嵌套的可选绑定或者可选链式调用来解包多重可选项。

1-使用可选绑定解包多重可选项：

let optionalOptionalValue: Int?? = 42

if let unwrappedOptional = optionalOptionalValue {
    if let unwrappedValue = unwrappedOptional {
        print("Unwrapped value: \(unwrappedValue)")
    } else {
        print("Inner optional is nil")
    }
} else {
    print("Outer optional is nil")
}

2-使用可选链式调用解包多重可选项：

let optionalOptionalValue: Int?? = 42

if let unwrappedValue = optionalOptionalValue?? {
    print("Unwrapped value: \(unwrappedValue)")
} else {
    print("Optional is nil or contains nil")
}

在这个例子中，optionalOptionalValue?? 表示对外层可选值和内层可选值都进行解包，
如果其中任何一个是 nil，整个表达式将返回 nil。

另外，还可以结合使用 if let 和 guard let 语句来减少嵌套：

if let unwrappedOptional = optionalOptionalValue, let unwrappedValue = unwrappedOptional {
    print("Unwrapped value: \(unwrappedValue)")
} else {
    print("Outer optional is nil or inner optional is nil")
}
无论使用哪种方式，都需要小心处理多重可选项的情况，以确保正确地解包可选值并处理可能的 nil 值。
```

### 2.6 什么是可选链？可选链的结果是可选项么？

```
可选链是一种在 Swift 中安全地访问和调用可选值属性、方法和下标的方法。
它允许你通过在可选值后面使用问号 ? 来访问属性、方法或下标，
如果可选值为 nil，整个表达式将返回 nil，而不会导致运行时错误。

可选链的结果是一个可选项。如果链式调用成功（即可选值不为 nil），则结果是包含调用结果的可选项；
如果链式调用失败（即可选值为 nil），则结果是 nil。
```

### 2.7 什么是元祖，元祖能做什么？

```
元组（Tuple）是 Swift 中的一种复合类型，它允许你将多个值组合成一个单一的复合值。
元组中的每个值可以是任意类型，且类型不必相同。

1-元组的定义和初始化
let myTuple: (Int, String, Bool) = (42, "Hello", true)

2-元组的访问：
print(myTuple.0) // 输出：42
print(myTuple.1) // 输出："Hello"
print(myTuple.2) // 输出：true

3-元组的解构
let (number, greeting, flag) = myTuple
print(number)    // 输出：42
print(greeting)  // 输出："Hello"
print(flag)      // 输出：true

4-元组的命名
let namedTuple = (number: 42, message: "Hello")
print(namedTuple.number)   // 输出：42
print(namedTuple.message)  // 输出："Hello"
```

### 2.8 什么是字面量，字面量协议可以做什么？

```
在编程中，字面量（Literal）是指代码中直接表示一个固定值的符号或文本。
字面量通常用于初始化变量、常量或者作为函数参数传递值。

在 Swift 中，字面量包括整数、浮点数、布尔值、字符串和其他一些特殊类型的字面量。例如：

1-整数字面量：42
2-浮点数字面量：3.14
3-布尔字面量：true、false
4-字符串字面量："Hello, world"

字面量协议（Literal Protocol）是一个 Swift 中的协议，用于定义类型可以通过字面量初始化的能力。
字面量协议允许你自定义类型（结构体、枚举或类）在初始化时接受特定类型的字面量值。

字面量协议可以做的事情包括：
1-初始化：字面量协议定义了用于从字面量值初始化类型的方法。
2-类型检查：通过字面量协议，你可以检查类型是否满足字面量初始化的要求。
3-语法糖：字面量协议使得编写代码时更加直观和简洁，因为可以像处理内置类型一样初始化自定义类型。
```

## 三 参考

* [简书—Swift数据类型，常量、变量、元组](https://www.jianshu.com/p/410f01d9e638)

