---
title: Flutter开发之——Card(47)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 40133a51
date: 2021-04-20 15:59:12
---
## 一 概述

* Card是Material风格的卡片控件，Card有较小的圆角和阴影。
* Card通常用于展示一组信息

<!--more-->

## 二 Card

### 2.1 构造方法

```
 const Card({
    Key? key,
    this.color,
    this.shadowColor,
    this.elevation,
    this.shape,
    this.borderOnForeground = true,
    this.margin,
    this.clipBehavior,
    this.child,
    this.semanticContainer = true,
  }) 
```

### 2.2 属性说明

|    属性     |   说明   |    取值     |
| :---------: | :------: | :---------: |
|    color    | 背景颜色 |    Color    |
|  elevation  |  阴影值  |   double    |
| shadowColor | 阴影颜色 |    Color    |
|    child    |  子控件  |   Widget    |
|    shape    |   形状   | ShapeBorder |

## 三 示例

### 3.1 代码

```
Column(
       children: [
       Card(
              shadowColor: Colors.yellowAccent,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              //color: Colors.orange,
              elevation: 30,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const ListTile(
                    leading: Icon(Icons.album),
                    title: Text('Title-1'),
                    subtitle: Text('Subtitle-1'),
                  ),
                  Row(children: [
                    FlatButton(child: const Text('OK',style:TextStyle(color: Colors.blue) ,), onPressed: () {},),
                    FlatButton(child: const Text('Cancel',style:TextStyle(color: Colors.blue)), onPressed: () {},),
                  ],)
                ],
              ),
            ),
            Divider(thickness: 10,indent: 20,endIndent: 20,color: Colors.deepOrange,),
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              //color: Colors.orange,
              elevation: 10,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const ListTile(
                    leading: Icon(Icons.album),
                    title: Text('Title-2'),
                    subtitle: Text('Subtitle-2'),
                  ),
                  Wrap(children: [
                    FlatButton(child: const Text('OK',style:TextStyle(color: Colors.blue) ,), onPressed: () {},),
                    FlatButton(child: const Text('Cancel',style:TextStyle(color: Colors.blue)), onPressed: () {},),
                  ],)
                ],
              ),
            ),
            Divider(thickness: 10,indent: 20,endIndent: 20,color: Colors.green,),
            Card(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              //color: Colors.orange,
              elevation: 10,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const ListTile(
                    leading: Icon(Icons.album),
                    title: Text('Title-3'),
                    subtitle: Text('Subtitle-3'),
                  ),
                  ButtonBar(
                    children: <Widget>[
                      FlatButton(child: const Text('OK'), onPressed: () {},),
                      FlatButton(child: const Text('Cancel'), onPressed: () {},),
                    ],
                  )
                ],
              ),
            ),
          ],
        )
```

### 3.2 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-card-sample.png