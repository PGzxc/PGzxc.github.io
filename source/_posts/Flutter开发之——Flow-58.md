---
title: Flutter开发之——Flow(58)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 4c774f2
date: 2021-04-22 17:15:49
---
## 一 概述

* Flow是一个流式布局组件，类似于Wrap
* Flow比Wrap使用起来稍微复杂些，需要自己实现子组件的布局，但是可以绘制出更加炫酷的效果

<!--more-->

## 二 Flow

### 2.1 构造函数

```
 Flow({
    Key? key,
    required this.delegate,
    List<Widget> children = const <Widget>[],
    this.clipBehavior = Clip.hardEdge,
  }) 
```

### 2.2 属性说明

|   属性   |                说明                |     取值      |
| :------: | :--------------------------------: | :-----------: |
| delegate | 调整子组件的位置和大小，需要自定义 | FlowDelegate  |
| children |               子控件               | List\<Widget> |

## 三 示例

### 3.1 Flow代码

FlowDelegate定义

```
class MyFlowDelegate extends FlowDelegate {
  @override
  void paintChildren(FlowPaintingContext context) {
    var childCount = context.childCount;
    var offsetX=1.0,offsetY=1.0,offsetZ=1.0;

    for(int i=0;i<childCount;i++){
      context.paintChild(i,transform: Matrix4.translationValues(offsetX, offsetY, offsetZ));
      offsetX+=15;
      offsetY+=15;
      offsetZ+=15;
    }
  }
  @override
  bool shouldRepaint(covariant FlowDelegate oldDelegate) {
    return true;
  }
}
```

组件使用

```
Flow(
     children: List.generate(6, (position) {
              return Container(
                alignment: Alignment.center,
                height: 20,
                width: 20,
                color: Colors.primaries[position % Colors.primaries.length],
                child: Text("$position"),
              );
            }),
            delegate: MyFlowDelegate()))
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flow-sample.png