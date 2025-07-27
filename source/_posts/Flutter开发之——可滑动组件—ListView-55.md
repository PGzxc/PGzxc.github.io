---
title: Flutter开发之——可滑动组件—ListView(55)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: eb878285
date: 2021-04-22 14:44:06
---
## 一 概述

ListView跟GridView的功能类似，都是常用的滚动展示数据的列表组件

* 通过构造创建方式
* 通过：build，separated，custom快速创建

<!--more-->

## 二 ListView

### 2.1 构造函数

```
ListView({
    Key? key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController? controller,
    bool? primary,
    ScrollPhysics? physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry? padding,
    this.itemExtent,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double? cacheExtent,
    List<Widget> children = const <Widget>[],
    int? semanticChildCount,
    DragStartBehavior dragStartBehavior = DragStartBehavior.start,
    ScrollViewKeyboardDismissBehavior keyboardDismissBehavior = ScrollViewKeyboardDismissBehavior.manual,
    String? restorationId,
    Clip clipBehavior = Clip.hardEdge,
  })
```

### 2.2 常见属性说明

|       属性       |       说明       |       取值       |
| :--------------: | :--------------: | :--------------: |
|     reverse      | 是否反转滚动方向 |       bool       |
|    controller    |    滚动控制器    | ScrollController |
| scrollDirection① |     滚动方向     |     Axis枚举     |
|     physics②     |   滚动物理特性   |  ScrollPhysics   |

#### scrollDirection①

|    属性    |     说明     |
| :--------: | :----------: |
| horizontal | 水平方向滚动 |
|  vertical  | 垂直方向滚动 |

#### physics②

|             属性              |            说明             |
| :---------------------------: | :-------------------------: |
| AlwaysScrollableScrollPhysics |        总是可以滑动         |
| NeverScrollableScrollPhysics  |          禁止滚动           |
|     BouncingScrollPhysics     | 内容超过一屏 上拉有回弹效果 |
|     ClampingScrollPhysics     |     包裹内容 不会有回弹     |

## 三 构建方式创建ListView

### 3.1 代码

```
ListView(
          children: List.generate(10, (position) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[position % Colors.primaries.length],
              child: Text("$position"),
            );}),
        )
```

### 3.2 效果图

![][1]

## 四 快速创建方式 build，separated，custom

### 4.1 ListView.build

#### 构建属性

* `itemBuilder`是构建子控件
* `itemCount`指定数据个数

#### 构建代码

```
ListView.builder(
          itemCount: 10,
          itemBuilder: (context, index) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[index % Colors.primaries.length],
              child: Text("$index"),
            );
          },
        )
```

### 4.2 ListView.separated

#### 使用说明

* 当每一项有分割线要求时，使用这个构建方式创建

#### 构建属性

* itemCount：数据个数
* separatorBuilder：分隔项构建控件
* itemBuilder：子控件构建

#### 构建代码

```
ListView.separated(
          itemCount: 10,
          separatorBuilder: (context,index){return Divider(height: 10,);} ,
          itemBuilder: (context, index) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[index % Colors.primaries.length],
              child: Text("$index"),
            );
          },
        )
```

### 4.3 ListView.custom

#### 构建说明

childrenDelegate：提供子组件构建的代理，有`SliverChildBuilderDelegate`和`SliverChildListDelegate`可用于快速构建

#### 构建代码

SliverChildBuilderDelegate构建方式

```
ListView.custom(
          childrenDelegate:  SliverChildBuilderDelegate((context, index) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[index % Colors.primaries.length],
              child: Text("$index"),
            );
          },childCount: 10))
```

SliverChildListDelegate构建方式

```
ListView.custom(
          childrenDelegate: SliverChildListDelegate(List.generate(10, (position) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[position % Colors.primaries.length],
              child: Text("$position"),
            );
          })),
        )
```


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-listView-construct-sample.gif