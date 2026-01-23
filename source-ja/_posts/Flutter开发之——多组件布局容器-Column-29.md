---
title: Flutter开发之——多组件布局容器-Column(29)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: a0fb6471
date: 2021-04-08 17:26:41
---
## 一 概述

* Column：英文意思为`列`，Flutter中是指列布局容器
* Column是多组件布局容器，子控件的排列方式为垂直方向

<!--more-->

## 二 Column

### 2.1 构造方法

```
Column({
    Key? key,
    MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
    MainAxisSize mainAxisSize = MainAxisSize.max,
    CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
    TextDirection? textDirection,
    VerticalDirection verticalDirection = VerticalDirection.down,
    TextBaseline? textBaseline,
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
|    start     |                     上对齐                     |
|     end      |                     下对齐                     |
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

|   取值   |         说明         |
| :------: | :------------------: |
|  start   |        左对齐        |
|   end    |        右对齐        |
|  center  |       居中对齐       |
| baseline |       基线对齐       |
| stretch  | 拉伸充满父容器(宽度) |

#### textDirection

| 取值 |   说明   |
| :--: | :------: |
| ltr  | 从左到右 |
| rtl  | 从右到左 |

#### verticalDirection
| 取值 |   说明   |
| :--: | :------: |
|  up  | 从上往下 |
| down | 从下往上 |

## 三 示例

### 3.1 代码

```
Column(
            mainAxisSize: MainAxisSize.max,
            textDirection: TextDirection.ltr,
            verticalDirection: VerticalDirection.down,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                height: 120,
                width: 100,
                color: Colors.red,
                child: Text("Text"),
              ),
              Container(
                height: 120,
                width: 110,
                color: Colors.green,
              ),
              Container(
                height: 120,
                width: 120,
                color: Colors.blue,
              ),
            ],
          )
```

### 3.2 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-column-crossAxisAlignment.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-column-sample.png