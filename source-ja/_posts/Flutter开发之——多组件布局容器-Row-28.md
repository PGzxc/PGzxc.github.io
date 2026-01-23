---
title: Flutter开发之——多组件布局容器-Row(28)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: '487e5313'
date: 2021-04-08 16:30:15
---
## 一 概述

* Row：英文意思为`行`，Flutter中是指行布局容器
* Row是多组件布局容器，子控件的排列方式为水平方向

<!--more-->

## 二 Row

### 2.1 构造方法

```
Row({
    Key? key,
    MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
    MainAxisSize mainAxisSize = MainAxisSize.max,
    CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
    TextDirection? textDirection,
    VerticalDirection verticalDirection = VerticalDirection.down,
    TextBaseline? textBaseline, // NO DEFAULT: we don't know what the text's baseline should be
    List<Widget> children = const <Widget>[],
  }) 
```

### 2.2 属性说明

|        属性        |      说明      |          取值          |
| :----------------: | :------------: | :--------------------: |
| mainAxisAlignment  |  主轴对齐方式  | MainAxisAlignment对象  |
|    mainAxisSize    |    主轴尺寸    |    MainAxisSize对象    |
| crossAxisAlignment | 交叉轴对齐方式 | CrossAxisAlignment对象 |
|   textDirection    |  水平布局方向  |   TextDirection对象    |
| verticalDirection  |  垂直布局方向  | VerticalDirection对象  |

#### MainAxisAlignment取值

|     取值     |                      说明                      |
| :----------: | :--------------------------------------------: |
|    start     |                     左对齐                     |
|     end      |                     右对齐                     |
|    center    |                    居中对齐                    |
| spaceBetween |               均匀分布对齐(顶格)               |
| spaceAround  | 间隔分布对齐(开头和结尾间隔是子控件间隔的一半) |
| spaceEvenly  |          间隔分布对齐(所有间隔都一样)          |

![][1]

#### MainAxisSize

| 取值 |   说明   |
| :--: | :------: |
| min  | 最小尺寸 |
| max  | 最大尺寸 |

#### crossAxisAlignment

|   取值   |      说明      |
| :------: | :------------: |
|  start   |     上对齐     |
|   end    |     下对齐     |
|  center  |    居中对齐    |
| baseline |    基线对齐    |
| stretch  | 拉伸充满父容器 |

#### textDirection

| 取值 |   说明   |
| :--: | :------: |
| ltr  | 从左到右 |
| rtl  | 从右到左 |

![][2]
#### verticalDirection
| 取值 |   说明   |
| :--: | :------: |
|  up  | 从上往下 |
| down | 从下往上 |

## 三 示例

### 3.1 代码

```
Row(
            mainAxisSize: MainAxisSize.max,
            textDirection: TextDirection.rtl,
            verticalDirection: VerticalDirection.up,
            textBaseline: TextBaseline.alphabetic,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Container(
                height: 50,
                width: 80,
                color: Colors.red,
                child: Text("Text"),
              ),
              Container(
                height: 60,
                width: 90,
                color: Colors.green,
              ),
              Container(
                height: 70,
                width: 100,
                color: Colors.blue,
              ),
            ],
          )
```

### 3.2 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-row-mainaxis-alignment.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-row-textdirection.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-row-sample.png