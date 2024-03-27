---
title: IOS面试题——Swift属性，单例(5)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: '119e3701'
date: 2024-03-27 11:36:08
---
## 一 面试题汇总

1. 什么是计算属性，什么是存储属性？只读计算属性，延迟存储属性呢？
2. 枚举的原始值属于计算属性还是存储属性？
3. 什么是属性观察器？willSet，didSet
4. 实例属性和类型属性有什么区别？
5. Swift单例如何实现？<!--more-->
6. 存储类型属性有什么特点? 在什么时候初始化？多个线程同时访问呢？

## 二 面试题解答(仅供参考)

### 2.1 什么是计算属性，什么是存储属性？只读计算属性，延迟存储属性呢？

```
在Swift中，属性可以分为计算属性(Computed Properties)和存储属性（Stored Properties）。
此外，还有只读计算属性（Read-Only Computed Properties）和延迟存储属性（Lazy Stored Properties）等特殊类型。

1-存储属性（Stored Properties）：
存储属性是直接存储在实例的内存中的属性。它们可以是常量属性（用 let 声明）或变量属性（用 var 声明）。
当创建一个新的实例时，存储属性会分配内存并设置初始值，
这些初始值可以通过构造函数参数进行设置，也可以在定义时给出默认值。

struct Person {
    var name: String  // 存储属性
    var age: Int      // 存储属性
}

var person = Person(name: "Alice", age: 30)

2-计算属性（Computed Properties）：
计算属性是通过 getter 和 optional setter 方法来间接获取和设置值的属性。
它们不直接存储值，而是提供一个 getter 方法来获取值，并可以提供一个可选的 setter 方法来设置值。
计算属性可以提供额外的计算逻辑，例如对其他存储属性的操作。

struct Circle {
    var radius: Double  // 存储属性

    var area: Double {  // 计算属性
        return Double.pi * radius * radius
    }
}

3-只读计算属性（Read-Only Computed Properties）：
只读计算属性只有 getter 方法，没有 setter 方法，
因此它们的值只能在 getter 方法中计算并返回，而不能被修改。
在计算属性的声明前加上 get 关键字，即可声明只读计算属性。

struct Circle {
    var radius: Double

    var area: Double {  // 只读计算属性
        return Double.pi * radius * radius
    }
}

4-延迟存储属性（Lazy Stored Properties）：
延迟存储属性是指当属性首次被访问时才进行初始化的属性。
这种属性通常用于初始化需要复杂或者大量资源的属性，
可以延迟到实际需要时再进行初始化，以提高性能和节省资源。

class DataManager {
    lazy var data: [String] = {
        var data = [String]()
        // 加载数据的耗时操作
        return data
    }()
}

在这个示例中，data 属性是一个延迟存储属性，它在首次被访问时执行闭包并进行初始化。
```

### 2.2 枚举的原始值属于计算属性还是存储属性？

```
枚举的原始值属于存储属性。

枚举可以关联一个或多个原始值，这些原始值可以是字符串、字符、整数或浮点数类型。
原始值可以用于快速比较枚举成员的相等性，以及在不同的数据类型之间进行转换。

当你为枚举定义原始值时，Swift 会自动为每个枚举成员分配对应的原始值，
并将这些值存储在枚举实例的内存中。
因此，枚举的原始值属于存储属性，而不是计算属性。

下面是一个示例，演示了枚举的原始值的定义和使用：

enum CompassPoint: Int {
    case north = 1
    case south = 2
    case east = 3
    case west = 4
}

print(CompassPoint.north.rawValue) // 输出：1
print(CompassPoint.east.rawValue)  // 输出：3
在这个示例中，rawValue 是一个存储在枚举实例中的存储属性，用于存储枚举成员的原始值。
```

### 2.3 什么是属性观察器？willSet，didSet

```
属性观察器是一种用于监视和响应属性值变化的机制，
在 Swift 中，可以通过 willSet 和 didSet 来实现属性观察器。

1-willSet：在属性值即将发生改变之前被调用，可以在 willSet 中访问新值，
也可以使用默认参数名 newValue。
2-didSet：在属性值已经发生改变之后被调用，可以在 didSet 中访问旧值，
也可以使用默认参数名 oldValue。

属性观察器可以用于检测属性值的变化，并在值变化时执行特定的代码。
这种机制使得我们可以在属性值发生变化时进行一些额外的操作，例如更新用户界面、触发其他事件等。
```

