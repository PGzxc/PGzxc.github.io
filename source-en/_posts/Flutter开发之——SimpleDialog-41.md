---
title: Flutter开发之——SimpleDialog(41)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 119b91b1
date: 2021-04-16 15:27:19
---
## 一 概述

* SimpleDialog的用法跟AlertDialog基本类似
* SimpleDialog跟showDialog联合使用

<!--more-->

## 二 SimpleDialog

### 2.1 构造方法

```
const SimpleDialog({
    Key? key,
    this.title,
    this.titlePadding = const EdgeInsets.fromLTRB(24.0, 24.0, 24.0, 0.0),
    this.titleTextStyle,
    this.children,
    this.contentPadding = const EdgeInsets.fromLTRB(0.0, 12.0, 0.0, 16.0),
    this.backgroundColor,
    this.elevation,
    this.semanticLabel,
    this.insetPadding = _defaultInsetPadding,
    this.clipBehavior = Clip.none,
    this.shape,
  })
```

## 三 示例

#### 代码

```
RaisedButton(
            child: Text("SimpleDialog"),
            onPressed: () {
                  showDialog(
                      context: context,
                      builder: (builder) {
                        return SimpleDialog(
                          title: Text('提示'),
                          children: <Widget>[
                            Container(height: 80, alignment: Alignment.center, child: Text('确认删除吗？'),),
                            Divider(height: 1,),
                            FlatButton(child: Text('取消'), onPressed: () {Navigator.of(context).pop('cancel');},),
                            Divider(height: 1,),
                            FlatButton(child: Text('确认'), onPressed: () {Navigator.of(context).pop('ok');},
                            ),
                          ],
                        );
                      });
                })
```

#### 效果图

![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showdialog-simpleDialog-sample.gif