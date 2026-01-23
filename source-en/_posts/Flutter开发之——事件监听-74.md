---
title: Flutter开发之——事件监听(74)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e64a1726
date: 2021-05-10 17:25:59
---
## 一 概述

本文介绍的事件监听分为两类：触摸层和手势层

* 触摸层：用户手指在页面上的按下、移动、抬起和取消操作，并可以实时获取用户手指在页面上的位置
* 手势层：触摸层的封装，对用户手势进行监听；滑动、拖拽、单击、双击、长按等

<!--more-->

## 二 触摸事件(Listener)

### 2.1  构造函数

```
class Listener extends SingleChildRenderObjectWidget {
  const Listener({
    Key? key,
    this.onPointerDown,
    this.onPointerMove,
    this.onPointerUp,
    this.onPointerHover,
    this.onPointerCancel,
    this.onPointerSignal,
    this.behavior = HitTestBehavior.deferToChild,
    Widget? child,
  })
...
}
```

### 2.2  说明

* Listener是一个处理事件交互的组件
* 当需要监听某个组件上的触摸行为时，只需要将其嵌套进Listener组件，并为其设置监听回调函数即可

### 2.3  Listener监听事件

|   监听函数    |    说明    |
| :-----------: | :--------: |
| onPointerDown | 按下时回调 |
| onPointerMove | 移动时回调 |
|  onPointerUp  | 抬起时回调 |

所有的Pointerxxx都继承于PointerEvent，属性如下

|     属性      |         说明          |
| :-----------: | :-------------------: |
|   position    | 相对屏幕的坐标的偏移  |
| localPosition |  相对当前控件的偏移   |
|   pressure    |       按压力度        |
|     delta     | 2次指针移动事件的偏移 |
|  orientation  |     指针移动方向      |

### 2.4  示例

代码

```
Listener(
         onPointerDown: (PointerDownEvent pointerDownEvent) {
            print('$pointerDownEvent');
          },
         onPointerMove: (PointerMoveEvent pointerMoveEvent) {
            print('$pointerMoveEvent');
          },
         onPointerUp: (PointerUpEvent upEvent) {
            print('$upEvent');
          },
         child: Container(height: 200, width: 200, color: Colors.blue, alignment: Alignment.center,),
        )
```

打印结果

```
I/flutter (24815): _TransformedPointerDownEvent#876cf(position: Offset(123.0, 174.5))
I/flutter (24815): _TransformedPointerUpEvent#7c12b(position: Offset(123.0, 174.5))
I/flutter (24815): _TransformedPointerDownEvent#d6763(position: Offset(114.0, 213.0))
I/flutter (24815): _TransformedPointerMoveEvent#37bbf(position: Offset(114.0, 214.0))
I/flutter (24815): _TransformedPointerMoveEvent#27cbb(position: Offset(114.0, 216.0))
...
I/flutter (24815): _TransformedPointerMoveEvent#1951d(position: Offset(123.0, 225.0))
I/flutter (24815): _TransformedPointerMoveEvent#f99e9(position: Offset(124.5, 225.5))
I/flutter (24815): _TransformedPointerUpEvent#b1a92(position: Offset(124.5, 225.5))
```

## 三 手势事件(GestureDetector)

### 3.1 构造函数

```
class GestureDetector extends StatelessWidget {
  GestureDetector({
    Key? key,
    this.child,
    this.onTapDown,
    this.onTapUp,
    this.onTap,
    this.onTapCancel,
    this.onSecondaryTap,
    ...
 }   
```

### 3.2 说明

* GestureDetector是手势识别组件
* GestureDetector可以识别单击、双击、长按、拖拽、缩放等手势

### 3.3 事件

#### 单击事件

单击事件包含

* onTapDown：按下时回调
* onTapUp：抬起时回调
* onTap：点击事件回调
* onTapCancel：点击取消事件回调

用法

```
GestureDetector(
      onTapDown: (TapDownDetails tapDownDetails) {
        print('onTapDown');
      },
      onTapUp: (TapUpDetails tapUpDetails) {
        print('onTapUp');
      },
      onTap: () {
        print('onTap');
      },
      onTapCancel: () {
        print('onTapCancel');
      },
      child: Center(child: Container(width: 200,height: 200,color: Colors.red,),),
    )
```

按下然后抬起调用顺序

```
onTapDown-> onTapUp-> onTap
```

按下后移动的调用顺序

```
onTapDown-> onTapCancel
```

#### 双击事件

双击是快速且连续2次在同一个位置点击，双击监听使用onDoubleTap方法，用法如下：

```
GestureDetector(
  onDoubleTap: ()=>print('onDoubleTap'),
  child: Center(
    child: Container(
      width: 200,
      height: 200,
      color: Colors.red,
    ),
  ),
)
```

#### 长按事件

长按事件（LongPress）包含长按开始、移动、抬起、结束事件，说明如下：

* onLongPressStart：长按开始事件回调
* onLongPressMoveUpdate：长按移动事件回调
* onLongPressUp：长按抬起事件回调
* onLongPressEnd：长按结束事件回调
* onLongPress：长按事件回调

示例

```
GestureDetector(
  onLongPressStart: (v) => print('onLongPressStart'),
  onLongPressMoveUpdate: (v) => print('onLongPressMoveUpdate'),
  onLongPressUp: () => print('onLongPressUp'),
  onLongPressEnd: (v) => print('onLongPressEnd'),
  onLongPress: () => print('onLongPress'),
  child: Center(
    child: Container(
      width: 200,
      height: 200,
      color: Colors.red,
    ),
  ),
)
```

#### 水平/垂直拖动事件

垂直/水平拖动事件包括按下、开始、移动更新、结束、取消事件，以垂直为例说明如下

* onVerticalDragDown：垂直拖动按下事件回调
* onVerticalDragStart：垂直拖动开始事件回调
* onVerticalDragUpdate：指针移动更新事件回调
* onVerticalDragEnd：垂直拖动结束事件回调
* onVerticalDragCancel：垂直拖动取消事件回调

示例

```
GestureDetector(
  onVerticalDragStart: (v) => print('onVerticalDragStart'),
  onVerticalDragDown: (v) => print('onVerticalDragDown'),
  onVerticalDragUpdate: (v) => print('onVerticalDragUpdate'),
  onVerticalDragCancel: () => print('onVerticalDragCancel'),
  onVerticalDragEnd: (v) => print('onVerticalDragEnd'),
  child: Center(
    child: Container(
      width: 200,
      height: 200,
      color: Colors.red,
    ),
  ),
)
```

用户垂直方向拖动调用顺序如下

```
onVerticalDragDown->onVerticalDragStart->onVerticalDragUpdate-> … -> onVerticalDragUpdate-> onVerticalDragEnd。
```

#### 缩放事件

缩放（Scale）包含缩放开始、更新、结束。说明如下

* onScaleStart：缩放开始事件回调
* onScaleUpdate：缩放更新事件回调
* onScaleEnd：缩放结束事件回调

示例

```
GestureDetector(
  onScaleStart: (v) => print('onScaleStart'),
  onScaleUpdate: (ScaleUpdateDetails v) => print('onScaleUpdate'),
  onScaleEnd: (v) => print('onScaleEnd'),
  child: Center(
    child: Container(
      width: 200,
      height: 200,
      color: Colors.red,
    ),
  ),
)
```

缩放需要2个指针，对于手机就是2个手指进行缩放操作，调用顺序如下

```
onScaleStart->onScaleUpdate->…->onScaleUpdate->onScaleEnd
```

