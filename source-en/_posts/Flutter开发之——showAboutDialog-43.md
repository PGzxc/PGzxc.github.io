---
title: Flutter开发之——showAboutDialog(43)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: b57cf1b5
date: 2021-04-19 10:31:50
---
## 一 概述

本文介绍用于描述App信息描述相关的Dialog

* showAboutDialog：用于描述当前App信息，底部提供2个按钮：查看许可按钮和关闭按钮
* showLicensePage：用于描述当前App许可信息，LicensePage需要和showLicensePage配合使用

<!--more-->

## 二 showAboutDialog

### 2.1 构造方法

```
void showAboutDialog({
  required BuildContext context,
  String? applicationName,
  String? applicationVersion,
  Widget? applicationIcon,
  String? applicationLegalese,
  List<Widget>? children,
  bool useRootNavigator = true,
  RouteSettings? routeSettings,
})
```

### 2.2 常用属性

|        属性         |      说明      |     取值      |
| :-----------------: | :------------: | :-----------: |
|   applicationName   |  应用程序名称  |    String     |
| applicationVersion  |  应用程序版本  |    String     |
|   applicationIcon   | 应用程序的图标 |    Widget     |
| applicationLegalese |    著作版权    |    String     |
|      children       |      内容      | List\<Widget> |

### 2.3 示例

#### 代码

```
RaisedButton(
              child: Text("showAboutDialog"),
              onPressed: () {
                  showAboutDialog(
                    context: context,
                    applicationIcon: Image.asset(
                      'images/flutter.png',
                      height: 60,
                      width: 60,
                    ),
                    applicationName: '应用程序',
                    applicationVersion: '1.0.0',
                    applicationLegalese: 'copyright© 测试示例',
                    children: <Widget>[],
                  );
                })
```

#### 效果图
![][1]

### 2.4 国际化

#### 说明

* VIEW LICENSES 和COLSE是showAboutDialog自动添加的
* 没有添加国际化之前显示的是默认的语言，要显示成中文时，需要添加国际化支持

#### 国际化操作

1. 在`pubspec.yaml`中配置支持国际化

```
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
```

2. 在MaterialApp中配置当前区域：

```
MaterialApp(
      title: 'Flutter Demo',
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: [
        const Locale('zh', 'CH'),
        const Locale('en', 'US'),
      ],
      locale: Locale('zh'),
      ...
  )

```

#### 国际化后效果

![][2]



## 三 showLicensePage

### 3.1  构造方法

```
void showLicensePage({
  required BuildContext context,
  String? applicationName,
  String? applicationVersion,
  Widget? applicationIcon,
  String? applicationLegalese,
  bool useRootNavigator = false,
})
```

### 3.2 常用属性
|        属性         |      说明      |     取值      |
| :-----------------: | :------------: | :-----------: |
|   applicationName   |  应用程序名称  |    String     |
| applicationVersion  |  应用程序版本  |    String     |
|   applicationIcon   | 应用程序的图标 |    Widget     |
| applicationLegalese |    著作版权    |    String     |
|      children       |      内容      | List\<Widget> |

### 3.3 示例

#### 代码

```
RaisedButton(
             child: Text("showLicensePage"),
             onPressed: () {
                  showLicensePage(
                    context: context,
                    applicationIcon: Image.asset('images/flutter.png', height: 60, width: 60,),
                    applicationName: '应用程序',
                    applicationVersion: '1.0.0',
                    applicationLegalese: 'copyright© 测试示例',
                  );
                })
```

#### 效果图
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showAboutDialog-sample.gif
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showAboutDialog-local-sample.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-showLicensePage-sample.gif