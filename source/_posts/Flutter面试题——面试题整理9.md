---
title: Flutter面试题——面试题整理9
categories:
  - 面试相关
  - Flutter面试题
tags:
  - Flutter面试题
abbrlink: d6be9944
date: 2024-03-25 18:40:21
---
## 一 面试题汇总

1. Widget在一些窄屏设备上，文本溢出了，你会如何修复呐？
2. Row显示宽度太窄无法容纳它们时，子节点自动换行到下一行展示如何操作
3. 如何将cheese变成私有变量，怎样将它变成全局变量，什么时候你使用全局变量？
4. hot reload和hot restart的区别是什么？
5. StatelessWidget和StatefulWidget的区别是什么？<!--more-->
6. WidgetsApp和MaterialApp的区别什么?
7. 可以嵌套使用Scaffold吗，为什么或者为什么不？
8. 什么时候适合使用packages、plugins或者三方库？
9. 怎么减少Widget的重新构建？
10. 什么是BuildContext，它有什么用？
11. 在Flutter应用程序中，你怎么和native进行交互？
12. 你可以做哪种类型的测试？
13. 不同状态管理框架的优缺点是什么？

## 二  面试题解答(仅供参考)

### 2.1 Widget在一些窄屏设备上，文本溢出了，你会如何修复呐？

```
使用Expandedwidget来包裹Textwidget，以告知Row忽略Textwidget的固有宽度，
并且根据行中剩余的空间来为其分配宽度
```

### 2.2 Row显示宽度太窄无法容纳它们时，子节点自动换行到下一行展示如何操作

```
只需要将Row替换为Wrap就可以了。
```


### 2.3  如何将cheese变成私有变量，怎样将它变成全局变量，什么时候你使用全局变量？

```
给定下面类
class Pizza {
  String cheese = 'cheddar';
}

1-在变量的前面添加下划线_，可以使它在库中私有化
class Pizza {
  String _cheese = 'cheddar';
}

2-想要一个全局变量，只需要将变量移到类的外面就可以了。
String cheese = 'cheddar';
```

### 2.4 hot reload和hot restart的区别是什么？

```
hot reload在立刻更新UI的同时保持程序的状态，相比之下hot restart花费更长一点的时间，
因为它会在更新UI之前将程序的状态置为初始状态。
两者都比完全重新启动（full restart）要快，这需要重新编译应用程序。

当有重大的更改时，你需要停止并重新运行该程序，在极少数的情况下，
你可能还需要在模拟器或者真机上删除应用程序，然后重新安装。
```

### 2.5 StatelessWidget和StatefulWidget的区别是什么？

```
1-StatelessWidget是一个不可变的类，充当UI布局中某些部分的蓝图，
当某个组件在显示期间不需要改变，或者说没有状态（State），你可以使用它。

2-StatefulWidget也是不可变的，但是它和一个State对象关联在一起，
该对象允许你每次通过调用setState()时，使用新值重建这个widget，
当UI可以动态改变时使用StatefulWidget。
```

### 2.6 WidgetsApp和MaterialApp的区别什么?

```
1-WidgetsApp提供了基础的导航能力，和widgets库一起，它包含了很多Flutter使用的基础widget。

2-MaterialApp和与之相应的的material库，
是在WidgetsApp和与之相应的widgets库之上构建的一层，它遵循了Material设计风格，
可以再任何平台或者设备上为应用程序提供统一的外观，material库提供了更多的Widget。

在你的项目中，你并不一定要使用MaterialApp，也可以使用CupertinoApp来构建iOS风格的应用程序
，这可以使iOS用户感觉更亲切，甚至你也可以自己定义一些widget
```

### 2.7 可以嵌套使用Scaffold吗，为什么或者为什么不？

```
当然可以，你绝对可以嵌套使用Scaffold，这体现Flutter的美，你可以控制整个UI。

Scaffold也是个widget，因此你可以把它放在任何widget可以放置的地方。
通过嵌套Scaffold，你可以对抽屉(drawers)、卡片(snack bars)、底页(bottom sheets)进行分层
```

### 2.8 什么时候适合使用packages、plugins或者三方库？

