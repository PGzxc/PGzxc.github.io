---
title: 'IOS面试题——Swift协议与面向协议编程,协议实现前缀(13)'
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: daad147f
date: 2024-03-27 17:13:38
---
## 一 面试题汇总

1. 什么是协议？协议能添加什么？
2. 协议中定义的内容是否必须全部都实现？如果想要实现可选协议呢？
3. 实现协议时的属性权限要不小于协议中定义的属性权限
4. 协议中定义的`init`方法，能否用`init?`来实现？
5. 枚举值如何进行遍历？遵守CaseIterable协议<!--more-->
6. 自定义打印需要遵循什么协议？CustomStringConvertible、 CustomDebugStringConvertible
7. Any、AnyObject有什么区别？如何定义只能类遵守的协议？
8. 什么是面向协议编程？解决了面向对象编程哪些问题？
9. 如何利用协议实现前缀效果？

## 二 面试题解答(仅供参考)

### 2.1 什么是协议？协议能添加什么？

```
在 Swift 中，协议是一种定义了方法、属性和其他成员的蓝图，用于描述某种特定的功能或行为。
它定义了一组要求，任何符合（或遵循）这些要求的类型都必须实现这些方法、属性等。
协议本身并不提供任何实现，而是定义了一种规范，具体的实现由遵循协议的类型提供。

协议可以用来实现面向协议的编程（Protocol-oriented Programming），
这种编程方式能够提高代码的灵活性、可重用性和可扩展性。

在 Swift 中，协议可以添加以下内容：

1-方法要求（Method Requirements）： 
定义了一个方法的名称、参数、返回值以及方法的类型（实例方法或者类型方法）。
遵循协议的类型必须实现这些方法。

protocol MyProtocol {
    func myMethod()
    static func myStaticMethod()
}

2-属性要求（Property Requirements）： 
定义了一个属性的名称、类型以及读写权限。遵循协议的类型必须提供对应的属性实现。

protocol MyProtocol {
    var myProperty: Int { get set }
    static var myStaticProperty: String { get }
}

3-下标要求（Subscript Requirements）：
定义了一个下标的参数、返回类型以及读写权限。遵循协议的类型必须提供对应的下标实现。

protocol MyProtocol {
    subscript(index: Int) -> String { get set }
}

4-初始化器要求（Initializer Requirements）： 
定义了一个初始化器的参数、返回类型以及可能的异常情况。
遵循协议的类型必须提供对应的初始化器实现。

protocol MyProtocol {
    init(value: Int)
}

5-关联类型（Associated Types）：
定义了一个或多个关联类型，用来表示协议中某些类型的占位符。
遵循协议的类型必须提供关联类型的具体实现。

protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(index: Int) -> Item { get }
}

6-约束（Constraints）： 
定义了遵循协议的类型必须满足的条件，例如遵循某个协议、具有某种父类、或者某种类型关系。

protocol MyProtocol: Equatable {
    func myMethod()
}

通过协议，可以定义一组抽象的接口要求，并由具体类型来实现这些接口，从而实现了代码的解耦和灵活性。
```

### 2.2 协议中定义的内容是否必须全部都实现？如果想要实现可选协议呢？

```
在 Swift 中，协议中定义的内容不都必须被遵循（或实现）。
协议可以定义必须实现的内容，也可以定义可选实现的内容。

1-必须实现的内容： 
如果协议中定义的方法、属性、下标或初始化器要求没有被标记为可选的，
则遵循该协议的类型必须实现所有这些要求。

protocol MyProtocol {
    func requiredMethod()
    var requiredProperty: Int { get }
}
如果一个类或结构体遵循了 MyProtocol 协议，
那么它必须实现 requiredMethod() 和 requiredProperty。

2-可选实现的内容： 
如果协议中定义的方法、属性、下标或初始化器要求被标记为可选的，
则遵循该协议的类型可以选择性地实现这些要求。

@objc protocol MyProtocol {
    @objc optional func optionalMethod()
    @objc optional var optionalProperty: Int { get }
}

在上述示例中，optionalMethod() 和 optionalProperty 被标记为可选的。
如果一个类遵循了 MyProtocol 协议，则可以选择性地实现或者不实现这些可选要求。

值得注意的是，在非 @objc 的协议中，Swift 不支持可选的方法、属性或者下标要求。
可选要求只能在使用了 @objc 属性的协议中使用，并且只能被类类型遵循。
```

### 2.3 实现协议时的属性权限要不小于协议中定义的属性权限

