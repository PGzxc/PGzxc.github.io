---
title: IOS面试题——Swift流程控制(2)
categories:
  - 面试相关
  - IOS面试题
tags:
  - Swift面试题
abbrlink: b4f34055
date: 2024-03-27 10:48:51
---
## 一 面试题汇总

1. for in 在Swift上有什么特点？
2. 什么是区间类型？跨间隔的区间怎么实现？stride
3. Swift中switch怎么实现贯穿效果？复合条件或fallthrouh
4. switch与元组结合有什么效果？元祖与where结合呢？
5. switch区间匹配？
6. guard..else与do..while有什么区别

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 for in 在Swift上有什么特点？

```
1.for-in 在 Swift 中是一种非常简洁和强大的循环方式，可以用于遍历数组、字典、集合、字符串、范围等。
2.可以结合 where 子句来增加过滤条件。
3.支持遍历自定义类型，只要这些类型遵循 Sequence 或 Collection 协议。
4.在遍历集合时，可以选择使用常量或变量来表示当前元素。
```

### 2.2 什么是区间类型？跨间隔的区间怎么实现？stride

```
闭区间（Closed Range）：包含起始和结束值（1...5）。
半开区间（Half-Open Range）：包含起始值，但不包含结束值（1..<5）。
单侧区间（One-Sided Range）：仅有一个边界，另一个没有限制（...5 或 1...）。
跨区间：Swift 没有内建的跨区间类型，但可以通过合并多个区间或创建自定义类型来实现跨区间的效果。
```

### 2.3 Swift中switch怎么实现贯穿效果？复合条件或fallthrouh

```
Swift 中的 switch 默认不支持贯穿效果，但可以使用 fallthrough 来实现。
使用 fallthrough 时，不会进行条件判断，只是执行下一个 case 的代码。
```

### 2.4 switch与元组结合有什么效果？元组与where结合呢？

```
switch 与元组结合：可以同时匹配元组中的多个元素，并使用 let 绑定元组的元素到常量。
switch 与元组结合并使用 where：where 子句可以为模式匹配添加额外的条件，从而实现更复杂的逻辑判断。
这种组合使得 switch 语句在匹配元组时更加灵活和强大，可以对多个值同时进行匹配和条件判断。
```

### 2.5 switch区间匹配？

```
区间匹配：switch 可以使用闭区间（...）或半开区间（..<）来匹配值是否落在某个范围内。
多个区间匹配：可以将多个区间条件合并到一个 case 中，实现多范围匹配。
与 where 子句结合：你可以通过 where 结合额外条件进行更复杂的匹配
```

### 2.6 guard..else与do..while有什么区别

```
guard...else 主要用于提前退出并验证条件。
do...while（repeat...while）用于执行至少一次代码并判断是否继续循环。
```

## 三 参考

* [简书—Swift流程控制(](https://www.jianshu.com/p/410f01d9e638)

