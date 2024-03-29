---
title: IOS面试题——OC中Block本质(4)
categories:
  - 面试相关
  - IOS面试题
tags:
  - OC面试题
abbrlink: 52bea2d8
date: 2024-03-26 20:39:30
---
## 一 面试题汇总

1. block是什么？封装了函数以及函数调用环境的OC对象
2. block分为哪几种类型？有什么区别
3. block变量捕获有哪些情况？auto，static，
4. ARC，MRC情况下定义block使用的属性关键字有什么区别，为什么
5. ARC环境下，哪些情况编译器会根据情况自动将栈上的block复制到堆上 <!--more-->
6. block内部为什么不能修改局部变量，__block为什么能？
7. `__block`有什么限制？`__block`不能修饰全局变量、静态变量（static）
8. `__weak, __strong`分别有什么作用


## 二 面试题解答(仅供参考)

### 2.1 block是什么？封装了函数以及函数调用环境的OC对象

```
在 Objective-C 中，block 是一种特殊的对象，也称为闭包（closure）。
它封装了函数以及函数调用环境，可以在代码中像一个变量一样传递和使用。

block可以捕获其定义时所在的作用域中的变量，并在稍后的时间点执行这些变量所引用的代码。
这使得 block 在异步操作、回调函数等场景中特别有用。

block 可以被传递给函数、方法，也可以被存储为属性或变量，以便稍后使用。
因为它们可以捕获上下文，所以它们可以在调用时访问定义时的变量
```

### 2.2 block分为哪几种类型？有什么区别

```
在 Objective-C 中，block 可以根据其内部捕获的变量的生命周期和存储位置来分为以下几种类型：

1-Global Blocks（全局块）：

1.1-全局块是在编译时创建的，它们在整个程序运行期间都是有效的。
1.2-全局块不捕获任何外部变量，因此它们的执行不依赖于定义它们的上下文。
1.3-这些块通常用于表示静态函数或方法。

2-Stack Blocks（栈块）：

2.1-栈块是在定义时捕获了外部变量的 block。
2.2-栈块的生命周期仅限于其定义的作用域内。一旦超出作用域，栈块所捕获的变量会被释放。
2.3-栈块通常用于短期的异步任务或局部操作。

3-Heap Blocks（堆块）：

3.1-堆块是通过调用 copy 方法从栈上复制而来的块。
3.2-当栈块被复制到堆上时，它们的生命周期不再受限于定义时的作用域，
而是由手动释放或引用计数管理来确定。
3.3-在使用引用计数管理的情况下，通常使用ARC(Automatic Reference Counting)来自动管理内存。
3.4-堆块通常用于长期的异步操作、回调等情景，因为它们的生命周期不依赖于定义它们的作用域。

在使用 block 时，要特别注意其类型和生命周期，以避免内存管理问题和意外的行为。
```

### 2.3 block变量捕获有哪些情况？auto，static，

```
在Objective-C 中，block可以捕获外部变量，而捕获的方式会受到变量的存储类别和block的类型(栈块或堆块)的影响。
主要有以下几种情况：

1-自动变量（auto）：

1.1-当 block捕获自动变量时，它们会按值捕获，即在定义时直接复制一份变量的值。
1.2-如果捕获的是基本数据类型（如 int、float 等），则捕获的是该变量的值的副本。
1.3-如果捕获的是对象类型，则捕获的是对象的强引用（retain）。
1.4-对于栈块，自动变量的捕获仅在定义时进行一次，之后不会再跟踪变量的更新。

2-静态变量（static）：

2.1-当 block 捕获静态变量时，它们同样按值捕获。
2.2-静态变量的捕获与自动变量类似，但由于它们的生命周期长于栈块的定义，
因此捕获后的值可以在块的整个生命周期内保持不变。

3-全局变量：

3.1-全局变量可以在任何类型的 block 中被访问，
因为它们的作用域和生命周期都超出了任何 block 的定义范围。
3.2-block 不会对全局变量进行捕获，而是直接访问其值。

需要注意的是，在使用 block 时，尤其是在异步操作中，
要确保捕获的变量的生命周期与block的执行时机相匹配，以避免潜在的内存管理问题和竞态条件。
```

### 2.4 ARC，MRC情况下定义block使用的属性关键字有什么区别，为什么

