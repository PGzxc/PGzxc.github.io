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
在 Swift 中，for-in 循环是一种用于迭代遍历集合（如数组、字典、范围等）中的元素的常见方式。
for-in 循环有一些特点和灵活性，如下所示：

1-遍历集合：for-in 循环主要用于遍历集合中的元素，无论集合中有多少元素，它都会自动遍历完整个集合。

2-统一语法：for-in 循环在处理不同类型的集合时，语法都是统一的，这增加了代码的一致性和可读性。

3-遍历范围：除了集合，for-in循环还可以用于遍历范围。例如：for index in 0..<5 { } 将遍历从 0到4的范围。

4-遍历元组：for-in 循环也可以用于遍历元组，以访问其中的元素。

5-迭代器协议：for-in 循环依赖于迭代器协议（Iterator Protocol），这个协议定义了集合如何提供一个序列化的元素序列。

6-支持模式匹配：在 for-in 循环中，可以使用模式匹配来解构元组或者其他复合类型的元素。

7-闭区间遍历：通过使用闭区间操作符 ...，for-in 循环可以遍历闭区间内的所有值。

总的来说，for-in 循环是 Swift 中用于遍历集合和范围的主要迭代工具，
它的灵活性和统一性使得代码更加清晰和易于理解。
```

### 2.2 什么是区间类型？跨间隔的区间怎么实现？stride

```
在 Swift 中，区间类型（Range Type）表示一个范围，它定义了一个从起始值到结束值之间的连续序列。
区间类型可以用来表示一段整数序列或者其他可比较的值的序列。

Swift 中有三种类型的区间：

1-闭区间（Closed Range）：包含起始值和结束值。

let closedRange = 1...5 // 表示从 1 到 5 的闭区间，包含 1 和 5

2-半开区间（Half-Open Range）：包含起始值但不包含结束值。

let halfOpenRange = 1..<5 // 表示从 1 到 5 的半开区间，包含 1，不包含 5

3-单侧区间（One-Sided Range）：只有一个起始值或者结束值。

let oneSidedRange = 0... // 表示从 0 开始一直到最大值的闭区间

跨间隔的区间可以通过 stride 函数来实现。
stride 函数允许你以指定的步长从起始值生成一个序列，直到不超过结束值。
stride 函数有多种形式，其中最常用的包括：

func stride<T: Strideable>(from start: T, to end: T, by stride: T.Stride) -> StrideTo<T>
func stride<T: Strideable>(from start: T, through end: T, by stride: T.Stride) -> StrideThrough<T>

1-from：起始值
2-to 或 through：结束值，to 表示不包含结束值，through 表示包含结束值
3-by：步长

示例：

// 使用 stride 生成跨间隔的区间
let strideRange = stride(from: 1, to: 10, by: 2) // 从 1 到 10，步长为 2
for number in strideRange {
    print(number) // 输出：1, 3, 5, 7, 9
}
在这个例子中，stride 函数生成了一个步长为 2 的序列，从 1 开始一直到不超过 10 的值。
```

### 2.3 Swift中switch怎么实现贯穿效果？复合条件或fallthrouh

```
在 Swift 中，你可以使用 fallthrough 关键字来实现贯穿效果（Fallthrough Effect），
使得 switch 语句在匹配一个 case 后继续执行下一个 case 的代码块。

下面是一个使用 fallthrough 的简单示例：

let grade = "B"

switch grade {
case "A":
    print("优秀")
    fallthrough
case "B":
    print("良好")
    fallthrough
case "C":
    print("及格")
default:
    print("不及格")
}
在这个例子中，如果 grade 是 "B"，则会输出：

良好
及格

因为 fallthrough 关键字使得匹配到 "B" 后，继续执行下一个 case 中的代码块。

另外，Swift 也允许使用复合条件来匹配多个 case。
你可以通过在一个 case 中使用逗号 , 来将多个条件组合在一起。例如：

let num = 5

switch num {
case 1, 2:
    print("小于等于2")
case 3...5:
    print("在3到5之间")
default:
    print("其他")
}
在这个例子中，如果 num 是 3、4 或者 5，将会输出 "在3到5之间"。
```

### 2.4 switch与元组结合有什么效果？元祖与where结合呢？

```
在 Swift 中，你可以使用元组结合 switch 语句来匹配多个值或者条件。
当 switch 语句的 case 部分是元组时，它会按照元组的顺序逐个匹配元组中的值。

元组结合 switch 的效果示例：

let point = (2, 2)

switch point {
case (0, 0):
    print("原点")
case (_, 0):
    print("在 x 轴上")
case (0, _):
    print("在 y 轴上")
case (-2...2, -2...2):
    print("在 [-2, 2] 区间内")
default:
    print("其他位置")
}

在这个例子中，point 是一个元组 (2, 2)。
switch 语句中的 case 部分是一系列元组，它们会逐个和 point 进行匹配。
最终，根据 point 的值匹配到对应的 case 执行相应的代码块。

元组与 where 结合的效果：
除了与元组结合，你还可以在 switch 语句中使用 where 关键字来添加额外的条件。

let point = (2, 2)

switch point {
case let (x, y) where x == y:
    print("x 和 y 相等")
case let (x, y) where x == -y:
    print("x 和 -y 相等")
default:
    print("其他情况")
}
在这个例子中，第一个 case 使用了 where 关键字来添加额外的条件，只有当 x 和 y 相等时才会匹配。
第二个 case 也是类似的，只有当 x 和 -y 相等时才会匹配。
```

### 2.5 switch区间匹配？

```
在 Swift 中，你可以使用区间匹配来在 switch 语句中匹配特定的范围。
这允许你对值进行区间比较，从而更加灵活地匹配条件。

区间匹配示例：

let score = 85

switch score {
case 90...100:
    print("优秀")
case 80..<90:
    print("良好")
case 70..<80:
    print("中等")
case 60..<70:
    print("及格")
default:
    print("不及格")
}

在这个示例中，score 是一个整数值，switch 语句根据不同的分数范围匹配不同的情况。
例如，如果 score 在 90 到 100 之间，那么匹配第一个 case，输出 "优秀"；
如果 score 在 80 到 89 之间，匹配第二个 case，输出 "良好"；以此类推。

在区间匹配中，你可以使用闭区间 ... 和半开区间 ..< 来指定范围。
闭区间包含起始值和结束值，而半开区间不包含结束值。

区间匹配提供了一种简洁、清晰的方法来处理数值范围的情况，并且使得代码更加易读和易于维护。
```

### 2.6 guard..else与do..while有什么区别

```
guard...else 是一种条件语句，用于在条件不满足时提前退出函数或者方法。
do...while 是一种循环结构，用于重复执行代码块直到条件不满足。
```

## 三 参考

* [简书—Swift流程控制(](https://www.jianshu.com/p/410f01d9e638)