```
packages和plugins可以极大的节约你的时间，当别人已经解决了一个复杂问题时，
你没必要再解决一遍，尤其是该解决方案已经获得了很好的评价时。

另一方面，过度依赖三方库也可能有一些风险，他们可能编译不过、有bug或者被丢弃，
当你需要切换到新的package或者plugin，可能会对代码做巨大的更改。

这就是为什么需要将业务逻辑和三方库隔离开的原因，
你可以通过创建一个Dart的抽象类，来充当package或者plugin的接口。
一旦你设置完这种结构后，再遇到需要切换package或者plugin情况，你所要做的就只是重写接口层的具体实现了。
```

### 2.9 怎么减少Widget的重新构建？

```
当state发生改变时，你将重新构建widget，这种正常且理想的状态，
因为它允许用户查看反映在UI中的状态更改。
但是重新构建那些不需要改变的UI是性能浪费的。

你可以采取以下措施来减少不必要的Widget重建。

1-首先要做的就是将大的Widget树重构成较小的单个的Widget，每一个Widget都有它自己的build方法。
2-尽可能的使用const构造函数，这将告知Flutter不需要重建这个widget。
3-使stateful widget的子树尽可能的小，如果stateful widget有一个widget子树，
那么为这个stateful widget创建一个自定义widget，并为其提供一个child参数。
```

### 2.10 什么是BuildContext，它有什么用？

```
BuildContext实际上是在Element树中的Widget的元素，
因此每个Widget都有其自己的BuildContext。

你通常使用BuildContext来获取主题(theme)或者另一个Widget的引用，
例如：假如你想要展示一个material dialog，那么你需要获取scaffold的引用，
可以通过Scaffold.of(context)来得到它，其中context就是上下文信息，
通过of()来往上搜索树，直到找到最近的Scaffold。
```
### 2.11 在Flutter应用程序中，你怎么和native进行交互？

```
通常你不需要和原生进行交互，因为Flutter或三方插件会处理这些问题，
但是，如果你发现确实有特殊需要访问一些底层平台，你可以使用平台channel。

其中一种类型是method channel，数据在Dart侧进行序列化，然后会将数据发送到原生侧，
你可以在原生侧编写代码响应交互，然后回传序列化后的数据。
在Android侧可以选用Kotlin或者Java，在iOS侧可以使用Objective-C或者Swift进行编写。

但是，在开发web的时候，你不需要使用channel，这时非必要的步骤。

第二种channel类型是event channel，你可以用来从native发送stream数据到flutter侧，
这对监控传感器数据的场景很有用。

可以在Flutter的文档platform channels中看到更详细的介绍
```

### 2.12 你可以做哪种类型的测试？

```
Flutter中有三种类型的测试：unit tests、widget tests、integration tests，
单元测试是关于检查业务逻辑的有效性，
widget测试确保UI Widget能够正确的响应你的期望，
集成测试用于检测你的APP能否整体正常运行。

还有一种测试不为大家所知，称作golden test，
在golden test中，你有Widget或者屏幕的图像，以查看实际展示的Widget是否和它匹配
```

### 2.13 不同状态管理框架的优缺点是什么？

```
有多种多样的框架，其中一些比较知名状态管理框架，
包括BLOC、伴随ChangeNotifier的Provider、Redux、MobX以及RxDart。
这些都适用于中大型的应用程序。如果你只是快速开发一个小demo，那么stateful widget通常就足够了。

与其列出不同状态管理框架的优缺点，不如查看这些框架更适用哪种场景。
例如，对于某些人与其淹没在不胜枚举的选择中，不如选择一种比较容易掌握的方案，
Provider和MobX都是不错的选择，它们可以直接在state类上调用方法以响应事件，使得这种场景更加直观。

假如你重度依赖流，例如使用Firebase的ApI，那么自然会选择给予数据流的解决方案，比如BLOC和RxDart。

假如你需要撤销/重做功能，那么你需要类似BLOC或者Redux这样，能够很好的处理不可变状态的解决方案
```

## 三 参考

* [简书—Flutter面试题带答案](https://www.jianshu.com/p/de8fbb09dfb4)


