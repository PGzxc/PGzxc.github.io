---
title: Flutter开发之——国际化之Intl插件(109)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e228f30f
date: 2021-07-25 17:20:45
---
## 一 概述

Intl是官方出品的，包含用于处理国际化/本地化消息，日期和数字格式和解析，双向文本以及其他国际话问题。

* pub地址：https://pub.dev/packages/intl
* Github地址：https://github.com/dart-lang/intl

<!--more-->

## 二 插件安装(Intellij)

* Flutter Intl插件安装：依次点击：Intellij IDEA—>Preference—>Plugins—>Marketplace，搜索Flutter Intl

  ![][1]
* 安装重启即可

## 三 添加依赖

### 3.1 flutter_localizations

在项目的 `pubspec.yaml` 文件中添加依赖

```
dev_dependencies:
	...
  flutter_localizations:
    sdk: flutter
```

执行命令

```
flutter pub get
```

### 3.2 Flutter Intl 初始化项目

Tool->Flutter Intl ->Initalize for the project
![][2]
成功后，自动在 pubspec.yaml末尾增加

```
flutter_intl:
  enabled: true
```

### 3.3 在lib下生成generated 和 l10n

执行Flutter Intl->Initialize for the Project后，lib目录下生成generated和i10n文件夹

![][3]
文件说明：

* generated包下的intl目录默认生成 **messages_all.dart** 和 **messages_en.dart** 文件，messages开头的文件无需手动修改，是自动生成的
* generated包下的 **I10n.dart** 是Localizations和Delegate的实现，无需手动修改，是自动生成的
* l10n包下存在一个intl_en.arb文件，这是系统默认生成的英文国际话内容

## 四 添加语言(中文-zh)

Tool->Flutter Intl -> Add Locale，添加语言
![][4]

添加中文支持
![][5]
自动生成相关文件
![][6]
## 五 添加系统国际化支持

### 5.1 pubspec.yaml文件中添加包依赖

```
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
```

### 5.2 MaterialApp 修改

```
MaterialApp(
  ...
  localizationsDelegates: [
    S.delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: S.delegate.supportedLocales,
  ...
)
```

### 5.3 在 intl_en.arb 和 intl_zh.arb下添加文案

添加一个 **title** 文案，intl_en.arb

```
{
  "title": "hello word"
}
```

intl_zh.arb：

```
{
  "title": "你好"
}
```

按 **command + s** 保存，generated 目录下相关文件将会重新生成

### 5.4 main.dart

```
return Scaffold(
      appBar: AppBar(title: Text(widget.title),),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('${S.of(context).title}',)
          ],
        ),
      ) // This trailing comma makes auto-formatting nicer for build methods.
    );
```

### 5.5 效果图
![][7]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-intellij-plugin-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-tools-init-project.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-libs-i10n.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-tools-add-local.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-tools-add-local-zh.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-local-zh-files-auto.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-intl-result.gif

