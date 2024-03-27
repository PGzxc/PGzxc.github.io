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
"MARK"、"TODO" 和 "FIXME" 是在编程中常用的注释标记，
用于标识代码中的不同类型的任务或注意事项。
这些标记有助于程序员在代码中快速定位和处理特定的问题或任务。
通常，这些标记在开发过程中被用来暂时标记代码中需要后续处理的部分。
下面是它们的常见用法：

1-MARK：用于标记代码中的重要部分或者分隔不同功能或部分的注释。
通常用来使代码更易于阅读和理解，尤其是在大型项目中。
例如，在一个视图控制器的代码中，可能会使用 "MARK:-Lifecycle Methods"来标记生命周期方法的部分
，以及 "MARK: - IBActions" 来标记处理用户界面事件的部分。

2-TODO：用于标记代码中需要完成的任务。
这些任务可以是需要实现的新功能、需要修复的问题，或者需要进行优化或重构的部分。
TODO通常用于暂时标记需要后续处理的地方。
例如，你可以使用 "TODO: Implement error handling" 来标记需要添加错误处理代码的地方。

3-FIXME：用于标记代码中需要修复或者改进的地方，但不是非常紧急或者严重的问题。
与TODO不同，FIXME更强调需要立即处理的问题，通常是潜在的错误或者不良实践。
例如，你可以使用 "FIXME: Potential memory leak here" 来标记可能导致内存泄漏的地方。

这些标记是很有用的工具，可以帮助团队协作、提高代码质量，并使开发过程更加高效。
然而，需要注意的是，使用这些标记时应该及时跟进并处理，避免让它们变成无用的注释噪音。
```

### 2.2 Swift条件编译？

```
在Swift中，条件编译是一种根据特定条件选择性包含或排除代码的技术。
Swift使用#if、#elseif、#else 和 #endif 来实现条件编译。
条件编译指令通常用于在不同的编译环境中引入不同的代码或配置选项。

以下是Swift中条件编译的基本用法和示例：

#if condition
    // 这段代码将会在满足条件时编译
#elseif condition2
    // 这段代码将会在满足条件2时编译
#else
    // 如果以上条件都不满足，将会编译这段代码
#endif

示例：

#if DEBUG
    print("Debug 模式")
#else
    print("非 Debug 模式")
#endif

在这个示例中，如果代码在 Debug 模式下编译，则会输出 "Debug 模式"；否则，输出"非 Debug 模式"。

除了使用预定义的条件，你也可以在条件编译中使用自定义的条件。例如：

#if os(iOS)
    // 这段代码将会在 iOS 平台上编译
#elseif os(macOS)
    // 这段代码将会在 macOS 平台上编译
#else
    // 这段代码将会在其他平台上编译
#endif

在这个示例中，根据操作系统的不同，编译器会选择性地包含不同的代码块。

Swift中的条件编译非常灵活，并且可以根据需要选择性地包含或排除代码，
这对于在不同的编译环境中进行调试和配置非常有用。
```

### 2.3 Swift与OC互相调用？

```
在 iOS 和 macOS 开发中，Swift 和 Objective-C 经常需要相互调用。
这种互相调用可以让你在项目中逐步迁移到 Swift，同时仍然可以使用旧的 Objective-C 代码库，
或者在 Swift 项目中使用 Objective-C 的功能。

1. Objective-C 调用 Swift：
1.1-导入头文件（Bridging Header）：
在使用 Swift 类之前，你需要在 Objective-C 的源文件中导入一个 Objective-C 和 Swift 的桥接头文件。
Xcode 会自动生成一个桥接头文件，其名称通常为 "<YourProjectName>-Bridging-Header.h"。
你可以在项目设置中指定该桥接头文件的路径。

1.2-在 Objective-C 中使用 Swift 类：
导入了桥接头文件后，你就可以像使用 Objective-C 类一样使用 Swift 类。
Swift 中的类会被自动地转换成 Objective-C 中的对应类型。

2. Swift 调用 Objective-C：
Swift 可以直接调用 Objective-C 的代码，无需额外操作。

2.1-导入 Objective-C 头文件：
如果你需要在 Swift 中使用 Objective-C 类，
只需在需要使用的 Swift 文件中导入相应的 Objective-C 头文件。
Xcode 会自动为你处理这个导入过程，无需手动设置。

2.2-使用 Objective-C 类：
一旦导入了 Objective-C 头文件，你就可以像使用 Swift 类一样使用 Objective-C 类。
Swift 会自动将 Objective-C 类转换为 Swift 类型。

示例：
Objective-C 调用 Swift：
假设有一个 Swift 类 SwiftClass，其中有一个方法 doSomething，
我们想要在 Objective-C 中调用它。

// SwiftClass.swift
import Foundation

class SwiftClass: NSObject {
    @objc func doSomething() {
        print("SwiftClass is doing something")
    }
}

