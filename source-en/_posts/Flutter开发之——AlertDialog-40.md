---
title: Flutter开发之——AlertDialog(40)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 35b40173
date: 2021-04-16 14:07:41
---
## 一 概述

* 与用户进行交互时，出现的弹出框，有`确认`和`取消`两个选项
* 两个选项供用户选择，点击`确认`执行操作，点击`取消`，不执行操作

<!--more-->

## 二 如何使用

### 2.1 使用场景

* 用户点击某个按钮，执行操作时
* AlertDialog有Material风格的AlertDialog或者Cupertino（ios风格的)

### 2.2 如何使用

* AlertDialog继承于StatelessWidget，可以作为组件使用
* 常见使用形式是showDialog+AlertDialog的组合形式
* `showDialog`和`AlertDialog`配合使用展示Material风格对话框
* `showCupertinoDialog`和`CupertinoAlertDialog`配合使用展示iOS风格对话框
* `showCupertinoDialog`点击空白处是无法退出对话框的，而`showDialog`点击空白处默认退出对话框
* `barrierDismissible`属性控制点击空白处的行为

### 2.3 AlertDialog构造函数

```
const AlertDialog({
    Key? key,
    this.title,
    this.titlePadding,
    this.titleTextStyle,
    this.content,
    this.contentPadding = const EdgeInsets.fromLTRB(24.0, 20.0, 24.0, 24.0),
    this.contentTextStyle,
    this.actions,
    this.actionsPadding = EdgeInsets.zero,
    this.actionsOverflowDirection,
    this.actionsOverflowButtonSpacing,
    this.buttonPadding,
    this.backgroundColor,
    this.elevation,
    this.semanticLabel,
    this.insetPadding = _defaultInsetPadding,
    this.clipBehavior = Clip.none,
    this.shape,
    this.scrollable = false,
  })
```

### 2.4 常用属性说明

|  属性   |      说明      |     取值      |
| :-----: | :------------: | :-----------: |
|  title  |   Dialog标题   |    Widget     |
| content | Dialog描述内容 |    Widget     |
| actions | 可选操作(按钮) | List\<Widget> |

## 三 示例

### 3.1 Material风格基础用法

#### 代码

```
RaisedButton(
  child: Text('切换'),
  onPressed: () {
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('提示'),
            content: Text('确认删除吗？'),
            actions: <Widget>[
              FlatButton(child: Text('取消'),onPressed: (){},),
              FlatButton(child: Text('确认'),onPressed: (){},),
            ],
          );
        });
  },
)
```

#### 效果图

![][1]

### 3.2 AlertDialog—带样式

#### 代码

```
RaisedButton(
             child: Text("AlertDialog弹出窗口"),
             onPressed: () {
                    showDialog(
                        context: context,
                        builder: (build) {
                          return AlertDialog(
                            title: Text('提示'),
                            content: Text('确认删除吗？'),
                            backgroundColor: Colors.lightBlueAccent,
                            elevation: 24,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(50)),
                            actions: <Widget>[
                              FlatButton(child: Text('取消'), onPressed: () {},),
                              FlatButton(child: Text('确认'), onPressed: () {},),
                            ],
                          );
                        });
                  })
```

#### 效果图
![][2]

### 3.3 CupertinoAlertDialog—IOS风格AlertDialog

#### 代码

```
RaisedButton(
            child: Text('IOS风格对话框'),
            onPressed: () {
            showCupertinoDialog(
                      context: context,
                      builder: (context) {
                        return CupertinoAlertDialog(
                          title: Text('提示'),
                          content: Text('确认删除吗？'),
                          actions: <Widget>[
                            CupertinoDialogAction(
                              child: Text('取消'),
                              onPressed: () {Navigator.of(context).pop('cancel');},
                            ),
                            CupertinoDialogAction(
                              child: Text('确认'),
                              onPressed: () {Navigator.of(context).pop('ok');},
                            ),
                          ],
                        );
                      });
                },
         )
```

#### 效果图
![][3]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showdialog-alertDialog-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showdialog-alertDialog-style-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showdialog-cupertinoAlertDialog-sample.gif