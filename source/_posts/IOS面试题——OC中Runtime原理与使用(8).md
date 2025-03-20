---
title: IOS面试题——OC中Runtime原理与使用(8)
categories:
  - 面试相关
  - IOS面试题
tags:
  - OC面试题
abbrlink: 344a7fe2
date: 2024-03-26 22:21:53
---
## 一 面试题汇总

1. 什么是Runtime，有什么作用？常用在什么地方
2. OC方法查找机制是怎么样的？有什么缺点？
3. objc_msgSend分为哪几个阶段？每个阶段具体做了些什么？
4. 方法cache是怎么做的？有什么好处
5. OC与Swift在方法调用上有什么区别？<!--more-->
6. 动态方法解析过程中关键方法是哪个？`resolveInstanceMethod:`
7. 消息转发过程关键方法有哪几个？`forwardInvocation:`，`methodSignatureForSelector:`，`forwardInvocation`
8. @dynamic的作用是什么？
9. [super xxxx]中super有什么作用？
10. Runtime的API有哪些？

## 二 面试题解答(仅供参考)

### 2.1 什么是Runtime，有什么作用？常用在什么地方

```
Runtime 是指编程语言在运行时（runtime）的环境和支持库，用于管理程序的运行时行为，
例如对象的创建与销毁、方法的调用、消息传递、类与对象的信息等。
在Objective-C和其他一些编程语言中，Runtime 是一个重要的概念，
它提供了一系列的 API 和功能，用于动态地操作和管理类和对象。

Runtime 的作用包括但不限于：

1-动态对象创建与销毁：
Runtime 提供了一些函数和方法来动态地创建和销毁对象，例如 alloc、init、dealloc 等。

3-动态方法调用：
Runtime 允许在运行时动态地调用对象的方法，包括实例方法和类方法。

3-消息传递：
Objective-C 的消息传递机制就是由 Runtime 提供支持的，
它允许在运行时向对象发送消息并执行相应的方法。

4-类与对象的操作：
Runtime 允许动态地创建、修改和销毁类与对象，包括添加新的方法、属性和协议。

5-方法交换：
Runtime 允许在运行时动态地交换两个方法的实现，通常用于在不修改源代码的情况下改变方法的行为。

6-实现类似KVO和KVC的功能：
Runtime 提供了实现类似键值观察（Key-Value Observing，KVO）
和键值编码（Key-Value Coding，KVC）等功能所需的支持。

7-获取类和对象的信息：
Runtime 允许获取类和对象的各种信息，例如类的名称、父类、成员变量、属性、方法列表等。

Runtime 常用在一些需要动态地操作类和对象的场景中，如：

1-面向对象的设计模式，如工厂模式、代理模式等。
2-框架和库的开发，如对反射（reflection）和元编程（metaprogramming）的需求。
3-运行时的代码生成和执行，如插件系统和脚本语言的解释执行。
4-实现一些高级功能，如方法转发、AOP（面向切面编程）等。
```

### 2.2 OC方法查找机制是怎么样的？有什么缺点？

```
具体来说，当调用一个对象的方法时，Runtime 会按照以下步骤进行方法查找：

1-查找方法实现：
首先，Runtime 会在对象所属的类的方法列表中查找方法的实现。
如果在当前类的方法列表中找到了对应的方法，则执行该方法。

2-父类查找：
如果在当前类的方法列表中没有找到对应的方法，则 Runtime 会在父类的方法列表中继续查找。
它会沿着类的继承链向上逐级查找，直到找到对应的方法实现或者到达了根类（NSObject）。

3-动态方法解析：
如果在类的方法列表和父类的方法列表中都没有找到对应的方法实现，
则 Runtime 会尝试调用 resolveInstanceMethod: 或 resolveClassMethod: 方法，
以给开发者一个机会来动态地添加方法实现。
如果开发者实现了这些方法，并成功添加了方法实现，则重新执行方法查找。

3-消息转发：
如果以上步骤都失败了，Runtime 会调用 forwardingTargetForSelector: 方法，
尝试将消息转发给另一个对象处理。如果开发者实现了这个方法并返回了一个有效的对象，则重新执行方法查找。

4-完整消息转发：
如果消息转发也失败了，最后 Runtime 会调用 forwardInvocation: 方法，
将完整的消息转发给另一个对象处理。开发者可以在该方法中自定义消息的转发逻辑。

Objective-C 方法查找机制的缺点包括：

1-运行时开销：
由于方法查找是在运行时进行的，因此会带来一定的性能开销，尤其是在多次调用同一个方法时。

2-动态性带来的不确定性：
由于方法查找是动态的，因此在编译时无法确定方法调用的准确位置和实现，可能会导致一些错误只能在运行时才能发现。

3-调试困难：由于方法查找是在运行时进行的，因此调试时可能会导致调试信息不够准确，增加调试的难度
```

