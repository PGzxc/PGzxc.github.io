---
title: Flutter开发之——安装中出现的问题及解决办法
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: '25598276'
date: 2021-01-11 10:34:23
---
## 一 概述

在安装Flutter以及项目开发的过程中可能遇到各种各样的问题，本文加以记录并保持更新

<!--more-->

## 二 安装及配置过程中

### 2.1 flutter doctor——网络问题

由于国内访问Fluter有时可能会受到限制，在安装Fluter时，可能会出现如下问题：

* BITS Transfer 这是一个后台智能传输服务(BITS)的文件传输
* CHecking Dart SDK version...
* Ruilding pub upgrade..

#### 现象

| BITS Transfer | Dart SDK&Runing pub upgrade |
| :-----------: | --------------------------- |
|    ![][1]     | ![][2]                      |

####  原因

在国内访问Flutter有时可能会受到限制

#### 解决办法(windows下)

配置

Flutter官方为中国开发者搭建了临时镜像，大家可以将如下环境变量加入到用户环境变量中

```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
![][3]

配置后安装效果图
![][4]

### 2.2 flutter doctor——jre

#### 现象
![][5]
#### 原因

Android Studio的安装目录中"没有jre文件夹或jre下文件不完整"

#### 解决办法

将**JDK文件**丢到**Android Studio安装目录**的"jre"文件夹中即可

### 2.3 flutter doctor——Windows Version

#### 现象
![][6]

#### 解决办法

执行如下指令

```
flutter channel master
flutter upgrade
```

官方给出解释
![][7]


## 三 项目开发中

### 3.1 Pub failed to delete entry ...

#### 现象

```
Pub failed to delete entry because it was in use by another process.
This may be caused by a virus scanner or having a file
in the directory open in another application.
pub finished with exit code 1
```

#### 解决办法

管理员模式下启动IDE或CMD，然后执行`Pub get`等

### 3.2 Could not get unknown property 'ndkVersion'

#### 现象

```
Could not get unknown property 'ndkVersion' for object of type com.android.build.gradle.internal.dsl.BaseAppModuleExtension
```

#### 解决办法

在flutter-3.7.3\packages\flutter_tools\gradle\flutter.gradle配置如下

```
int pluginCompileSdkVersion = pluginProject.android.compileSdkVersion.substring(8) as int
maxPluginCompileSdkVersion = Math.max(pluginCompileSdkVersion,maxPluginCompileSdkVersion)
 //String pluginNdkVersion = pluginProject.android.ndkVersion ?: ndkVersionIfUnspecified
String pluginNdkVersion =  ndkVersionIfUnspecified
```

说明：`pluginProject.android.ndkVersion ?: ndkVersionIfUnspecified`替换为`ndkVersionIfUnspecified`

### 3.3 AndroidManifest.xml could not be found.

#### 现象

```
AndroidManifest.xml could not be found.
Please check D:\Code\FlutterCode\FlutterScreens-master\android\AndroidManifest.xml for errors.
No application found for TargetPlatform.android_x64.
Is your project missing an android\AndroidManifest.xml?
Consider running "flutter create ." to create one.
```

#### 解决办法(打开终端执行如下指令)

```
flutter create .
```

### 3.4 "FlutterScreens-master" is not a valid Dart package name

#### 现象

```
"FlutterScreens-master" is not a valid Dart package name.

See https://dart.dev/tools/pub/pubspec#name for more information.
```

#### 解决办法

dart package name 必须全部小写命名，由数字、小写字母、下划线组成，对应的正则表达式为 [a-z0-9_]

### 3.5 pubspec.yaml has no lower-bound SDK constraint

#### 现象

```
pubspec.yaml has no lower-bound SDK constraint.
You should edit pubspec.yaml to contain an SDK constraint:

environment:
  sdk: '^2.12.0'
```

#### 解决办法

1-pubspec.yaml中设置sdk版本

```
environment:
  sdk: '>=2.16.2 <3.0.0'
```

2-File—>Setting—>Languages& Frameworks—>Flutter重新指定Flutter SDK path
![][8]

### 3.6 Android Gradle plugin requires Java 11 to run

#### 现象

```
Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.
You can try some of the following options:
  - changing the IDE settings.
  - changing the JAVA_HOME environment variable.
  - changing `org.gradle.java.home` in `gradle.properties`.
Gradle settings
```

#### 解决办法

点击`Gradle settings`重新选择java版本

### 3.7 java.lang.NoClassDefFoundError: java/util/logging/Level

#### 现象

```
java.lang.NoClassDefFoundError: java/util/logging/Level
	at org.gradle.internal.logging.source.JavaUtilLoggingSystem.<clinit>(JavaUtilLoggingSystem.java:42)
	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:104)
	at java.base/java.lang.reflect.Method.invoke(Method.java:578)
	at org.gradle.wrapper.BootstrapMainStarter.start(BootstrapMainStarter.java:30)
	at org.gradle.wrapper.WrapperExecutor.execute(WrapperExecutor.java:129)
	at org.gradle.wrapper.GradleWrapperMain.main(GradleWrapperMain.java:61)
Caused by: java.lang.ClassNotFoundException: java.util.logging.Level
	at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:445)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:588)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:521)
	... 30 more

```

#### 解决办法

jdk不完整，替换Android Studio下的jre

### 3.8 You need Java 11 or higher to build your app with this version of Gradle

#### 现象

```
┌─ Flutter Fix ─────────────────────────────────────────────────────────────────┐
│ [!] You need Java 11 or higher to build your app with this version of Gradle. │
│                                                                               │
│ To get Java 11, update to the latest version of Android Studio on             │
│ https://developer.android.com/studio/install.                                 │
│                                                                               │
│ To check the Java version used by Flutter, run `flutter doctor -v`.           │
└───────────────────────────────────────────────────────────────────────────────┘
```

#### 解决办法

Android Studio下的jre为高版本jre(大于等于11)

## 四 参考
* [入门: 在Windows上搭建Flutter开发环境](https://flutterchina.club/setup-windows/)
* [flutter-Issues-windows-version](https://github.com/flutter/flutter/issues/119927)


[1]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-bits-transfer.png
[2]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-running-pub-update.png
[3]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-running-pub-update.png
[4]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-proxy-config-after.png
[5]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-doctor-bundle-java-error.png
[6]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-doctor-windows-version-error.png
[7]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-doctor-unable-to-confirm-resolve.png
[8]:https://cdn.staticaly.com/gh/PGzxc/CDN/master/blog-flutter/flutter-running-error-sdk-lower.png
