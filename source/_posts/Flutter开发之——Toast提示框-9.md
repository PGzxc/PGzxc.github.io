---
title: Flutter开发之——Toast提示框(9)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 8c727f51
date: 2021-02-24 17:12:01
---
## 一 概述

* Toast是Flutter中用于显示信息的弹框
* Flutter官方暂时没有类似Android中的Toast，我们可以借助GitHub上别人封装好的类库实现类似的功能
<!--more-->

## 二 fluttertoast介绍

### 2.1 项目地址
[fluttertoast](https://pub.dartlang.org/packages/fluttertoast)

### 2.2 如何使用

* 将依赖添加到`pubspec.yaml`，并执行`Pub get`

  ```
  fluttertoast: ^7.1.6
  ```

* 将头文件添加到要使用的类中

  ```
  import 'package:fluttertoast/fluttertoast.dart';
  ```

* 调用Fluttertoast的showToast方法

  ```
  Fluttertoast.showToast(
          msg: "This is Center Short Toast",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0
      );
  ```

### 2.3 属性介绍

|        属性        |        说明         |       默认值        |
| :----------------: | :-----------------: | :-----------------: |
|        msg         |     显示的内容      |        非空         |
|    toastLength     |     显示的时间      | Toast.LENGTH_SHORT  |
|      gravity       |     显示的位置      | ToastGravity.BOTTOM |
| timeInSecForIosWeb | 显示时长(ios & web) |        1(s)         |
|  backgroundColor   |       背景色        |        null         |
|     textcolor      |      文字颜色       |        null         |
|      fontSize      |      文字大小       |        null         |

## 三 示例(在默认项目的floatingActionButton显示Toast)

### 3.1 代码

```
floatingActionButton: FloatingActionButton(                             
  onPressed: () => {                                                    
    Fluttertoast.showToast(                                             
        msg: "This is Center Short Toast",                              
        toastLength: Toast.LENGTH_SHORT,                                
        gravity: ToastGravity.CENTER,                                   
        timeInSecForIosWeb: 1,                                          
        backgroundColor: Colors.red,                                    
        textColor: Colors.white,                                        
        fontSize: 18.0),                                                
    //Fluttertoast.cancel()                                             
  },                                                                    
  tooltip: 'Increment',                                                 
  child: Icon(Icons.add),                                               
), // This trailing comma makes auto-formatting nicer for build methods.
```

### 3.2 效果图
![][1]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-floatingactionbutton-toast.gif