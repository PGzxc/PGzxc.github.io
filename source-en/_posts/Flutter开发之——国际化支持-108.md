---
title: Flutter开发之——国际化支持(108)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 81f42c90
date: 2021-07-25 17:16:49
---
## 一 概述

* APP国际化简单示例
* APP国际化补充
* 应用程序 title 国际化

<!--more-->

## 二 APP国际化简单示例

### 2.1 添加依赖或导入包名

```
import 'package:flutter/foundation.dart';
```

### 2.2 **MaterialApp.supportedLocales** 中添加支持的语言

```
MaterialApp(
  title: 'Flutter IntlApp',
  supportedLocales: [
    const Locale('zh'),
    const Locale('en'),
  ],
  ...
)
```

说明：上面的代码中，只支持英文和中文

### 2.3 根据不同的语言获取不同的资源

```
class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }
  static Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'title': 'Hello World',
    },
    'zh': {
      'title': '你好',
    },
  };
  String? get title {
    return _localizedValues[locale.languageCode]?['title'];
  }
}
```

说明：这里只是演示了title的国际化

### 2.4 设置用于加载语言的Delegate

```
class AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const AppLocalizationsDelegate();
  @override
  bool isSupported(Locale locale) => ['en', 'zh'].contains(locale.languageCode);

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(AppLocalizations(locale));
  }

  @override
  bool shouldReload(AppLocalizationsDelegate old) => false;
}
```

### 2.5 将此 Delegate 添加到 MaterialApp

```
MaterialApp(
  title: 'Flutter IntlApp',
  localizationsDelegates: [
    AppLocalizationsDelegate(),
  ],
  supportedLocales: [
    const Locale('zh'),
    const Locale('en'),
  ],
  home: _HomePage(),
)
```

### 2.6 整体的代码

```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      localizationsDelegates: [
        AppLocalizationsDelegate(),
      ],
      supportedLocales: [
        const Locale('en'),
        const Locale('zh')
      ],
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'title': 'Hello World',
    },
    'zh': {
      'title': '你好',
    },
  };

  String? get title {
    return _localizedValues[locale.languageCode]?['title'];
  }
}

class AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const AppLocalizationsDelegate();


  @override
  bool isSupported(Locale locale) => ['en', 'zh'].contains(locale.languageCode);

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(AppLocalizations(locale));
  }

  @override
  bool shouldReload(AppLocalizationsDelegate old) => false;
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //appBar: AppBar(title: Text(widget.title),),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('国际化：${AppLocalizations.of(context)!.title}')
          ],
        ),
      ),
    );
  }
}
```

### 2.7 注意事项-Scaffold 不要添加 AppBar 数据，否则报错(切换到zh时)

异常信息

```
======== Exception caught by widgets library =======================================================
The following assertion was thrown building AppBar(dirty, dependencies: [_LocalizationsScope-[GlobalKey#c2dbf], _ModalScopeStatus, MediaQuery, _InheritedTheme], state: _AppBarState#8c982):
No MaterialLocalizations found.

AppBar widgets require MaterialLocalizations to be provided by a Localizations widget ancestor.
The material library uses Localizations to generate messages, labels, and abbreviations.

To introduce a MaterialLocalizations, either use a MaterialApp at the root of your application to include them automatically, or add a Localization widget with a MaterialLocalizations delegate.
```
![][1]
### 2.8 效果图

![][2]

## 三 APP国际化补充

### 3.1 说明

Scaffold添加 AppBar 数据，切换到中文环境时，会出现错误

```
======== Exception caught by widgets library =======================================================
The following assertion was thrown building AppBar(dirty, dependencies: [_LocalizationsScope-[GlobalKey#c2dbf], _ModalScopeStatus, MediaQuery, _InheritedTheme], state: _AppBarState#8c982):
No MaterialLocalizations found.
```

原因：**MaterialLocalizations** 找不到

### 3.2 pubspec.yaml文件中添加包依赖

```
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
```

### 3.3 MaterialApp 修改如下

```
import 'package:flutter_localizations/flutter_localizations.dart';
MaterialApp(
  title: 'Flutter IntlApp',
  localizationsDelegates: [
    AppLocalizationsDelegate(),
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: [
    const Locale('zh'),
    const Locale('en'),
  ],
  home: _HomePage(),
)
```

### 3.4 效果图
![][3]

## 四 应用程序 title 国际化

### 4.1 将MaterialApp中title替换

```
MaterialApp(
  title: '${AppLocalizations.of(context)!.title}',
  localizationsDelegates: [
    AppLocalizationsDelegate(),
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: [
    const Locale('zh'),
    const Locale('en'),
  ],
  home: _HomePage(),
)
```
现象：
![][4]

### 4.2 原因及解决办法

#### 原因

因为此时使用的 context 是从 build 方法中传入的，而 Localizations 从 context 开始向上查找，国际化资源是在 MaterialApp 组件中的，所以无法找到 AppLocalizations

#### 解决办法(修改方式是使用 onGenerateTitle)

```
MaterialApp(
  onGenerateTitle: (context) {
    return AppLocalizations.of(context).title;
  },
  localizationsDelegates: [
    AppLocalizationsDelegate(),
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: [
    const Locale('zh'),
    const Locale('en'),
  ],
  home: _HomePage(),
)
```

### 4.3 效果(Android真机效果)
![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-i18n-localizations-zh-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-i18n-localizations.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-i18n-localizations-globalmaterialocalization.gif
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-i18n-localizations-material-title-error.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-i18n-localizations-material-title-result.png

