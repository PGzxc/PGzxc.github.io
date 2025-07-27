---
title: Flutter开发之——拦截返回事件(91)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: b904840d
date: 2021-06-18 14:24:59
---
## 一 概述

* 拦截返回应用场景
* 拦截返回组件WillPopScope
* 示例

<!--more-->

## 二 拦截返回应用场景

### 2.1 应用场景

* AppBar、CupertinoNavigationBar上面的返回按钮
* Android手机上点击实体（虚拟）返回按钮，也将会回到前一个页面

### 2.2 做法

* 需要询问用户是否退出
* App中有多个Navigator，想要的是让其中一个 Navigator 退出，而不是直接让在 Widget tree 底层的 Navigator 退出

## 三 拦截返回组件WillPopScope

### 3.1 构造函数

```
class WillPopScope extends StatefulWidget {
  const WillPopScope({
    Key? key,
    required this.child,
    required this.onWillPop,
  }) : assert(child != null),
       super(key: key);
 }      
```

### 3.2 如何使用

```
bool shouldPop = true;
@override
Widget build(BuildContext context) {
  return WillPopScope (
    onWillPop: () async {
      return shouldPop;
    },
    child: const Text('WillPopScope sample'),
  );
}
```

* WillPopScope作为build(BuildContext context)的返回组件
* 当执行返回按钮操作时，执行onWillPop回调，返回一个Future
* 当Future为true时，执行pop返回操作

## 四 示例一(拦截弹出对话框)

### 4.1 代码

```
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async => showDialog(
            context: context,
            builder: (context) =>
                AlertDialog(title: Text('你确定要退出吗？'), actions: <Widget>[
                  RaisedButton(child: Text('退出'), onPressed: () => Navigator.of(context).pop(true)),
                  RaisedButton(child: Text('取消'), onPressed: () => Navigator.of(context).pop(false)),])),
        child: Scaffold(
          appBar: AppBar(title: const Text('Flutter WillPopScope demo'),),
          body: Container(alignment: Alignment.center, child: Text('点击后退按钮，询问是否退出。'),),
        ));
  }
```

### 4.2 效果图
![][1]
## 五 示例二(按第2次吐司)

### 5.1 代码

```
  DateTime _lastQuitTime;
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          if (_lastQuitTime == null || DateTime.now().difference(_lastQuitTime).inSeconds > 1) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('再按一次 Back 按钮退出')));
            _lastQuitTime = DateTime.now();
            return false;
          } else {
            print('退出');
            Navigator.of(context).pop(true);
            return true;
          }
        },
        child: Scaffold(
          appBar: AppBar(title: const Text('Flutter WillPopScope demo'),),
          body: Container(alignment: Alignment.center, child: Text('点击后退按钮，询问是否退出。'),),
        ));
  }
```

### 5.2 效果图
![][2]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-willPopScope-dialog.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-willPopScope-toast.gif