### 2.3 objc_msgSend分为哪几个阶段？每个阶段具体做了些什么？

```
objc_msgSend 是 Objective-C 中用于向对象发送消息的底层函数。
它在消息传递过程中会经历几个阶段，主要包括：

1-消息查找阶段（Message Lookup Phase）：
2-消息转发阶段（Message Forwarding Phase）：
3-消息转发失败阶段（Message Forwarding Fails）：
```

### 2.4 方法cache是怎么做的？有什么好处

```
方法缓存（Method Cache）是 Objective-C 运行时中的一个重要机制，用于提高方法的查找速度。
它通过缓存最近调用的方法的信息，以便下次查找相同方法时可以更快地找到对应的方法实现。
方法缓存的实现方式如下：

1-缓存结构：
方法缓存是一个哈希表（Hash Table），用于存储方法选择器（Selector）与方法实现的映射关系。
在哈希表中，选择器作为键，方法实现的地址作为值。

2-查找方法：
当执行一个对象的方法时，Objective-C 运行时会首先在对象所属的类的方法缓存中查找方法实现。
如果在缓存中找到了对应的方法实现，则直接调用该方法实现；如果没有找到，则进入常规的方法查找流程。

3-更新方法缓存：
当一个方法被调用时，Objective-C 运行时会将该方法的选择器与方法实现的映射关系存储到方法缓存中。
如果方法缓存已满，则会根据一定的策略来淘汰最近最少使用的方法实现，以给新的方法实现腾出空间。

方法缓存的好处包括：

1-提高方法查找速度：
方法缓存可以避免每次方法调用都需要进行完整的方法查找流程，从而大大提高了方法的查找速度。

2-降低系统开销：
由于方法缓存减少了方法查找的开销，因此可以降低系统的运行时开销，提高系统的性能。

3-优化常用方法的调用：
对于频繁调用的方法，其方法实现会被缓存到方法缓存中，从而使得这些方法的调用速度更快。

总的来说，方法缓存是 Objective-C 运行时的一个重要优化机制，通过缓存最近调用的方法，
可以显著提高方法的查找速度，从而提高程序的性能和响应速度
```

### 2.5 OC与Swift在方法调用上有什么区别？

```
Objective-C（OC）和 Swift 在方法调用上有一些区别，主要体现在语法和机制上：

1-语法差异：
1.1-Objective-C 中方法调用使用方括号语法，例如 [object methodName]，
而 Swift 使用点语法，例如 object.methodName()。
1.2-在 Objective-C 中，方法调用时使用的是动态消息传递机制，即在运行时确定方法的具体实现；
而 Swift 中的方法调用是静态的，编译时就确定了方法的具体实现。

2-空合运算符：
2.1在 Swift 中，可以使用空合运算符 ?? 来调用可选链中的方法，以便安全地处理可选值为 nil 的情况。
例如，object?.method() ?? defaultValue。
2.2在 Objective-C 中，要使用条件判断来手动检查对象是否为 nil，然后调用方法。
例如，if (object) { [object method]; }。

3-可选链：
3.1-Swift 支持可选链式调用（Optional Chaining），可以通过在可选值后面使用问号 ? 来调用方法，
如果可选值为 nil，则调用会返回 nil，而不会引发运行时错误。
3.2-Objective-C 中没有直接的可选链式调用语法，但可以通过条件判断来手动处理可选值为 nil 的情况。

4-方法重载：
4.1-Swift 支持方法重载，即可以定义多个同名的方法，但参数类型或数量不同。
在调用时根据参数类型或数量的不同来确定调用哪个方法。
4.2-Objective-C 中也支持方法重载，但是方法的签名由方法名和参数名一起决定，
参数名在方法签名中占有重要位置，因此在 Objective-C 中更侧重于使用不同的方法名来区分不同的方法。

5-动态性：
5.1-Objective-C 中的方法调用是动态的，消息的接收者和方法的实现是在运行时确定的，
这意味着可以在运行时动态地改变方法的调用行为。
5.2-Swift 中的方法调用是静态的，编译时就确定了方法的具体实现，
因此不支持 Objective-C 中的动态方法调用机制。
```

