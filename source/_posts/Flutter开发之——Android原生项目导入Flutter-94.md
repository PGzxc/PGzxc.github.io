---
title: Flutter开发之——Android原生项目导入Flutter(94)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 2d0175be
date: 2021-07-17 23:32:07
---
## 一 概述

* Android Studio 向已有项目中添加Flutter模块
* 注意事项
* 原生代码启动Flutter模块

<!--more-->

## 二 运行环境和插件

### 2.1 运行环境

* Android studio：4.2.2
* Java：1.8.0_241
* Flutter：2.2.3
* Dart：2.13.4

### 2.2 插件(安装Flutter时，Dart自动安装)

![][1]

## 三 Android Studio 向已有项目中添加Flutter模块

### 3.1 创建原生项目

* 打开IDE开发工具，选择创建一个项目

  ![][2]

* 选择`Empty Activity`，并设置项目名称和包名，确定后创建

  ![][3]

### 2.2 添加Flutter模块

* 在刚创建的项目上，依次点击：File——>New——>New Module
  ![][4]
* 在打开的页面中，选择左侧的Flutter Module选项卡，并依次设置项目名称，选择Flutter SDK，及Flutter的位置
  ![][5]
* 设置Flutter的包名
  ![][6]
* Flutter添加完成后的项目结构
  ![][7]

## 四 注意事项

### 4.1 ABI设置

* Flutter AOT编辑模式目前只支持armeabi-v7a和arm64-v8a
* 在Android项目的app/build.gradle配置ABI限制，否则运行时找不到libflutter.so而奔溃

```
android {
  //...
  defaultConfig {
    ndk {
      // Filter for architectures supported by Flutter.
      abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86_64'
    }
  }
}
```

### 4.2 java8要求

* Flutter Android引擎使用Java 8功能
* 在应用程序的`build.gradle`文件中，在`android { }`块下声明以下源兼容性

```
android {
  //...
  compileOptions {
    sourceCompatibility 1.8
    targetCompatibility 1.8
  }
}
```

## 五 原生代码启动Flutter模块

### 5.1 向AndroidManifest.xml添加FlutterActivity

```
<activity
  android:name="io.flutter.embedding.android.FlutterActivity"
  android:theme="@style/LaunchTheme"
android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  />
```

说明：

* name：必须包含此属性，是固定格式，不能修改
* 其他属性：可以没有

### 5.2 界面中添加点击跳转Flutter按钮

```
 <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="jumpFlutter"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        android:text="跳转Flutter" />
```

### 5.3 Button点击事件，点击后跳转FlutterActivity

```
 fun jumpFlutter(view: View) {
      startActivity(FlutterActivity.createDefaultIntent(this))
 }
```

说明：

* FlutterActivity的全路径是import io.flutter.embedding.android.FlutterActivity
* FlutterActivity将加载flutter_module中lib/main.dart的main方法

### 5.4 选择app运行后，效果图

有两个选项：app和main.dart，运行app后点击跳转Flutter按钮
![][8]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-studio-plugin-flutter-install.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-studio-create-project.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-create-project-setting.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-new-model.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-new-module-setting.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-module-package.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-import-flutter-struct.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-add-flutter-result.gif

