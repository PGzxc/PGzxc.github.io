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
在 Swift 中，内存管理是通过 ARC（Automatic Reference Counting，自动引用计数）来实现的。
ARC 负责追踪和管理引用类型(类实例)的内存，确保在不再需要时释放它们所占用的内存空间，避免内存泄漏。

ARC 引用类型主要有三种：strong、weak 和 unowned。

1-strong 引用：
默认情况下，Swift 中的引用都是强引用。
强引用会增加对象的引用计数，使其在有至少一个强引用时保持在内存中。
只要还有至少一个强引用指向对象，对象就不会被销毁。

class Person {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}

var person1: Person? = Person(name: "Alice") // 强引用
var person2 = person1 // 强引用
person1 = nil // 引用计数减一，但仍有一个强引用存在
person2 = nil // 引用计数为零，对象销毁

2-weak 引用：
弱引用不会增加对象的引用计数，因此不会保持对象在内存中。
当对象被释放后，弱引用会自动置为 nil。
弱引用通常用于避免循环引用。

class Apartment {
    var number: Int
    
    init(number: Int) {
        self.number = number
    }
    weak var tenant: Person? // 弱引用
}

var alice: Person? = Person(name: "Alice")
var apt: Apartment? = Apartment(number: 123)
apt?.tenant = alice // 强引用和弱引用
alice = nil // Person 实例被释放，弱引用自动置为 nil

3-unowned 引用：
与弱引用类似，但是前提是对象不会在引用释放后变为 nil。
使用 unowned 引用要确保对象在引用释放后不会被访问，
否则会导致访问已释放的对象，产生运行时错误。

class Country {
    let name: String
    
    init(name: String) {
        self.name = name
    }
    
    var capitalCity: City!
}

class City {
    let name: String
    unowned let country: Country // 无主引用
    
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}

var country = Country(name: "Canada")
var city = City(name: "Ottawa", country: country) // 强引用和无主引用
country.capitalCity = city // 循环引用

ARC 会在编译时自动插入适当的引用计数代码，因此开发者通常无需手动管理引用计数。
然而，在处理循环引用时，需要特别注意使用 weak 和 unowned 引用来避免内存泄漏。
```

### 2.2 Swift闭包循环引用如何产生，怎么解决？

```
闭包循环引用在 Swift 中很常见，特别是当闭包内部捕获了包含该闭包的对象时，容易导致循环引用。
这种情况下，闭包持有了对象的强引用，而对象又持有了闭包的强引用，
导致它们互相保持，无法释放，从而产生内存泄漏

下面是一个典型的闭包循环引用示例：
class Person {
    var name: String
    lazy var printName: () -> () = {
        print(self.name) // 闭包捕获了 self，持有了 Person 的强引用
    }
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("Person \(name) is being deinitialized")
    }
}

var person: Person? = Person(name: "Alice")
person?.printName() // "Alice"
person = nil // Person 实例无法被释放，因为闭包持有了它的强引用

要解决闭包循环引用，可以使用 weak 或 unowned 弱引用来打破循环。

1-使用 weak 弱引用：
class Person {
    var name: String
    lazy var printName: () -> () = { [weak self] in // 使用 weak self
        guard let strongSelf = self else { return }
        print(strongSelf.name)
    }
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("Person \(name) is being deinitialized")
    }
}

var person: Person? = Person(name: "Alice")
person?.printName() // "Alice"
person = nil // Person 实例可以被释放

2-使用 unowned 无主引用：
class Person {
    var name: String
    lazy var printName: () -> () = { [unowned self] in // 使用 unowned self
        print(self.name)
    }
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("Person \(name) is being deinitialized")
    }
}

var person: Person? = Person(name: "Alice")
person?.printName() // "Alice"
person = nil // Person 实例可以被释放

在选择使用 weak 还是 unowned 时，需要考虑闭包在访问对象时，对象是否有可能已经被释放。
如果对象可能在闭包执行过程中被销毁，则应该使用 weak 引用。
如果可以确定闭包执行期间对象不会被销毁，则可以使用 unowned 引用来避免可选绑定
```

### 2.3 能否在定义闭包属性的同时引用self？lazy

```
在 Swift 中，闭包属性的定义通常是通过延迟初始化的 lazy 关键字来实现的。
然而，当你在闭包属性的定义中需要引用 self 时，需要注意闭包内部捕获了当前对象，可能会导致循环引用。
在这种情况下，你需要小心处理，以避免产生循环引用。

