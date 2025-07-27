---
title: Flutter开发之——多组件布局容器-权重组件(Flexible、Expanded、Spacer)(31)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 68151cca
date: 2021-04-09 15:04:56
---
## 一  概述

* Flexible、Expanded、Spacer是多组件布局容器Row、Column、Flex的权重属性组件
* Flexible组件可以控制Row、Column、Flex的子控件占满父控件
* Expanded用于将剩余空间填充满
* Spacer用于撑开Row、Column、Flex的子控件的空隙

<!--more-->

## 二 Flexible

### 2.1 构造方法

```
  const Flexible({
    Key? key,
    this.flex = 1,
    this.fit = FlexFit.loose,
    required Widget child,
  }) : super(key: key, child: child);
```

### 2.2 属性说明

| 属性 |           说明           |    取值     |
| :--: | :----------------------: | :---------: |
| flex | 子控件充满剩余空间的比例 |     int     |
| fit  |    填满剩余空间的方式    | FlexFit类型 |

### 2.3 示例

#### 代码

```
Row(
     children: <Widget>[
          Flexible(
              flex: 1,
              fit: FlexFit.loose,
              child: Container(color: Colors.red, height: 50, alignment: Alignment.center, 
                  child: Text('Flexible1', style: TextStyle(color: Colors.white),),)),
            Flexible(
               flex: 2,
               fit: FlexFit.tight,
               child: Container(alignment: Alignment.center, color: Colors.orange, height: 50,
                  child: Text('Flexible2', style: TextStyle(color: Colors.white),),)),
            Flexible(
               flex: 3,
               fit: FlexFit.tight,
               child: Container(alignment: Alignment.center, color: Colors.blue, height: 50, 
                  child: Text('Flexible3', style: TextStyle(color: Colors.white),),))
          ],
        )
```

#### 效果图

![][1]

## 三 Expanded

### 3.1 构造方法

```
class Expanded extends Flexible {
  /// Creates a widget that expands a child of a [Row], [Column], or [Flex]
  /// so that the child fills the available space along the flex widget's
  /// main axis.
  const Expanded({
    Key? key,
    int flex = 1,
    required Widget child,
  }) : super(key: key, flex: flex, fit: FlexFit.tight, child: child);
}
```

### 3.2 说明

* Expanded继承Flexible，且fit属性为`FlexFit.tigh`（强制）填满剩余空间。

### 3.3 示例

#### 代码

```
Row(
    children: <Widget>[
        Container(alignment: Alignment.center,color:Colors.red, height: 50, child: Text('Expanded1'),),
        Expanded(
            flex: 2,
            child: Container(alignment: Alignment.center, color: Colors.orange, height: 50, child: Text('Expanded2'),)),
        Container(alignment: Alignment.center,color:Colors.blue, height: 50, child: Text('Expanded3'),),
          ],
        )
```

#### 效果图
![][2]
## 四 Spacer

### 4.1 build方法

```
@override
  Widget build(BuildContext context) {
    return Expanded(
      flex: flex,
      child: const SizedBox.shrink(),
    );
  }
```

### 4.2 说明

Spacer的通过Expanded的实现的，和Expanded的区别是：Expanded可以设置子控件，而Spacer的子控件尺寸是0，因此Spacer适用于撑开Row、Column、Flex的子控件的空隙

### 4.3 示例

#### 代码

```
Row(
    children: <Widget>[
         Container(alignment: Alignment.center,color:Colors.red, height: 50, child: Text('Container1'),),
         Spacer(flex: 2,),
         Container(alignment: Alignment.center, color: Colors.orange, height: 50, child: Text('Container2'),),
         Spacer(),
         Container(alignment: Alignment.center,color:Colors.blue, height: 50, child: Text('Container3'),),
          ],
  )
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter_flexible_sample.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-expanded-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-spacer-sample.png