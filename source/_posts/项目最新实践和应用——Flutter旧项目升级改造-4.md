---
title: 项目最新实践和应用——Flutter旧项目升级改造(4)
categories:
  - 开发
  - U-项目实践
  - Flutter项目
tags:
  - Flutter项目
abbrlink: c392debc
date: 2025-08-31 09:07:00
---
## 一 概述

```
随着Flutter的升级，旧项目可能出现这样那样的问题，本文加以整理
 -Flutter 代码升级改造
 -直接按清单逐项检查代码改造
```

<!--more-->

## 二  Flutter 代码升级改造(1.x —>3.x)

### 2.1 基础语法 & Dart 层面

```
1、启用空安全 (Null Safety)
 执行：dart migrate 按提示修改 → 避免 null 错误。

2、去掉 new、const 冗余
 Dart 2.12+ 不再强制写 new，建议删掉。
 const 保留在需要优化性能的地方
```

### 2.2 Widget 废弃 —>替换

|                   旧写法                    |                           新写法                            |
| :-----------------------------------------: | :---------------------------------------------------------: |
|               FlatButton(...)               |                       TextButton(...)                       |
|              RaisedButton(...)              |                     ElevatedButton(...)                     |
|             OutlineButton(...)              |                     OutlinedButton(...)                     |
|              ButtonTheme(...)               | TextButtonTheme/ElevatedButtonTheme<br>/OutlinedButtonTheme |
| Scaffold.of(context).showSnackBar(snackBar) |  ScaffoldMessenger.of(context)<br>.showSnackBar(snackBar)   |
|     AppBar(brightness: Brightness.dark)     |   AppBar(systemOverlayStyle: SystemUiOverlayStyle.light)    |
|        Theme.of(context).accentColor        |           Theme.of(context).colorScheme.secondary           |
|  BottomNavigationBarItem(title: Text(...))  |      BottomNavigationBarItem(label: "xxx", icon: ...)       |
|               MaterialButton                |      TextButton` / `ElevatedButton` / `OutlinedButton       |
|       ChipThemeData.fromDefaults(...)       |                     ChipThemeData(...)                      |
|               TextTheme.body1               |                     TextTheme.bodyText2                     |
|               TextTheme.body2               |                     TextTheme.bodyText1                     |
|             TextTheme.headline              |                     TextTheme.headline5                     |
|              TextTheme.subhead              |                     TextTheme.subtitle1                     |

### 2.3 表单 & 输入框

|                         旧写法                          |                            新写法                            |
| :-----------------------------------------------------: | :----------------------------------------------------------: |
| TextFormField(controller: ..., autovalidate: true, ...) | TextFormField(controller: ..., autovalidateMode: AutovalidateMode.always, ...) |
|         InputDecoration.hasFloatingPlaceholder          |             已废弃，改用 `floatingLabelBehavior`             |

### 2.4 图片 & 文件

|                        旧写法                        |              新写法               |
| :--------------------------------------------------: | :-------------------------------: |
| Image.asset('path', colorBlendMode: BlendMode.srcIn) |   仍可用，但建议加 `color: ...`   |
|            image_picker` 返回 `PickedFile            | 返回 `XFile`，用 `.path` 获取路径 |

### 2.5 动画 & 路由

|                     旧写法                     |                            新写法                            |
| :--------------------------------------------: | :----------------------------------------------------------: |
|    showDialog(context: ..., child: Widget)     |    showDialog(context: ..., builder: (context) => Widget)    |
|     showGeneralDialog(child: Widget, ...)      |             showGeneralDialog(pageBuilder: ...)              |
| Navigator.pushReplacementNamed(context, route) | 继续可用，但推荐 `Navigator.of(context).pushReplacementNamed(...)` |
|   ModalRoute.of(context).settings.arguments    |    仍可用，但更推荐 `onGenerateRoute` + 类型安全参数传递     |

### 2.6 Theme & 样式

```
1、主题色迁移
 旧版
 ThemeData(
   primaryColor: Colors.blue,
   accentColor: Colors.red,
 )
新版：
ThemeData(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.blue,
    secondary: Colors.red,
  ),
)

2、文本样式迁移
旧版
Theme.of(context).textTheme.body1
新版
Theme.of(context).textTheme.bodyText2
```

### 2.7 Android/iOS 特殊修改

```
1、Android 12+：每个 activity / service / receiver → 必须加上
android:exported="true"

2、iOS 12+：Podfile 改成
platform :ios, '12.0'

3、Kotlin 升级：
至少 1.8.x
```

### 2.8 依赖相关 API 迁移

```
1、url_launcher
旧：await launch("https://example.com");
新：await launchUrl(Uri.parse("https://example.com"));

2、audioplayers
旧：audioPlayer.play(url);
新：audioPlayer.play(UrlSource(url));

3、firebase
旧：FirebaseAuth.instance.signInWithEmailAndPassword(...);
新（必须先 await Firebase.initializeApp();）：
await FirebaseAuth.instance.signInWithEmailAndPassword(...);
```

## 三 升级流程执行顺序

```
 升级 Flutter SDK & Dart（启用空安全）
 更新依赖库（按我之前的依赖对照表替换）
 执行 dart migrate，逐步修改空安全问题
 替换废弃 Widget（按钮、SnackBar、TextStyle 等）
 检查 Android/iOS 配置（Gradle/Podfile/Manifest）
 运行测试 & 修复依赖 API 差异
```

