---
title: Flutter面试题——面试题整理5
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: df08d56f
date: 2024-03-25 11:00:03
---
## 一 面试题汇总

1. dart是什么，和flutter有什么关系？
2. main()和runApp()函数在flutter的作用分别是什么？有什么关系吗？
3. 什么是widget?  在flutter里有几种类型的widget？分别有什么区别？能分别说一下生命周期吗？
4. Hot Restart 和 Hot Reload 有什么区别吗？
5. 在flutter里streams是什么？有几种streams？有什么场景用到它？<!--more-->
6. 简单说一下在flutter里async和await？
7. future 和steam有什么不一样？
8. 什么是flutter里的key? 有什么用？
9. 在什么场景下使用profile mode？
10. 怎么做到只在debug mode运行代码？
11. 怎么理解Isolate？   
12. 列举在flutter的状态管理方案？

## 二  面试题解答(仅供参考)

### 2.1 dart是什么，和flutter有什么关系？

```
dart是一种面向对象语言，dart是flutter的程序开发语言。
```

### 2.2 main()和runApp()函数在flutter的作用分别是什么？有什么关系吗？

```
main函数是类似于java语言的程序运行入口函数
runApp函数是渲染根widget树的函数
一般情况下runApp函数会在main函数里执行
```

### 2.3  什么是widget?  在flutter里有几种类型的widget？分别有什么区别？能分别说一下生命周期吗？

```
widget在flutter里基本是一些UI组件
有两种类型的widget，分别是statefulWidget 和 statelessWidget两种
statelessWidget不会自己重新构建自己，但是statefulWidget会    
```

### 2.4 Hot Restart 和 Hot Reload 有什么区别吗？

```
Hot Reload比Hot Restart快，Hot Reload会编译我们文件里新加的代码并发送给dart虚拟机，
dart会更新widgets来改变UI，而Hot Restart会让dart 虚拟机重新编译应用。
另一方面也是因为这样， Hot Reload会保留之前的state，
而Hot Restart回你重置所有的state回到初始值。
```

### 2.5 在flutter里streams是什么？有几种streams？有什么场景用到它？

```
Stream 用来处理连续的异步操作，Stream 是一个抽象类，用于表示一序列异步数据的源。
它是一种产生连续事件的方式，可以生成数据事件或者错误事件，以及流结束时的完成事件

Stream 分单订阅流和广播流。
```

### 2.6 简单说一下在flutter里async和await？

```
await的出现会把await之前和之后的代码分为两部分，
await并不像字面意思所表示的程序运行到这里就阻塞了，
而是立刻结束当前函数的执行并返回一个Future，函数内剩余代码通过调度异步执行。


async是和await搭配使用的，await只在async函数中出现。
在async 函数里可以没有await或者有多个await。
```

### 2.7 future 和steam有什么不一样？

```
在 Flutter 中有两种处理异步操作的方式 Future 和 Stream，
Future 用于处理单个异步操作，
Stream 用来处理连续的异步操作
```

### 2.8 什么是flutter里的key? 有什么用？

```
key是Widgets，Elements和SemanticsNodes的标识符。
key有LocalKey 和 GlobalKey两种。

LocalKey 如果要修改集合中的控件的顺序或数量。
GlobalKey允许 Widget 在应用中的任何位置更改父级而不会丢失 State。
```

### 2.9 在什么场景下使用profile mode？

```
profile model 是用来评估app性能的，profile model 和release mode是相似的，
只有保留了一些需要评估app性能的debug功能。
在模拟器上profile model是不可用的
```

### 2.10 怎么做到只在debug mode运行代码？

```
foundation有一个静态的变量kReleaseMode来表示是否是release mode
```

### 2.11 怎么理解Isolate？   

```
isolate是Dart对actor并发模式的实现。 
isolate是有自己的内存和单线程控制的运行实体。isolate本身的意思是“隔离”，
因为isolate之间的内存在逻辑上是隔离的。
isolate中的代码是按顺序执行的，任何Dart程序的并发都是运行多个isolate的结果。
因为Dart没有共享内存的并发，没有竞争的可能性所以不需要锁，也就不用担心死锁的问题
```

### 2.12 列举在flutter的状态管理方案？

```
Scoped Model
Redux
BLoC
RxDart
provider
```

## 三 参考

* [博客园—一些面试可能会问基础知识](https://www.cnblogs.com/sundaysandroid/p/13528265.html)