```
在 Objective-C 中，ARC（Automatic Reference Counting）和 MRC（Manual Reference Counting）是两种不同的内存管理方式，
它们对于定义 block 时所使用的属性关键字的影响是不同的。

1-ARC（Automatic Reference Counting）下的属性关键字：

1.1-在 ARC 下，可以使用 strong、weak、copy 这些属性关键字来定义 block 属性。
1.2-strong 会在生成的访问器方法中保留（retain） block 对象，
这意味着 block 在对象引用计数不为零时会保持有效。
1.3-weak 则会创建一个弱引用到 block，当 block 的对象被释放后，
弱引用会自动被设置为 nil，避免出现野指针。
1.4-copy 会在生成的访问器方法中复制block对象，确保block在堆上的拷贝，从而防止其在栈上被销毁。

2-MRC（Manual Reference Counting）下的属性关键字：

2.1-在 MRC 下，一般使用copy来定义block属性，这是因为copy可以确保在堆上创建 block 的拷贝，
从而避免在栈上创建的 block 在其作用域结束后被销毁导致的问题。
2.2-虽然 MRC 下也可以使用 retain 关键字，但不推荐，
因为 retain 不能保证 block 在栈上的正确管理，而 copy 则是更安全的做法。

总的来说，无论是 ARC 还是 MRC，都推荐使用 copy 关键字来定义 block 属性，
这样可以确保 block 在堆上的拷贝，避免了在栈上的问题，提高了代码的健壮性和可维护性。
```

### 2.5 ARC环境下，哪些情况编译器会根据情况自动将栈上的block复制到堆上

```
在 ARC（Automatic Reference Counting）环境下，
编译器会根据情况自动将栈上的 block 复制到堆上，主要包括以下情况：

1-将 Block 作为函数返回值返回：
当一个函数返回一个block时，编译器会自动将栈上的block复制到堆上，以确保其在函数返回后继续有效。

2-将 Block 赋值给 strong 修饰的属性或变量：
当一个block被赋值给一个使用strong修饰符的属性或变量时，编译器会自动将栈上的 block 复制到堆上。

3-将 Block 作为参数传递给方法时：
当一个 block 作为参数传递给一个方法时，如果方法参数使用了strong修饰符，
编译器会自动将栈上的 block 复制到堆上。

4-Block 在异步调用中使用：
如果一个 block 在异步调用中使用，例如作为GCD（Grand Central Dispatch）的任务
或者作为 NSOperation 的执行体，编译器会自动将栈上的 block 复制到堆上
，以确保 block 在异步执行期间不会被销毁。

5-Block 在实例变量中使用：
当一个 block 被赋值给一个使用 strong 修饰符的实例变量时，
编译器会自动将栈上的 block 复制到堆上。

这些情况下，编译器会根据需要自动处理 block 的复制操作，
以确保 block 在正确的内存区域（堆上）被管理，从而避免因栈上 block 超出作用域而导致的问题。
```

### 2.6 block内部为什么不能修改局部变量，__block为什么能？

```
对于普通的局部变量，block 按值捕获，修改只会影响到 block 内部的副本，不会影响到原始变量。
对于使用 __block 修饰的局部变量，block 会捕获变量的指针，从而允许 block 内部修改原始变量的值
```

### 2.7 `__block`有什么限制？`__block`不能修饰全局变量、静态变量（static）

```
__block 在 Objective-C 中用于修饰局部变量，允许在 block 内部修改这些变量的值，
并且在 ARC 环境下，它还可以解决循环引用的问题。然而，确实存在一些限制：

1-不能修饰全局变量：
__block 不能用于修饰全局变量。因为全局变量的生命周期超出了任何一个特定的作用域，
而 __block 是用于在块和其作用域之间创建一个关联，所以在全局范围内没有必要使用 __block。

2-不能修饰静态变量（static）：
类似地，__block 也不能用于修饰静态变量。静态变量的生命周期长于函数或代码块的执行，
因此也不适合使用 __block。

总的来说，__block 主要是用于解决在块内部修改局部变量的问题，
对于全局变量和静态变量，由于它们的特殊性和生命周期，不适合使用 __block 来修饰。
```

### 2.8 `__weak, __strong`分别有什么作用

```
__weak 和 __strong 都是用于在 Objective-C 中管理内存的修饰符，它们通常用于声明对象的引用。
在使用 ARC（Automatic Reference Counting）进行内存管理时，这两个修饰符具有不同的作用。

1-__weak：

1.1 __weak 修饰符用于声明一个弱引用（weak reference），它不会增加所引用对象的引用计数。
1.2 当所引用的对象被释放后，__weak 修饰的引用会自动被设置为 nil，避免出现野指针。
1.3 __weak 常用于解决循环引用（retain cycle）的问题，例如在 block 内部捕获 self 时，使用 __weak 可以避免循环引用。

2- __strong：

2.1 __strong 修饰符用于声明一个强引用（strong reference），它会增加所引用对象的引用计数。 
2.2 强引用会使对象的引用计数加一，保证对象在被使用期间不会被释放。
2.3 当强引用的对象不再被需要时，需要手动将强引用设置为 nil，以便对象可以被释放并回收内存。

在 ARC 下，通常会使用 __weak 来避免循环引用，特别是在涉及到 block 的场景中，
而 __strong 则是默认的引用修饰符，用于保持对象在需要时的有效性
```

## 三 参考

* [简书—OC中Block本质](https://www.jianshu.com/p/b4d237dcc252)