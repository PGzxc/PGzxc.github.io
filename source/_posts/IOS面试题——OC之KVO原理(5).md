---
title: IOS面试题——OC之KVO原理(5)
categories:
  - 面试相关
  - IOS面试题
tags:
  - OC面试题
abbrlink: 5ba825a4
date: 2024-03-26 21:05:47
---
## 一 面试题汇总

1. 什么是KVO？KVO 是如何实现的
2. 不调用set的情况下如何触发KVO，直接用_ivar修改属性值是否触发KVO？
3. 重复添加观察者，重复移除观察者会发生什么现象？
4. `automaticallyNotifiesObserversForKey:` 和 `keyPathsForValuesAffectingValueForKey:`分别有什么作用
5. AFURLRequestSerialization为什么要用automaticallyNotifiesObserversForKey关闭一些方法的自动KVO

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 什么是KVO？KVO 是如何实现的

```
KVO（Key-Value Observing）是一种 Cocoa 框架提供的机制，用于观察对象属性值的变化。
通过 KVO，一个对象可以注册对另一个对象属性的观察，
当被观察的对象的属性值发生变化时，观察者会接收到相应的通知。

KVO 的实现主要基于以下几个核心概念：

1-注册观察者： 
通过调用被观察对象的 addObserver:forKeyPath:options:context: 方法，观察者可以注册对指定键路径的观察。
其中，键路径表示被观察对象的属性路径，可以是单个属性或多层嵌套属性。

2-触发通知： 
当被观察对象的属性值发生变化时，KVO 会自动发送通知给注册的观察者。
这个通知包括被观察对象、观察的键路径、变化前后的值等信息。

3-通知机制： 
KVO 是基于 Objective-C 运行时的，它通过在被观察对象的类中动态生成子类，
并在子类中重写属性的 set 方法来实现。
在设置属性值时，重写的 set 方法会在设置新值之前和之后分别发送通知给观察者。

4-回调方法： 
观察者需要实现一个回调方法 observeValueForKeyPath:ofObject:change:context:，
以接收到属性变化的通知。在这个方法中，观察者可以根据传递的变化信息做出相应的处理。

5-移除观察者： 
当观察者不再需要接收通知时，需要调用被观察对象的removeObserver:forKeyPath:方法来移除观察者。

总的来说，KVO 提供了一种简单且有效的方式来实现对象之间的属性值观察，
它在对象的属性值发生变化时能够自动发送通知给观察者，从而实现了对象之间的解耦和通信
```

### 2.2 不调用set的情况下如何触发KVO，直接用_ivar修改属性值是否触发KVO？

```
在不调用属性的 setter 方法的情况下，直接使用实例变量（_ivar）修改属性值不会触发 KVO。
这是因为 KVO 是基于 setter 方法的调用来实现的，在 setter 方法内部会进行通知的发送。
直接修改实例变量绕过了 setter 方法，因此 KVO 不会被触发。

要让 KVO 生效，需要通过调用属性的 setter 方法来修改属性值，这样才能触发 KVO 监听
```

### 2.3 重复添加观察者，重复移除观察者会发生什么现象？

```
重复添加或移除观察者都可能导致意外的行为和不一致的状态。
因此，在使用 KVO（Key-Value Observing）时，
应该确保在需要的时候正确地添加和移除观察者，避免出现重复注册或移除的情况。
```

### 2.4 `automaticallyNotifiesObserversForKey:` 和 `keyPathsForValuesAffectingValueForKey:`分别有什么作用

```
automaticallyNotifiesObserversForKey: 和 keyPathsForValuesAffectingValueForKey: 
是 KVO（Key-Value Observing）中的两个方法，用于自定义属性的 KVO 行为。

1-automaticallyNotifiesObserversForKey: 方法：

1.1-这个方法允许开发者手动控制是否自动发送 KVO 通知。
默认情况下，当属性的 setter 方法被调用时，KVO 会自动发送通知给观察者。
但是，如果需要在某些情况下暂时禁用 KVO 通知，可以重写这个方法，返回 NO 来关闭 KVO 通知，
或者返回 YES 来开启 KVO 通知。
1.2-通过重写这个方法，可以对特定属性进行精细化的 KVO 控制，
例如在一些特殊的场景下暂时禁用 KVO 通知，以提高性能或者避免不必要的通知。

2-keyPathsForValuesAffectingValueForKey: 方法：

2.1-这个方法用于定义当一个特定属性的值发生变化时，另一个属性也会受到影响的情况。
返回值是一个集合，包含了影响特定属性的其他属性的键路径。
2.2-当返回的键路径中的任何一个属性的值发生变化时，KVO 会自动发送通知给观察者，
通知它们关联的属性的值也可能会发生变化。
2.3-这个方法主要用于建立属性之间的依赖关系，使得当一个属性的值发生变化时，
相关的属性也会收到通知。这在一些衍生属性或者依赖属性的场景中非常有用。

通过这两个方法，开发者可以对 KVO 的行为进行更加精细化的控制，从而实现更灵活和可控的属性观察机制
```

### 2.5 AFURLRequestSerialization为什么要用automaticallyNotifiesObserversForKey关闭一些方法的自动KVO

```
AFURLRequestSerialization 是 Alamofire 框架中用于构建 URL 请求的一部分。
在其内部，可能存在一些属性或者状态变量，这些变量的变化可能会触发 KVO（Key-Value Observing）通知。
在某些情况下，开发者可能希望禁用这些属性的 KVO 通知，以提高性能或者避免不必要的观察。

通过在 AFURLRequestSerialization 类中重写 automaticallyNotifiesObserversForKey: 
方法并返回 NO，开发者可以关闭这些属性的自动 KVO 通知。
这样，即使属性的值发生变化，也不会自动触发 KVO 通知，需要手动发送通知给观察者。
```

## 三 参考

* [简书—OC之KVO原理](https://www.jianshu.com/p/90646f57f692)