你可以在闭包内使用 lazy 关键字，但在捕获 self 时，
需要使用 weak 或者 unowned 来避免循环引用。
这就要求你在闭包内部使用 [weak self] 或者 [unowned self] 来标记捕获的 self。

下面是一个使用 lazy 和 [weak self] 的示例：

class Person {
    var name: String
    lazy var printName: () -> () = { [weak self] in
        guard let strongSelf = self else { return }
        print("My name is \(strongSelf.name)")
    }
    
    init(name: String) {
        self.name = name
    }
    
    deinit {
        print("Person \(name) is being deinitialized")
    }
}

var person: Person? = Person(name: "Alice")
person?.printName() // "My name is Alice"
person = nil // Person 实例可以被释放

这个例子中，printName 是一个闭包属性，使用 lazy 进行延迟初始化。
同时，使用了 [weak self] 来捕获 self，以避免循环引用。

如果你能确定在闭包执行期间 self 不会被释放，你也可以使用 [unowned self]。
但是要小心，确保在闭包执行期间 self 仍然是有效的
```

### 2.4 如果lazy属性是闭包调用的结果，是否需要考虑循环引用问题？

```
如果 lazy 属性是一个闭包调用的结果，并且这个闭包不捕获 self，那么就不需要特别考虑循环引用的问题。
因为在这种情况下，闭包并不持有对当前对象的强引用，也就不会造成循环引用。

例如，如果 lazy 属性是通过一个闭包调用的结果，
而这个闭包并没有捕获 self，那么就不存在循环引用的风险。

class MyClass {
    lazy var someProperty: String = {
        return "Hello, world!"
    }()
}

在上面的例子中，闭包 { return "Hello, world!" } 并不捕获 self
，它只是返回一个字符串。因此，不需要担心循环引用问题。

但是，如果闭包内部捕获了 self，那么就需要考虑循环引用的问题，
并根据实际情况使用 [weak self] 或者 [unowned self] 来避免循环引用。
```
### 2.5 什么是逃逸闭包?逃逸闭包能否捕获inout参数？@escaping

```
逃逸闭包是指在函数中定义的闭包，但在函数返回之后才被执行的闭包。
换句话说，逃逸闭包是在函数作用域之外被调用的闭包。
在 Swift 中，默认情况下，闭包是非逃逸的，即闭包会在函数返回之前执行完毕。
但是，如果你希望闭包在函数返回之后执行，你需要标记闭包为 @escaping。

逃逸闭包通常用于异步操作，或者当闭包作为函数参数，但在函数返回后仍需要执行的情况。
典型的例子包括将闭包传递给异步 API，或者将闭包保存在一个变量中以供稍后调用。

逃逸闭包能够捕获 inout 参数。
当你将逃逸闭包作为函数参数，并且该闭包捕获了函数中的 inout 参数时，
Swift 会自动将 inout 参数转换为对应的引用类型，以便在闭包的生命周期内能够修改它
```

### 2.6 Swift中指针类型有哪几种？

```
在 Swift 中，指针类型主要有以下几种：

1-UnsafePointer：
用于表示对内存中某个类型的非变异引用。
这个指针不允许修改指向的内存内容。
可以通过 pointee 属性来访问指针所指向的值，但不能修改。
使用 UnsafePointer 时需要特别小心，因为它不提供任何安全检查，可能导致内存安全问题。

2-UnsafeMutablePointer：
与 UnsafePointer 类似，但它允许修改指向的内存内容。
可以使用 pointee 属性访问和修改指针所指向的值。
同样地，使用 UnsafeMutablePointer 也需要小心，因为它也不提供任何安全检查。

3-UnsafeRawPointer：
类似于 UnsafePointer，但它用于表示对内存中某个值的原始非变异引用，而不考虑其类型。
与 UnsafePointer 类似，它也不允许修改指向的内存内容，但可以访问内存中的原始数据。

4-UnsafeMutableRawPointer：
与 UnsafeRawPointer 类似，但允许修改指向的内存内容。
可以用来进行原始内存操作，但也需要小心使用以避免导致内存安全问题。

这些指针类型通常用于与 C 语言接口进行交互、进行底层内存操作或者实现高性能的算法。
在 Swift 中，使用这些指针类型需要谨慎，因为它们绕过了 Swift 的类型系统和内存安全性检查
```

## 三 参考

* [简书—Swift内存管理](https://www.jianshu.com/p/410f01d9e638)