```
在 Swift 中，实现协议时的属性权限要不小于协议中定义的属性权限。
换句话说，如果协议中的属性是只读的，那么在遵循该协议时，可以将其实现为只读或读写；
但如果协议中的属性是读写的，那么在遵循该协议时，必须将其实现为读写。

举个例子，假设有一个名为 MyProtocol 的协议：

protocol MyProtocol {
    var myProperty: Int { get } // 只读属性
}
如果一个类型要遵循 MyProtocol 协议，则可以这样实现：

struct MyStruct: MyProtocol {
    let myProperty: Int
}
或者：

struct MyStruct: MyProtocol {
    var myProperty: Int
}

在上述示例中，MyStruct 结构体遵循了 MyProtocol 协议，实现了 myProperty 属性。
由于协议中的 myProperty 属性是只读的，因此 MyStruct 可以选择将其实现为只读或者读写属性。

然而，如果协议中的属性权限是读写的，那么实现时必须保证它至少是读写的，否则会产生编译错误。
```

### 2.4 协议中定义的`init`方法，能否用`init?`来实现？

```
在 Swift 中，协议中定义的 init 方法可以被实现为可失败初始化器（failable initializer），
即使用 init? 来实现。
这意味着遵循协议的类型可以选择性地实现一个可能失败的初始化器。

举个例子，假设有一个名为 MyProtocol 的协议，其中定义了一个 init 方法：

protocol MyProtocol {
    init(value: Int)
}
如果一个类型要遵循 MyProtocol 协议，并且使用可失败初始化器来实现该协议，可以这样做：

struct MyStruct: MyProtocol {
    let value: Int
    
    init?(value: Int) {
        guard value >= 0 else {
            return nil
        }
        self.value = value
    }
}

在这个示例中，MyStruct 结构体遵循了 MyProtocol 协议，
并且实现了一个可失败初始化器来满足协议中定义的 init 要求。
初始化器中使用了 guard 语句来判断参数值是否符合条件，
如果不符合，则返回 nil 表示初始化失败，否则将参数值赋给属性并继续初始化。

需要注意的是，如果协议中定义的是普通的 init 方法，
那么实现时也可以使用可失败初始化器 init? 来满足协议要求。
但如果协议中定义的是可失败初始化器 init?，则实现时必须使用相同的或者更具体的初始化器
```

### 2.5 枚举值如何进行遍历？遵守CaseIterable协议

```
要对遵循 CaseIterable 协议的枚举进行遍历，可以使用枚举的 allCases 属性。
allCases 是一个只读的静态属性，它返回一个包含枚举所有 case 的数组。
通过遍历这个数组，可以访问到枚举的每一个 case。

下面是一个示例：

enum Direction: CaseIterable {
    case north
    case south
    case east
    case west
}

// 遍历枚举的所有 case
for direction in Direction.allCases {
    print(direction)
}
在这个示例中，我们定义了一个名为 Direction 的枚举，并让它遵循 CaseIterable 协议。
然后我们使用 allCases 属性来获取枚举的所有 case，将它们放入一个数组中
。最后，我们使用 for-in 循环来遍历这个数组，并打印出每一个 case。

通过 CaseIterable 协议，可以方便地对枚举进行遍历，而不需要手动列出所有的 case。
这对于需要在运行时动态处理枚举值的情况下非常有用。
```

### 2.6 自定义打印需要遵循什么协议？CustomStringConvertible、 CustomDebugStringConvertible

```
在 Swift 中，如果你想要自定义类型的实例在被打印输出时具有自定义的字符串描述，
你可以让你的类型遵循 CustomStringConvertible 或 CustomDebugStringConvertible 协议。

1-CustomStringConvertible 协议： 
如果你的类型遵循了 CustomStringConvertible 协议，你需要实现 description 属性，
它应该返回该类型的字符串描述。这个字符串描述将会在 print 函数中被使用。

struct MyStruct: CustomStringConvertible {
    let value: Int
    
    var description: String {
        return "MyStruct with value \(value)"
    }
}

let myInstance = MyStruct(value: 10)
print(myInstance) // 输出: MyStruct with value 10

2-CustomDebugStringConvertible 协议： 
类似地，如果你的类型遵循了 CustomDebugStringConvertible 协议，
你需要实现 debugDescription 属性，它应该返回该类型的调试字符串描述。
这个调试字符串描述将会在调试环境中被使用，比如在 Xcode 的调试器中。

struct MyStruct: CustomDebugStringConvertible {
    let value: Int
    
    var debugDescription: String {
        return "Debugging MyStruct with value \(value)"
    }
}

let myInstance = MyStruct(value: 10)
debugPrint(myInstance) // 输出: Debugging MyStruct with value 10

通过让你的类型遵循这些协议，你可以自定义该类型的实例在被打印输出时的表现形式，
使得它更符合你的需求，并且更易于调试。
```

