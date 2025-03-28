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
在 Swift 中，值类型（Value Types）和引用类型（Reference Types）有不同的特性。
一个关键区别是，值类型并不支持继承，而只有类（class）支持继承。

1. 值类型（Value Types）：
1.1-包括：结构体（struct）、枚举（enum）、元组（tuple）等。
1.2-特点：值类型在传递时会被复制，而不是通过引用传递
1.3-不支持继承：值类型不能继承其他类型，它们的行为是独立的，无法从其他值类型派生出新的类型

2.引用类型（Reference Types）：
2.1-包括：类（class）。
2.2-特点：引用类型在传递时是通过引用传递的，而不是复制。多个引用可以指向同一个实例
2.3-支持继承：类支持继承，一个类可以从另一个类继承属性、方法、初始化器等，形成继承关系。

总结：
值类型（如结构体、枚举）不支持继承，它们是独立的类型，无法从其他类型派生。
类（class）是引用类型，它支持继承，可以从父类派生出子类，继承父类的属性、方法等
```

### 2.2 Swift中是否有类似NSObject的基类？

```
Swift 中没有像 NSObject 这样的统一基类，但是可以使用 NSObject 作为基类来访问 Objective-C 特性。  
Swift 提供了其他方式来实现类似的功能，如协议（Equatable、Codable）和类型（AnyObject）。
```

### 2.3 Swift如何重写父类的下标、方法、属性？override

```
使用 override 关键字可以重写父类的下标、方法和属性。
重写时可以修改实现，或者调用父类的实现。
```

### 2.4 如何限制不能被重写，或者不能被继承？final

```
final 关键字用于防止类被继承或防止方法、属性、下标被重写。
它有助于提高代码的安全性和优化性能。
```
### 2.5 是否可以重写存储属性？

```
存储属性不能被直接重写，因为它们是类或结构体实例的基础数据。
如果需要修改存储属性的行为，可以通过计算属性或者或者在子类初始化器中调整父类的存储属性来间接实现。
```

### 2.6 let修饰的属性能否重写？

```
let 修饰的属性不能被重写，因为它在父类中被声明为常量，子类无法修改该值。
如果希望允许子类修改该属性，应该使用 var 来声明可变属性。
```

### 2.7 static修饰的属性能否被重写？

```
static 修饰的属性不能被重写。它是类型级别的属性，不支持继承或重写。
如果需要在子类中定义不同的类型属性，可以在子类中声明新的 static 属性，而不是尝试重写父类的 static 属性。
```

## 三 参考

* [简书—Swift继承](https://www.jianshu.com/p/410f01d9e638)

