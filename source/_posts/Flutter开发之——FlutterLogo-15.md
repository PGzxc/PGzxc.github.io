---
title: Flutter开发之——FlutterLogo(15)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 3bfce486
date: 2021-03-23 17:41:24
---

## 一 概述

* FlutterLogo是Flutter中用于显示系统图标的组件
* FlutterLogo是一个动画控件(AnimatedContainer实现)

<!--more-->

## 二 Flutter的常用属性

### 2.1 FlutterLogo构造方法

```
  const FlutterLogo({
    Key? key,
    this.size,
    this.textColor = const Color(0xFF757575),
    this.style = FlutterLogoStyle.markOnly,
    this.duration = const Duration(milliseconds: 750),
    this.curve = Curves.fastOutSlowIn,
  }) : assert(textColor != null),
       assert(style != null),
       assert(duration != null),
       assert(curve != null),
       super(key: key);
```

### 2.2 属性说明

|  属性名   |                  说明                  |         取值         |
| :-------: | :------------------------------------: | :------------------: |
|   size    |           设置图标的尺寸大小           |      Double对象      |
| textColor |              设置文本颜色              |      Color对象       |
|   style   |             设置图标的风格             | FlutterLogoStyle对象 |
| duration  | 设置当颜色、风格等变化发生时的动画时间 |     Duration对象     |
|   curve   |      当style或textColor变化时曲线      |      Curve对象       |

#### FlutterLogoStyle说明

|    取值    |                  说明                  |
| :--------: | :------------------------------------: |
|  markOnly  |              仅仅展示图标              |
| horizontal | 水平展示图标和文本(图标在左，文字在右) |
|  stacked   | 水平展示图标和文本(图标在上，文字在下) |

#### Duration说明

```
  const Duration(
      {int days = 0,
      int hours = 0,
      int minutes = 0,
      int seconds = 0,
      int milliseconds = 0,
      int microseconds = 0})
      : this._microseconds(microsecondsPerDay * days +
            microsecondsPerHour * hours +
            microsecondsPerMinute * minutes +
            microsecondsPerSecond * seconds +
            microsecondsPerMillisecond * milliseconds +
            microseconds);
```

|     取值     |   说明   |
| :----------: | :------: |
|     days     |   几天   |
|    hours     | 几个小时 |
|   minutes    |  几分钟  |
|   seconds    |  几秒钟  |
| milliseconds |   毫秒   |
| microseconds |   微妙   |

```
duration: Duration(days: 1,hours: 1, minutes: 1, seconds: 1,milliseconds: 1,microseconds: 1,),
```

## 三 示例

### 3.1 代码

```
var _style = FlutterLogoStyle.horizontal;
body: Column(
        children: <Widget>[
          FlutterLogo(
            size: 160,
            style: _style,
            textColor: Colors.cyan,
            duration: Duration(seconds: 1,milliseconds: 1,),
            curve: Curves.decelerate,
          ),
          RaisedButton(
            child: Text("切换FlutterLogoStyle"),
            onPressed: (){
              setState(() {
                _style = FlutterLogoStyle.stacked;
              });
            },
          ),
        ],
      )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-flutterlogo-sample.gif