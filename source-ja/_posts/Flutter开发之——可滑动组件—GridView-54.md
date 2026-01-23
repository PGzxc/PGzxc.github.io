---
title: Flutter开发之——可滑动组件—GridView(54)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: '1199e098'
date: 2021-04-22 13:22:21
---
## 一 概述

GridView是一个可滑动的视图组件，本文介绍GridView的常见创建方法

* 构造创建方式
* 快速创建方式：build，custom，count，extent

<!--more-->

## 二 GridView

### 2.1 构造函数

```
GridView({
    Key? key,
    Axis scrollDirection = Axis.vertical,
    bool reverse = false,
    ScrollController? controller,
    bool? primary,
    ScrollPhysics? physics,
    bool shrinkWrap = false,
    EdgeInsetsGeometry? padding,
    required this.gridDelegate,
    bool addAutomaticKeepAlives = true,
    bool addRepaintBoundaries = true,
    bool addSemanticIndexes = true,
    double? cacheExtent,
    List<Widget> children = const <Widget>[],
    int? semanticChildCount,
    DragStartBehavior dragStartBehavior = DragStartBehavior.start,
    Clip clipBehavior = Clip.hardEdge,
    ScrollViewKeyboardDismissBehavior keyboardDismissBehavior = ScrollViewKeyboardDismissBehavior.manual,
    String? restorationId,
  })
```

### 2.2 常见属性说明

|       属性       |       说明       |                             取值                             |
| :--------------: | :--------------: | :----------------------------------------------------------: |
|   gridDelegate   | 控制子控件的排列 | SliverGridDelegateWithFixedCrossAxisCount①<br>SliverGridDelegateWithMaxCrossAxisExtent |
| scrollDirection② |     滚动方向     |                           Axis枚举                           |
|     reverse      | 是否反转滚动方向 |                             bool                             |
|    controller    |    滚动控制器    |                       ScrollController                       |
|     physics③     |   滚动物理特性   |                        ScrollPhysics                         |

#### SliverGridDelegateWithFixedCrossAxisCount①

|       属性       |          说明           |
| :--------------: | :---------------------: |
|  crossAxisCount  |    交叉轴方向上个数     |
| mainAxisSpacing  | 主轴方向上2行之间的间隔 |
| crossAxisSpacing | 交叉轴方向上之间的间隔  |
| childAspectRatio |      子控件宽高比       |

#### scrollDirection②

|    属性    |     说明     |
| :--------: | :----------: |
| horizontal | 水平方向滚动 |
|  vertical  | 垂直方向滚动 |

#### physics③

|             属性              |            说明             |
| :---------------------------: | :-------------------------: |
| AlwaysScrollableScrollPhysics |        总是可以滑动         |
| NeverScrollableScrollPhysics  |          禁止滚动           |
|     BouncingScrollPhysics     | 内容超过一屏 上拉有回弹效果 |
|     ClampingScrollPhysics     |     包裹内容 不会有回弹     |

## 三 构造方式创建GridView

### 3.1 代码

```
 //State<MyHomePage> 
 ScrollController _gridViewController;
 
  //State<MyHomePage> 
   @override
  void initState() {
    super.initState();
    _gridViewController = ScrollController()
      ..addListener(() {
        print('${_gridViewController.position}');
      });
  }
 //Widget build(BuildContext context) 
 GridView(
          controller:_gridViewController,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3,crossAxisSpacing: 3, mainAxisSpacing: 3),
          children: List.generate(50, (position) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[position % Colors.primaries.length],
              child: Text("$position"),
            );
          }),
        )
```

### 3.2 效果图

![][1]

### 3.3 ScrollController打印结果

```
I/flutter (16530): ScrollPositionWithSingleContext#9a250(offset: 72.8, range: 0.0..1746.0, viewport: 444.0, ScrollableState, ClampingScrollPhysics -> RangeMaintainingScrollPhysics, DragScrollActivity#d503a(ScrollDragController#59958), ScrollDirection.reverse)
I/flutter (16530): ScrollPositionWithSingleContext#9a250(offset: 77.2, range: 0.0..1746.0, viewport: 444.0, ScrollableState, ClampingScrollPhysics -> RangeMaintainingScrollPhysics, DragScrollActivity#d503a(ScrollDragController#59958), ScrollDirection.reverse)
I/flutter (16530): ScrollPositionWithSingleContext#9a250(offset: 83.2, range: 0.0..1746.0, viewport: 444.0, ScrollableState, ClampingScrollPhysics -> RangeMaintainingScrollPhysics, DragScrollActivity#d503a(ScrollDragController#59958), ScrollDirection.reverse)
```

## 四 快速创建方式：build，custom，count，extent

### 4.1 GridView.build

#### 构建必须属性

* `itemBuilder`是构建子控件
* `itemCount`指定数据个数

#### 代码

```
GridView.builder(
          itemCount: 10,
          controller:_gridViewController,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3,crossAxisSpacing: 3, mainAxisSpacing: 3),
          itemBuilder: (context,index){
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[index % Colors.primaries.length],
              child: Text("$index"),
            );
          },
        )
```

### 4.2 GridView.custom

#### 构建必须属性

* childrenDelegate：提供子组件构建的代理，有`SliverChildBuilderDelegate`和`SliverChildListDelegate`可用于快速构建

#### 快速构建代码

SliverChildBuilderDelegate方式

```
GridView.custom(
          controller:_gridViewController,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3,crossAxisSpacing: 3, mainAxisSpacing: 3),
          childrenDelegate: SliverChildBuilderDelegate((context,index){
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[index % Colors.primaries.length],
              child: Text("$index"),
            );
          },childCount: 10) ,
        )
```

SliverChildListDelegate方式

```
GridView.custom(
          controller:_gridViewController,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3,crossAxisSpacing: 3, mainAxisSpacing: 3),
          childrenDelegate: SliverChildListDelegate(List.generate(50, (position) {
            return Container(
              alignment: Alignment.center,
              height: 80,
              color: Colors.primaries[position % Colors.primaries.length],
              child: Text("$position"),
            );})),
        )
```

### 4.3 GridView.count

#### 构建必须属性

crossAxisCount：交叉轴方向上个数

#### 快速构建代码

```
GridView.count(
          controller:_gridViewController,
          crossAxisCount: 3,
          children:  List.generate(50, (position) {
          return Container(
            alignment: Alignment.center,
            height: 80,
            color: Colors.primaries[position % Colors.primaries.length],
            child: Text("$position"),
          );}),
        )
```

### 4.4 GridView.extent

#### 构建必须属性

maxCrossAxisExtent：最大的横轴范围

#### 构建代码

```
GridView.extent(
          controller:_gridViewController,
            maxCrossAxisExtent:100,
          children:  List.generate(50, (position) {
          return Container(
            alignment: Alignment.center,
            height: 80,
            color: Colors.primaries[position % Colors.primaries.length],
            child: Text("$position"),
          );}),
        )
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-gridView-construct-sample.gif