// SomeObjectiveCClass.m
#import "YourProjectName-Swift.h" // 导入桥接头文件

// 在某个方法中调用 Swift 类
SwiftClass *swiftObject = [[SwiftClass alloc] init];
[swiftObject doSomething];
Swift 调用 Objective-C：
假设有一个 Objective-C 类 ObjectiveCClass，其中有一个方法 doSomething，我们想要在 Swift 中调用它。

// ObjectiveCClass.h
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ObjectiveCClass : NSObject
- (void)doSomething;
@end

NS_ASSUME_NONNULL_END
// 在 Swift 文件中直接调用 Objective-C 类
let objcObject = ObjectiveCClass()
objcObject.doSomething()

这就是 Swift 和 Objective-C 相互调用的基本方法。
使用这种方法，你可以轻松地在两种语言之间集成代码。
```

### 2.4 Swift中String与NSString有什么区别？

```
在 Swift 中，String 和 NSString 都用于表示字符串，但它们有一些重要的区别。

1-String：
1.1-值类型：
String 是 Swift 中的值类型（value type），
它在内存中以值的形式存储，并且在传递给函数或赋值给变量时进行复制。
1.2-Unicode 支持：String 对 Unicode 提供了原生支持，可以方便地处理各种语言和符号。
1.3-可变性：Swift 中的 String 是不可变的，即一旦创建就无法更改其内容。
如果需要修改字符串，可以使用字符串操作方法来创建一个新的字符串。
1.4-直接字面量赋值：Swift 中可以使用双引号直接创建 String 类型的字面量。
1.5-方法和属性：String 有许多与字符串处理相关的方法和属性，如拼接、查找、替换等。

2-NSString：
2.1-引用类型：NSString 是 Objective-C 中的引用类型（reference type），
它在内存中以引用的形式存储，并且在传递给函数或赋值给变量时不会复制其内容。
2.2-Unicode 支持：NSString 也支持 Unicode，
但它的 Unicode 支持不如 Swift 中的 String 那么直接和强大。
2.3-可变性：NSString 有不可变和可变两种类型，分别是 NSString 和 NSMutableString。
可变字符串类型 NSMutableString 可以修改其内容。
2.4-Objective-C 特性：NSString 是 Objective-C 中的基本字符串类型，
继承自 NSObject，并且可以使用 Objective-C 的字符串处理方法。
2.5-字面量创建：在 Objective-C 中，NSString 对象通常是通过使用 @"" 符号创建的。

总的来说，String 是 Swift 中专门用于字符串操作的类型，
而 NSString 则是 Objective-C 中的字符串类型。
在 Swift 中，可以使用 String 类型来替代 NSString 类型，
而且 String 提供了更多的功能和更好的性能。
不过在 Swift 和 Objective-C 之间进行桥接时，String 和 NSString 之间可以相互转换。
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
在 Swift 项目中管理资源名称通常涉及到管理图像、音频文件、字符串等。
以下是一些在 Swift 项目中管理资源名称的常见方法：

1. Asset Catalogs（资源目录）：
Asset Catalogs 是 Xcode 提供的一种管理资源文件的方式，通常用于图像、图标和启动图片等。
你可以在 Xcode 中创建 Asset Catalogs，并将资源文件组织在其中。
在代码中，你可以通过 Asset Catalogs 中提供的名称来访问资源，而不需要硬编码资源的文件名。

2. 文件名常量：
在 Swift 项目中，你可以创建文件名常量或者枚举来管理资源文件的名称。
例如，你可以创建一个包含资源文件名称的结构体或者常量文件，然后在代码中引用这些常量而不是直接使用字符串。

struct ImageName {
    static let logo = "logo.png"
    static let background = "background.jpg"
}

3. Bundle 资源：
你也可以直接使用 Bundle 来访问项目中的资源文件。
Bundle 提供了访问项目资源的方法，你可以使用 Bundle.main 来访问主资源包中的资源文件。

if let imagePath = Bundle.main.path(forResource: "image", ofType: "png") {
    let image = UIImage(contentsOfFile: imagePath)
}

4. NSLocalizedString（国际化）：
如果你需要管理多语言版本的字符串资源，可以使用 NSLocalizedString 函数来创建本地化字符串。
这样可以使你的应用程序支持多种语言，并且方便进行本地化管理。

let localizedString = NSLocalizedString("hello_world", comment: "Greeting")

5. 第三方工具：
除了上述方法，还有一些第三方工具和库可以帮助你更方便地管理资源文件的名称，例如 SwiftGen、R.Swift 等。
这些工具可以自动生成类型安全的资源访问代码，从而避免了手动管理资源文件名称的问题。

总的来说，你可以根据项目的需求选择适合的方式来管理资源文件的名称。
使用 Asset Catalogs 和文件名常量是常见的做法，而第三方工具可以进一步简化资源管理的流程。
```

## 三 参考

* [简书—Swift与OC](https://www.jianshu.com/p/410f01d9e638)