### 2.4 实例属性和类型属性有什么区别？

```
实例属性(Instance Properties)和类型属性(Type Properties)是Swift中的两种不同类型的属性，
它们有以下区别：

1-实例属性（Instance Properties）：
1.1-属于实例：实例属性是属于特定实例的属性，每个实例都有自己的一组实例属性。
每个实例都拥有自己的一份属性值，它们在内存中独立存在。
1.2-用于存储实例特定的数据：实例属性用于存储实例特定的数据，每个实例的属性值可以不同。
1.3-声明在类、结构体或枚举中：实例属性可以声明在类、结构体或枚举中，并且必须在实例化之后才能访问或修改。

2-类型属性（Type Properties）：

2.1-属于类型：类型属性是属于整个类型本身的属性，而不是属于类型的实例。
无论创建了多少个实例，类型属性只有一份拷贝，它是共享的。
2.2-用于存储类型相关的数据：类型属性用于存储与类型本身相关的数据，
这些数据对于类型的所有实例来说都是相同的。

2.3-使用 static 或 class 关键字声明：类型属性可以使用 static 关键字来声明存储属性，
也可以使用 class 关键字来声明计算属性。
类可以使用 class 关键字来声明类属性，而结构体和枚举则只能使用 static 关键字。

3-区别总结：
所属范围不同：实例属性属于实例，类型属性属于类型本身。
存储方式不同：实例属性存储在每个实例中，类型属性只有一份拷贝，共享于所有实例。
声明方式不同：实例属性声明在类、结构体或枚举中，类型属性使用 static 或 class 关键字声明。
```

### 2.5 Swift单例如何实现？

```
在 Swift 中，你可以使用 struct 关键字来定义一个单例。
一个简单的单例实现通常包括一个私有的静态存储属性来存储唯一的实例，并提供一个公共的静态方法来访问该实例。

下面是一个使用 struct 来实现单例的示例：

struct MySingleton {
    // 私有的静态存储属性，用于存储唯一的实例
    private static var sharedInstance: MySingleton = MySingleton()

    // 私有的初始化方法，防止外部通过 init 创建实例
    private init() {}

    // 公共的静态方法，用于访问单例实例
    static func shared() -> MySingleton {
        return sharedInstance
    }

    // 添加其他实例方法和属性
    func doSomething() {
        print("Singleton is doing something")
    }
}

// 使用单例
let singleton = MySingleton.shared()
singleton.doSomething()

在这个示例中，MySingleton 结构体中有一个私有的静态存储属性 sharedInstance，
用于存储唯一的实例。构造函数被标记为私有，以防止外部通过 init 创建新的实例。
通过公共的静态方法 shared() 来访问单例实例，这个方法会返回存储在sharedInstance 中的唯一实例。
```

### 2.6 存储类型属性有什么特点? 在什么时候初始化？多个线程同时访问呢？

```
存储类型属性（Stored Type Properties）是属于类型本身的属性，而不是属于类型的实例。
它们与类型相关联，而不是与类型的实例相关联。存储类型属性具有以下特点：

1-共享性： 存储类型属性是共享的，即它们的值在所有实例之间共享。
不管创建了多少个该类型的实例，存储类型属性只有一份拷贝。

2-延迟初始化： 存储类型属性默认情况下是延迟初始化的。
它们的初始值直到首次被访问时才会被计算并分配内存空间。
延迟初始化确保了存储类型属性的值只有在需要时才会被计算，从而节省了资源。

3-线程安全： 存储类型属性的初始化是线程安全的。
即使多个线程同时访问存储类型属性，也不会导致重复初始化或者竞态条件的问题。
Swift 会保证存储类型属性的初始化在多线程环境下是安全的。
```

## 三 参考

* [简书—Swift属性，单例](https://www.jianshu.com/p/410f01d9e638)