### 2.6 动态方法解析过程中关键方法是哪个？`resolveInstanceMethod:`

```
在 Objective-C 的动态方法解析过程中，
关键的方法是 resolveInstanceMethod: 和 resolveClassMethod:。
这两个方法分别用于实例方法和类方法的解析。

1-resolveInstanceMethod:：
1.1-当一个对象收到无法识别的实例方法调用时，Objective-C 运行时会调用该方法。
开发者可以在子类中重写这个方法，并在其中动态地添加方法实现，从而解决方法未找到的问题。
1.2-在 resolveInstanceMethod: 方法中，开发者需要调用 class_addMethod 函数来向当前类中添加方法实现。

2-resolveClassMethod:：
2.1-类似于 resolveInstanceMethod:，但用于解析类方法。
当一个类收到无法识别的类方法调用时，Objective-C 运行时会调用该方法。
开发者可以在类的元类（Meta Class）中重写这个方法，并在其中动态地添加类方法的实现。
2.2-在 resolveClassMethod: 方法中，开发者同样需要调用 class_addMethod 函数来向元类中添加类方法的实现。

这两个方法的实现是 Objective-C 运行时动态方法解析的入口，
开发者可以在这两个方法中根据需要动态地添加方法实现，从而使得未知方法调用得到解决。
```

### 2.7 消息转发过程关键方法有哪几个？`forwardInvocation:`，`methodSignatureForSelector:`，`doesNotRecognizeSelector`

```
在Objective-C的消息转发过程中，关键的方法包括 forwardInvocation:、methodSignatureForSelector:
，以及 doesNotRecognizeSelector:。
这些方法共同组成了完整的消息转发机制，用于在对象无法识别或处理某个消息时，将消息转发给其他对象处理。

1-forwardInvocation:：
1.1-当一个对象无法识别或处理某个消息时，Objective-C 运行时会调用该方法。
开发者可以在子类中重写这个方法，并在其中将消息转发给其他对象处理。
1.2-在 forwardInvocation: 方法中，开发者可以使用 NSInvocation 对象来构造新的消息，并将其发送给其他对象处理。

2-methodSignatureForSelector:：
2.1-在消息转发过程中，Objective-C 运行时会调用该方法来获取消息的方法签名（Method Signature）。
方法签名包含了方法的返回值类型和参数类型信息。
2.2-开发者可以在子类中重写这个方法，并在其中返回指定消息的方法签名。
这个方法通常和 forwardInvocation: 方法一起使用，用于创建 NSInvocation 对象。

3-doesNotRecognizeSelector:：
3.1-当一个对象无法识别某个消息时，Objective-C 运行时会调用该方法。
默认情况下，这个方法会抛出一个异常，提示方法未实现。
3.2-开发者可以选择重写这个方法，并在其中进行一些自定义的处理，例如记录日志、发送通知等。
重写这个方法可以避免默认的异常抛出行为，使得程序可以更加优雅地处理未知消息。

这些方法共同构成了 Objective-C 的消息转发机制，
使得开发者可以动态地处理未知消息，从而实现更加灵活和健壮的代码
```

### 2.8 @dynamic的作用是什么？