### 2.7 Any、AnyObject有什么区别？如何定义只能类遵守的协议？

```
在 Swift 中，Any 和 AnyObject 是两个不同的类型，它们有着不同的含义和用法。

1-Any： 
Any 是 Swift 中的一个特殊类型，它可以表示任意类型的实例，包括值类型和引用类型。
可以将任何值赋给 Any 类型的变量或常量。

var anyValue: Any
anyValue = 5
anyValue = "Hello"
anyValue = [1, 2, 3]

2-AnyObject： 
AnyObject 是一个协议，它用来表示任意类类型（class type）。
在 Swift 中，结构体和枚举是值类型，而类是引用类型。AnyObject 协议只能被类类型遵循。

protocol MyProtocol: AnyObject {
    func myMethod()
}

class MyClass: MyProtocol {
    func myMethod() {
        print("MyMethod called")
    }
}

在上述示例中，MyProtocol 协议要求遵循它的类型必须是类类型，
因此使用了 AnyObject 关键字进行限定。MyClass 类遵循了 MyProtocol 协议，因为它是一个类。

如果你想要定义一个只能被类遵循的协议，可以像上面的示例一样，
使用 AnyObject 关键字来限定协议的遵循类型。这样，只有类能够遵循这个协议，而结构体和枚举则不能。
```

### 2.8 什么是面向协议编程？解决了面向对象编程哪些问题？

```
面向协议编程（Protocol-oriented Programming，POP）是一种编程范式，
它强调使用协议来定义抽象接口，并通过组合和泛型来实现代码的复用和组合。
在面向协议编程中，协议被用来描述类型的共同行为和特征，而不是抽象类或基类。

面向协议编程主要解决了面向对象编程中的一些问题，包括：

1-多继承问题： 
在面向对象编程中，类只能单继承，这限制了代码的复用和灵活性。而在面向协议编程中，
可以通过遵循多个协议来实现类似多继承的效果，使得类型可以拥有多个不同的行为和特征。

2-类的耦合问题： 
面向对象编程中，类之间的关系通常是通过继承来实现的，这导致了类之间的耦合性较高。
而在面向协议编程中，可以通过协议来定义接口和约束，降低了类之间的耦合度，使得代码更加灵活和可维护。

3-单一职责原则： 
面向协议编程倾向于将功能分解为更小的、可组合的部分，每个部分都是一个独立的协议，
从而更好地遵循单一职责原则。这样可以使代码更加模块化、可测试和可重用。

4-代码复用问题： 
面向对象编程中，代码复用主要通过继承和组合来实现，但继承会导致代码的耦合性增加，
而组合需要手动编写委托代码。在面向协议编程中，
可以使用协议的组合和默认实现来实现代码复用，使得代码更加简洁和可读。

总的来说，面向协议编程通过将接口抽象为协议，通过组合和泛型来实现代码的复用和灵活性，
从而解决了面向对象编程中的一些问题，使得代码更加模块化、可测试和可维护
```

### 2.9 如何利用协议实现前缀效果？

```
你可以使用协议扩展来实现前缀效果。通过定义一个包含 prefix 属性的协议，
并为该协议提供一个默认实现，你可以让遵循该协议的类型具有前缀的能力。

下面是一个示例，演示了如何使用协议扩展来实现前缀效果：

protocol Prefixable {
    var prefix: String { get }
}

extension Prefixable {
    func withPrefix(_ value: String) -> String {
        return "\(prefix)\(value)"
    }
}

// 遵循 Prefixable 协议的类型
struct MyType: Prefixable {
    let prefix: String = "Prefix: "
}

let myInstance = MyType()
print(myInstance.withPrefix("Value")) // 输出: Prefix: Value

在这个示例中，我们定义了一个名为 Prefixable 的协议，其中包含一个 prefix 属性。
然后，我们为该协议提供了一个默认的实现，实现了一个名为 withPrefix 的方法，
该方法接受一个字符串作为参数，然后将该字符串添加到 prefix 属性之前。
最后，我们创建了一个结构体 MyType 并让它遵循 Prefixable 协议，
然后使用 withPrefix 方法给实例添加了一个前缀。

通过这种方式，我们可以利用协议和协议扩展来实现前缀效果，从而使代码更加灵活和可复用
```

## 三 参考

* [简书—Swift协议与面向协议编程,协议实现前缀](https://www.jianshu.com/p/410f01d9e638)

