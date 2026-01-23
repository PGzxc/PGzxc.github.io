---
title: Flutter开发之——getX-改变主题(120)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
  - getX
abbrlink: 8a4c4048
date: 2022-05-08 15:20:31
---
## 一 概述

| 浅色主题 | 深色主题 |
| :------: | :------: |
|  ![][1]  |  ![][2]  |

<!--more-->

## 二 getX中切换主题API

### 2.1 当前是什么模式主题

```
Get.isDarkMode
```

### 2.2 改变当前主题

设置为浅色主题

```
Get.changeTheme(ThemeData.light());
```

设置为深色主题

```
Get.changeTheme(ThemeData.dark());
```

放在一个onPressed中，根据Get.isDarkMode判断

```
Get.changeTheme(Get.isDarkMode? ThemeData.light(): ThemeData.dark());
```

## 三 示例

### 3.1 GetMaterialApp中设置默认主题

```
void main()=>runApp(GetMaterialApp(
    theme:  ThemeData.light(),
    darkTheme: ThemeData.dark(),
    themeMode: ThemeMode.light,
    getPages: [
      GetPage(name: '/', page: ()=>IndexWidget(),binding: IndexBinding())
    ]
));
```

### 3.2 浅色/深色主题按钮

按钮界面相关

```
appBar: AppBar(title: Text('Theme'),
         actions: <Widget>[
           IconButton(icon: Icon(Icons.wb_sunny_rounded),onPressed:()=>controller.changeLight()),
           IconButton(icon: Icon(Icons.nightlight_round),onPressed:()=>controller.changeNight())
         ]),
```

Controller中对应的浅色/深色主题切换逻辑

```
  void changeNight() {
    Get.changeTheme(ThemeData.dark());
  }
  void changeLight(){
    Get.changeTheme(ThemeData.light());
  }
```

说明：

* 本文只做简单演示，若要持久化存储，可将配置信息进行持久化存储

## 四 自定义主题

### 4.1 如何自定义主题

* 单独创建一个theme文件，分别配置lightTheme和darkTheme
* lightTheme是ThemeData.light().copyWith重写方法，设置浅色主题的样式配置
* darkTheme是ThemeData.dark().copyWith重写方法，设置深色主题的样式配置
* 默认配置时，在GetMaterialApp中，将上述的lightTheme设置给theme，darkTheme设置给darkTheme
* 调用Get.changeTheme改变主题时，同理

### 4.2 自定义主题文件(theme)

```
///白天模式
ThemeData lightTheme = ThemeData.light().copyWith(
  primaryColor: Colors.blue,
  splashColor: Colors.white12,
  appBarTheme: AppBarTheme(
    systemOverlayStyle: SystemUiOverlayStyle.dark,
    elevation: 0,
    backgroundColor: ThemeData.light().scaffoldBackgroundColor,
    iconTheme: const IconThemeData(color: Colors.black),
  ),
  scaffoldBackgroundColor: ThemeData.light().scaffoldBackgroundColor,
  backgroundColor: Colors.white,
  iconTheme: const IconThemeData(
    color: Colors.red,
  ),
  bottomNavigationBarTheme: const BottomNavigationBarThemeData(
    selectedItemColor: Colors.blue,
    unselectedItemColor: Colors.tealAccent
  ),
);

///夜间模式
ThemeData darkTheme = ThemeData.dark().copyWith(
  appBarTheme: AppBarTheme(
    systemOverlayStyle: SystemUiOverlayStyle.light,
    elevation: 0,
    backgroundColor: ThemeData.dark().scaffoldBackgroundColor,
    iconTheme: const IconThemeData(color: Colors.white),
  ),
  scaffoldBackgroundColor: ThemeData.dark().scaffoldBackgroundColor,
  backgroundColor: Colors.black,
  iconTheme: const IconThemeData(
    color: Colors.blue,
  ),
  bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      selectedItemColor: Colors.tealAccent,
      unselectedItemColor: Colors.blue
  ),
);
```

### 4.3 自定义主题文件使用

GetMaterialApp

```
void main()=>runApp(GetMaterialApp(
    theme:  lightTheme,
    darkTheme: darkTheme,
    // theme:  ThemeData.light(),
    // darkTheme: ThemeData.dark(),
    themeMode: ThemeMode.light,
    getPages: [
      GetPage(name: '/', page: ()=>IndexWidget(),binding: IndexBinding())
    ]
));
```

onPressed按钮方法

```
  void changeNight() {
    Get.changeTheme(darkTheme);
  }
  void changeLight(){
    Get.changeTheme(lightTheme);
  }
```

## 五 参考

* [Github-getX-改变主题](https://github.com/jonataslaw/getx#change-theme)
* [CSDN下载-示例代码](https://download.csdn.net/download/Calvin_zhou/85320685)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-theme-09-light.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-getx-theme-09-dart.png