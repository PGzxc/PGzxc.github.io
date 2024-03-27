---
title: IOS面试题——Swift错误处理(15)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: b28c5df5
date: 2024-03-27 18:25:27
---
## 一 面试题汇总

1. 如何自定义错误？遵守Error协议
2. 如何抛出异常，如何捕获异常？throw，do-catch
3. 可以使用try?、try!调用可能会抛出Error的函数，这样就不用去处理Error
4. 如何定义以任何方式（抛错误、return等）离开代码块前必须要执行的代码？defer
5. fatalError有作用？可以做什么？<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 如何自定义错误？遵守Error协议

```
在 Swift 中，自定义错误通常是通过定义一个遵守 Error 协议的枚举类型来实现的。
这样可以确保你的错误类型符合 Swift 的错误处理规范，并且可以方便地与 do-catch 语句进行配合使用。

以下是一个示例，演示了如何定义一个遵守 Error 协议的自定义错误枚举类型：

enum CustomError: Error {
    case fileNotFound
    case networkError(message: String)
    case invalidData
}
在这个示例中，我们定义了一个名为 CustomError 的枚举类型，并让它遵守 Error 协议。
枚举中包含了一些代表不同错误情况的 case。
这样，我们就得到了一个自定义的错误类型，可以在程序中使用了。

使用这个自定义错误类型时，可以像处理 Swift 标准库中的错误类型一样来处理：

func fetchData() throws {
    // 模拟抛出一个自定义错误
    throw CustomError.networkError(message: "Network connection lost")
}

do {
    try fetchData()
} catch CustomError.fileNotFound {
    print("File not found error occurred")
} catch CustomError.networkError(let message) {
    print("Network error occurred: \(message)")
} catch CustomError.invalidData {
    print("Invalid data error occurred")
} catch {
    print("An error occurred: \(error)")
}

在这个示例中，我们定义了一个 fetchData() 函数，它会抛出一个自定义的错误。
在 do-catch 语句中，我们捕获了可能抛出的不同类型的错误，并根据错误类型进行相应的处理。
```

### 2.2 如何抛出异常，如何捕获异常？throw，do-catch

```
在 Swift 中，异常处理是通过 throw 关键字来抛出异常，以及通过 do-catch 语句来捕获异常的。
下面是基本的语法和用法：

1-抛出异常（Throwing）
要抛出异常，只需在可能抛出异常的代码块中使用 throw 关键字，并提供一个符合 Error 协议的实例。

enum CustomError: Error {
    case somethingWentWrong
}

func doSomething() throws {
    // 某些条件下抛出异常
    throw CustomError.somethingWentWrong
}

2-捕获异常（Catching）
要捕获异常，可以使用 do-catch 语句。
在 do 块中放置可能抛出异常的代码，然后在 catch 块中捕获并处理异常。例如：

do {
    try doSomething()
} catch CustomError.somethingWentWrong {
    print("Something went wrong!")
} catch {
    print("An error occurred: \(error)")
}
```

### 2.3 可以使用try?、try!调用可能会抛出Error的函数，这样就不用去处理Error

```
1-try?： 
如果你对可能抛出错误的函数或方法的结果不感兴趣，并且你希望在发生错误时返回 nil，可以使用 try?。
这样，如果函数或方法抛出错误，表达式的结果将会是 nil，否则将会是结果的可选值。例如：

func doSomething() throws -> Int {
    // 模拟抛出异常
    throw CustomError.somethingWentWrong
}

// 调用可能抛出错误的函数，不处理错误，结果将会是 Int? 类型
let result = try? doSomething()
print(result) // 打印 nil

2-try!： 
如果你确信调用的函数或方法不会抛出错误，或者你不关心是否抛出错误，可以使用 try!。
这样，编译器会在调用时自动将错误转换为运行时错误（即异常），如果函数或方法抛出错误，程序将会崩溃。
因此，应该谨慎使用 try!，只有在确定不会抛出错误时才使用。例如：

// 调用可能抛出错误的函数，忽略错误，直接使用结果
let result = try! doSomething()

总的来说，try? 和 try! 是一种简化错误处理的方式，但是它们都应该谨慎使用，
根据具体情况来决定是否合适。
```

### 2.4 如何定义以任何方式（抛错误、return等）离开代码块前必须要执行的代码？defer

```
在 Swift 中，你可以使用 defer 语句来定义在当前作用域退出之前必须要执行的代码块。
无论是通过正常返回、抛出异常、或者直接退出程序，
这些代码都会在离开作用域之前被执行，无论代码块是否发生了错误。

defer 语句可以出现在函数、方法、循环、或者任何代码块中，并且可以有多个 defer 语句，
它们按照在代码中的顺序逆序执行。以下是一个示例：

func processFile() throws {
    let file = openFile()
    defer {
        // 无论如何，都会在离开函数之前执行
        closeFile(file)
    }
    
    // 处理文件...
    
    if file.hasError {
        // 如果有错误，抛出异常
        throw FileError.fileCorrupted
    }
    
    // 其他处理...
}

do {
    try processFile()
} catch {
    // 处理错误
}

在上面的示例中，我们定义了一个 processFile 函数，
其中使用 defer 语句来确保在离开函数之前关闭文件。
无论函数如何退出（正常返回或者抛出异常），closeFile 函数都会被调用以确保资源的释放。
这种技术可以用来确保资源的正确释放和清理，以避免内存泄漏和资源泄漏问题。
```

### 2.5 fatalError有作用？可以做什么？

```
fatalError 是一个函数，它会在调用时使程序立即终止，并打印一条错误信息。
通常情况下，fatalError 用于表示在程序中发现了一个严重的错误，并且无法继续执行下去的情况。
它类似于其他编程语言中的 assert 或 panic。
```
## 三 参考

* [简书—Swift错误处理](https://www.jianshu.com/p/410f01d9e638)

