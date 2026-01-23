---
title: Flutter开发之——BottomSheet(44)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 98d66278
date: 2021-04-19 15:12:19
---
## 一 概述

本文介绍两个底部弹出组件

* showBottomSheet：showBottomSheet是Home类的一个方法并且能够使用Home的context
* showModalBottomSheet：没有showBottomSheet使用限制，从底部弹出，通常和BottomSheet配合使用
* showCupertinoModalPopup：ios的风格弹出框，和CupertinoActionSheet配合使用

<!--more-->

## 二 showBottomSheet

### 2.1 源码

```
PersistentBottomSheetController<T> showBottomSheet<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  Color? backgroundColor,
  double? elevation,
  ShapeBorder? shape,
  Clip? clipBehavior,
  AnimationController? transitionAnimationController,
})
```

### 2.2 示例

#### 代码

```
class Home extends StatelessWidget {
  void _showSettingsPanel(context) {
    showBottomSheet(
        context: context,
        builder: (context) {
          return Container(
            color: Colors.orange,
            padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 150.0),
            child: Text('bottom sheet'),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.brown[50],
        appBar: AppBar(
          title: Text('Flutter'),
          backgroundColor: Colors.brown[400],
          elevation: 0.0,
          actions: <Widget>[
            FlatButton.icon(
                onPressed: () async {},
                icon: Icon(Icons.person),
                label: Text('Log Out')),
            Builder(builder: (context) {
              return FlatButton.icon(
                icon: Icon(Icons.settings),
                label: Text('settings'),
                onPressed: () => _showSettingsPanel(context),
              );
            })
          ],
        ),
        body: Text(""),
      ),
    );
  }
}
```

#### 效果图
![][1]

## 三 showModalBottomSheet

### 3.1 源码

```
Future<T?> showModalBottomSheet<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  Color? backgroundColor,
  double? elevation,
  ShapeBorder? shape,
  Clip? clipBehavior,
  Color? barrierColor,
  bool isScrollControlled = false,
  bool useRootNavigator = false,
  bool isDismissible = true,
  bool enableDrag = true,
  RouteSettings? routeSettings,
  AnimationController? transitionAnimationController,
})
```

### 3.2 属性介绍

* backgroundColor：背景色
* shape：形状

### 3.3 示例

#### 代码

```
RaisedButton(
             child: Text("showBottomSheet"),
             onPressed: () {
                  showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      elevation: 10,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                      builder: (BuildContext context) {
                        return Container(height: 200,);
                      });
                }),
```

#### 效果图
![][2]
## 四 showCupertinoModalPopup

### 4.1 示例

#### 代码
```
RaisedButton(
             child: Text("showCupertinoModalPopup"),
             onPressed: () {
                  showCupertinoModalPopup(
                      context: context,
                      filter: ImageFilter.blur(sigmaX: 5.0, sigmaY: 5.0),
                      builder: (BuildContext context) {
                        return CupertinoActionSheet(
                          title: Text('提示'),
                          message: Text('是否要删除当前项？'),
                          actions: <Widget>[
                            CupertinoActionSheetAction(
                              child: Text('删除'),
                              onPressed: () {},
                              isDefaultAction: true,
                            ),
                            CupertinoActionSheetAction(
                              child: Text('暂时不删'),
                              onPressed: () {},
                              isDestructiveAction: true,
                            ),
                          ],
                        );
                      }
                  );
                })
```

#### 效果图
![][3]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showBottomSheet-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showModalBottomSheet-sample.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showCupertinoModal-sample.png