```
@dynamic 是 Objective-C 中的一个关键字，用于告诉编译器不要自动生成属性的存取方法的实现，
而是在运行时动态地处理属性的存取。
主要用于在编译时声明属性，但是不提供属性的实现，而是在运行时由开发者自己提供实现。

@dynamic 的作用主要有两个方面：

1-告知编译器属性的存取方法是动态生成的：
当我们声明一个属性时，通常会自动生成属性的存取方法。
但是如果属性的存取方法是动态生成的，例如通过 Core Data 或者手动实现存取方法，
这时可以使用 @dynamic 关键字告知编译器，属性的存取方法由开发者自己提供，不需要自动生成。

2-与 Core Data 等框架配合使用：
在使用 Core Data 或者其他类似框架时，我们通常会声明一些属性来映射数据库中的字段。
这些属性的存取方法通常是由框架动态生成的，
因此需要使用 @dynamic 关键字告知编译器属性的存取方法是动态生成的，不需要自己提供实现。

总的来说，@dynamic 关键字用于告知编译器属性的存取方法是动态生成的，而不是自动生成的，
从而在编译时避免了对属性的存取方法的生成，提供了更大的灵活性和定制性。
```

### 2.9 [super xxxx]中super有什么作用？

```
在 Objective-C 中，super 关键字用于在子类中调用父类的方法或属性。
具体来说，[super methodName] 语法用于调用父类中名为 methodName 的方法，
而 super.propertyName 语法用于访问父类中名为 propertyName 的属性。

使用 super 的作用主要有以下几点：

1-调用父类方法：
子类可以使用 super 关键字来调用父类中的方法，从而在子类的方法中执行父类的特定行为。
这对于需要在子类方法中扩展父类方法的功能时非常有用。

2-访问父类属性：
子类可以使用 super 关键字来访问父类中的属性，从而获取父类中的属性值或者修改父类中的属性值。
这对于在子类中对父类属性进行特定处理或者继承父类属性的值时非常有用。

3-区分方法和属性：
在调用父类方法时，使用 super 关键字可以明确表示调用的是父类的方法而不是当前类的方法，
从而避免了可能的命名冲突。

总的来说，super 关键字是 Objective-C 中用于在子类中调用父类方法或访问父类属性的一种方式，
能够帮助子类重用父类的实现并扩展其功能。
```

### 2.10 Runtime的API有哪些

```
Objective-C Runtime 是 Objective-C 的运行时系统，它提供了一系列的 API 和函数，
用于在运行时动态地操作类和对象、调用方法、处理消息等。
以下是一些常用的 Objective-C Runtime API：

类与对象操作：
objc_allocateClassPair
objc_registerClassPair
objc_disposeClassPair
objc_getClass
objc_getMetaClass
objc_getClassList
class_getName
class_getSuperclass
class_getMethodImplementation
object_getClass
object_setClass
object_getClassName
objc_enumerationMutation

方法操作
class_copyMethodList
class_addMethod
class_replaceMethod
method_getName
method_getImplementation
method_getTypeEncoding
method_setImplementation
method_exchangeImplementations

成员变量操作
class_copyIvarList
ivar_getName
ivar_getTypeEncoding
ivar_getOffset

属性操作：
class_copyPropertyList
property_getName
property_getAttributes
property_getMethod
property_copyAttributeValue
property_copyAttributeList

协议操作：
objc_getProtocol
objc_copyProtocolList
protocol_getName
protocol_copyMethodDescriptionList
protocol_copyPropertyList
protocol_copyProtocolLis

消息传递：
objc_msgSend
objc_msgSendSuper
objc_msgSend_stret
objc_msgSendSuper_stret

消息转发：
resolveInstanceMethod:
resolveClassMethod:
forwardInvocation:
methodSignatureForSelector:
doesNotRecognizeSelector:

其他功能：
sel_registerName
sel_getName
sel_isEqual
IMP

以上是一些常用的 Objective-C Runtime API，它们提供了丰富的功能，
使得开发者可以在运行时动态地操作类和对象、调用方法、处理消息等，
为 Objective-C 的动态特性提供了支持。
```

## 三 参考

* [简书—OC中Runtime原理与使用](https://www.jianshu.com/p/410f01d9e638)