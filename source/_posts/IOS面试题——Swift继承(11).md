---
title: IOS面试题——Swift继承(11)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: bdb093b8
date: 2024-03-27 16:25:41
---
## 一 面试题汇总

1. 值类型并不支持继承，只有类支持继承
2. Swift中是否有类似NSObject的基类？
3. Swift如何重写父类的下标、方法、属性？override
4. 如何限制不能被重写，或者不能被继承？final
5. 是否可以重写存储属性？<!--more-->
6. let修饰的属性能否重写？
7. static修饰的属性能否被重写？

## 二 面试题解答(仅供参考)

### 2.1 值类型并不支持继承，只有类支持继承

```
值类型（例如结构体和枚举）在Swift中不支持继承，只有类支持继承。

在Swift中，结构体和枚举是值类型，它们被设计为简单且轻量级的数据抽象，
用于表示一些具有值语义的数据结构。
由于值类型的特性，它们通常用于封装少量相关的数据，并且在传递和赋值时进行值拷贝。

而类是引用类型，它们允许通过继承来共享和扩展类的功能。
子类可以继承父类的属性和方法，并且可以添加新的属性和方法，或者覆盖父类的方法以实现不同的行为。
这使得类在面向对象编程中起到了非常重要的作用，允许建立复杂的类层次结构以及实现多态性
```

### 2.2 Swift中是否有类似NSObject的基类？

```
在 Swift 中，并没有类似于 Objective-C 中的 NSObject 的基类。
在Objective-C中，所有类都继承自 NSObject，它提供了许多 Objective-C 运行时系统所需的功能，
例如内存管理、动态类型识别等。但在Swift中，所有的类都是直接继承自Swift的基类AnyObject或Any。

1-AnyObject： 
AnyObject 是一个可以表示任何类类型的 Swift 类型。
它是 Swift 中引用类型的根基类。
所有Swift类型都可以被转换为AnyObject类型，也可以将任何AnyObject 类型的实例转换为其他类类型。

2-Any： 
Any 是一个可以表示任何类型的 Swift 类型，包括值类型和引用类型。
它是 Swift 中所有类型的根基类，包括结构体、枚举、类和协议。

在 Swift 中，由于引入了强大的类型系统和自动引用计数（ARC）机制，
不再需要像 NSObject 那样的基类来提供 Objective-C 运行时所需的功能。
Swift 类型系统已经足够强大，可以满足大多数编程需求，因此不需要继承自特定的基类。
```

### 2.3 Swift如何重写父类的下标、方法、属性？override

```
在 Swift 中，你可以通过override关键字来重写父类的下标、方法和属性。
下面分别介绍如何重写这些成员：

1-重写下标：

class BaseClass {
    subscript(index: Int) -> Int {
        return index
    }
}

class SubClass: BaseClass {
    override subscript(index: Int) -> Int {
        return super[index] * 2 // 调用父类的下标并做修改
    }
}

2-重写方法：

class BaseClass {
    func myMethod() {
        print("BaseClass method")
    }
}

class SubClass: BaseClass {
    override func myMethod() {
        super.myMethod() // 调用父类的方法
        print("SubClass method")
    }
}

3-重写属性：

class BaseClass {
    var myProperty: Int {
        return 5
    }
}

class SubClass: BaseClass {
    override var myProperty: Int {
        return super.myProperty * 2 // 修改父类的属性值
    }
}

在上述示例中，我们使用 override 关键字来重写了父类的下标、方法和属性。
在子类中，可以使用 super 关键字来调用父类的方法、下标和属性，并在此基础上进行修改。
注意的是，重写方法时必须使用override关键字，否则会被视为定义了一个新的方法而不是重写父类的方法。
```

### 2.4 如何限制不能被重写，或者不能被继承？final

```
在 Swift 中，你可以使用 final 关键字来限制类、方法、属性或者下标不被继承或者重写。

1-限制类不被继承：

final class FinalClass {
    // 类的定义
}
通过将类声明为 final，你可以阻止其他类从该类继承。

2-限制方法不被重写：

class BaseClass {
    final func finalMethod() {
        // 方法的实现
    }
}

class SubClass: BaseClass {
    // 不能重写 finalMethod
}
通过将方法声明为 final，你可以阻止子类重写该方法。

3-限制属性不被重写：

class BaseClass {
    final var finalProperty: Int {
        return 5
    }
}

class SubClass: BaseClass {
    // 不能重写 finalProperty
}
通过将属性声明为 final，你可以阻止子类重写该属性的 getter 和 setter。

4-限制下标不被重写：

class BaseClass {
    final subscript(index: Int) -> Int {
        return index
    }
}

class SubClass: BaseClass {
    // 不能重写下标
}
通过将下标声明为 final，你可以阻止子类重写该下标。
使用 final 关键字可以帮助你设计更加安全和稳定的代码，尤其是在框架或者库的开发中。
```
### 2.5 是否可以重写存储属性？

```
在 Swift 中，存储属性是不能被重写的。当你在子类中声明一个与父类相同名称的存储属性时，
实际上是在子类中创建了一个新的存储属性，而不是重写父类的存储属性。

例如，假设有一个父类 BaseClass：

class BaseClass {
    var value: Int = 0
}

然后在子类 SubClass 中声明一个与父类相同名称的存储属性：

class SubClass: BaseClass {
    var value: Int = 1
}
在这个示例中，SubClass 中的 value 属性并不是重写父类的 value 属性，
而是在子类中创建了一个新的 value 属性，因此这两个属性是完全独立的。

如果你想在子类中修改父类的属性行为，你可以使用计算属性并提供 getter 和 setter 方法来实现。
但需要注意的是，存储属性不能被重写，因为它们在编译时已经分配了内存空间，而且无法动态改变。
```

### 2.6 let修饰的属性能否重写？

```
在 Swift 中，使用 let 关键字声明的属性是常量属性，也就是说它们的值在初始化之后不能被修改。
因为常量属性的值在初始化后是不可变的，所以它们不能被子类重写
```

### 2.7 static修饰的属性能否被重写？

```
在 Swift 中，使用 static 关键字声明的属性是类型属性，它们属于类型本身而不是实例。
因此，类型属性不能被子类重写。

尝试在子类中重写父类中使用 static 声明的属性会导致编译错误。

例如：

class BaseClass {
    static var staticValue: Int = 5
}

class SubClass: BaseClass {
    override static var staticValue: Int = 10 // 这里会导致编译错误
}

在这个示例中，BaseClass 中声明了一个类型属性 staticValue，
它属于类 BaseClass 而不是它的实例。
然后，在子类SubClass中尝试重写staticValue属性，但由于类型属性不能被重写，因此会导致编译错误。

因此，使用 static 声明的属性不能被子类重写，它们属于类型本身而不是实例
```

## 三 参考

* [简书—Swift继承](https://www.jianshu.com/p/410f01d9e638)

