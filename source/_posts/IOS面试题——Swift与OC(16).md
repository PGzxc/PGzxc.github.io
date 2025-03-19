---
title: IOS面试题——Swift与OC(16)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: 1dd76cb9
date: 2024-03-27 18:43:19
---
## 一 面试题汇总

1. MARK、TODO、FIXME
2. Swift条件编译？
3. Swift与OC互相调用？
4. Swift中String与NSString有什么区别？
5. 如何让Swift内容具有动态性？@objc dynamic<!--more-->
6. Swift资源名如何管理？

## 二 面试题解答(仅供参考)

### 2.1 MARK、TODO、FIXME

```
在 iOS 开发中，MARK、TODO和FIXME是常用的注释标记，用于代码中的备注、待办事项和需要修复的问题。
它们可以帮助开发者快速定位和理解代码中的关键部分。

1.MARK 用于组织代码，使其更具可读性。
2.TODO 标记未来的任务或待实现功能。
3.FIXME 用于标记需要修复的问题或 bug。
```

### 2.2 Swift条件编译？

```
Swift 条件编译 是一种根据不同条件来编译和执行特定代码的技术，通常用于支持不同平台、不同环境或不同配置的代码。
通过条件编译，开发者可以在同一个代码文件中针对不同情况编写不同的实现。

1-常见的条件编译指令：
1.1 #if、#elseif、#else、#endif：用来根据条件编译不同的代码块。
1.2 #available：用于检查特定的操作系统版本或 API 是否可用，以确保在不同版本的系统中执行兼容的代码。
1.3 #warn 和 #error：用于在编译时发出警告或错误提示。

2-用途：
2.1 多平台支持：根据不同的操作系统（iOS、macOS、watchOS 等）编译不同的代码。
2.2 不同环境支持：例如，开发、测试、生产环境下的不同实现。
2.3 版本兼容：根据不同的系统版本选择不同的实现方式，确保代码在不同版本的设备上正常运行。
```

### 2.3 Swift与OC互相调用？

```
在Swift和 Objective-C(OC)之间互相调用是iOS开发中的常见需求，尤其是当你在一个项目中同时使用这两种语言时。
Swift 和 Objective-C 可以通过以下几种方式互相调用

1.Swift 调用 Objective-C：通过桥接头文件，导入 Objective-C 类并调用。
2.Objective-C调用Swift：通过自动生成的 YourProjectName-Swift.h 文件，
导入并调用 Swift 类和方法（需要使用 @objc修饰符）。
```

### 2.4 Swift中String与NSString有什么区别？

```
在 Swift 中，String 和 NSString 都用于表示字符串，但它们属于不同的类型，具有一些关键的区别

1. 类型与来源：
1.1-String：是Swift的原生字符串类型，专为Swift语言设计，具有强类型特性。
它是值类型（结构体），并且与 Foundation 框架中的 NSString 有兼容性。

1.2-NSString：是 Objective-C 中的字符串类型，继承自 NSObject，
它是引用类型（类），并且与 Foundation 框架紧密集成。

2. 值类型 vs 引用类型：
2.1-String：是值类型，这意味着当你将一个String赋给另一个变量或常量时，
会创建一个新的副本，原始字符串不会受影响。

2.2-NSString：是引用类型，这意味着它通过引用传递对象，
当你将一个NSString赋给另一个变量时，两个变量会指向同一个对象。

3.性能和优化：
3.1.String 在 Swift中进行了优化，支持高效的内存管理和Unicode编码，能够更好地支持Swift的语言特性。
3.2.NSString 是基于Objective-C的，通常在处理大量字符串时，它的性能相较于Swif 的String可能稍显逊色。

4.互操作性：String 和 NSString 可以互相转换：

5.API 和方法：
5.1-String 提供了更适合 Swift 的API，方法和属性都遵循Swift的规范和语法。
5.2-NSString 提供了基于Objective-C的方法，通常需要调用Foundation框架中的方法进行字符串操作。

总结：
String 是Swift的本地类型，值类型，具有更现代的性能优化和简洁的API，适合在Swift项目中使用。
NSString 是Objective-C的类型，引用类型，适合与Objective-C代码交互或者使用Foundation提供的功能。
```

### 2.5 如何让Swift内容具有动态性？@objc dynamic

```
在 Swift 中，你可以使用 @objc dynamic 关键字来声明属性和方法，
从而使其具有 Objective-C 的动态性。
这在需要将 Swift 类型用作 Objective-C 类型时非常有用，
例如在使用 Key-Value Coding (KVC) 或 Key-Value Observing (KVO) 时。
```
### 2.6 Swift资源名如何管理？

```
在Swift中，资源（如图像、音频文件、JSON 数据、本地化字符串等）的管理通常通过Xcode项目中的资源文件夹来进行。
资源的管理和引用方式有助于开发者高效地在应用中使用和维护这些文件。

1.Assets Catalog：用于管理和引用应用的图像、颜色和其他资源。
2.Bundle：用于访问应用的资源文件。
3.本地化：通过本地化字符串文件和资源，支持多语言环境。
4.文件管理器：用于访问沙盒中的文件或自定义资源。

通过合理的资源管理，Swift项目能够高效且灵活地处理各种资源，确保在不同设备和语言环境中正确显示和使用这些资源。
```

## 三 参考

* [简书—Swift与OC](https://www.jianshu.com/p/410f01d9e638)

