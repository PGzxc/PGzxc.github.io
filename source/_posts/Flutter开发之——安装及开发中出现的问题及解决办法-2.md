---
title: Flutter开发之——安装及开发中出现的问题及解决办法(2)
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

### 3.9 RenderCustomMultiChildLayoutBox object was given an infinite size during layout

#### 现象

```
RenderCustomMultiChildLayoutBox object was given an infinite size during layout.

...  parentData: not positioned; offset=Offset(0.0, 0.0) (can use size)
...  constraints: BoxConstraints(0.0<=w<=392.7, 0.0<=h<=827.6)
...  size: MISSING
...  direction: vertical
...  mainAxisAlignment: start
...  mainAxisSize: max
...  crossAxisAlignment: center
...  verticalDirection: down
The constraints that applied to the RenderCustomMultiChildLayoutBox were: BoxConstraints(0.0<=w<=392.7, 0.0<=h<=Infinity)
The exact size it was given was: Size(392.7, Infinity)

See https://flutter.dev/docs/development/ui/layout/box-constraints for more information.

The relevant error-causing widget was: 
  Scaffold Scaffold:file:///D:/Code/FlutterCode/flutter_zhihu_getX/lib/provider/refresh/refresh_paging_state_page.dart:80:12
When the exception was thrown, this was the stack: 
#0      RenderBox.debugAssertDoesMeetConstraints.<anonymous closure> (package:flutter/src/rendering/box.dart:2298:9)
#1      RenderBox.debugAssertDoesMeetConstraints (package:flutter/src/rendering/box.dart:2394:6)
#2      RenderBox.size=.<anonymous closure> (package:flutter/src/rendering/box.dart:2074:7)
#3      RenderBox.size= (package:flutter/src/rendering/box.dart:2076:6)
#4      RenderCustomMultiChildLayoutBox.performLayout (package:flutter/src/rendering/custom_layout.dart:409:5)
#5      RenderObject.layout (package:flutter/src/rendering/object.dart:2189:7)
#6      RenderBox.layout (package:flutter/src/rendering/box.dart:2430:11)
#7      RenderProxyBoxMixin.performLayout (package:flutter/src/rendering/proxy_box.dart:120:14)
```

#### 解决办法

根据定位，找到`RenderCustomMultiChildLayoutBox`报错位置，把试图Widget包在一个Expanded布局里，然后设置flex:1,将Column展开，就解决了这个问题

### 3.10 'child.hasSize': is not true

#### 现象

```
RenderBox was not laid out: RenderViewport#2c443 NEEDS-LAYOUT NEEDS-PAINT NEEDS-COMPOSITING-BITS-UPDATE
'package:flutter/src/rendering/box.dart':
Failed assertion: line 2009 pos 12: 'hasSize'
```

#### 解决办法

给GridView或ListView设置`shrinkWrap`属性为`true`

### 3.11 SingleChildScrollView嵌套ListView无法滚动

#### 现象

SingleChildScrollView中有一个ListView，导致SingleChildScrollView无法滚动

#### 原因

因为listview和SingleChildScrollView都有scroll

#### 解决办法

需停止listview的滚动，在listview中加入

```
physics: NeverScrollableScrollPhysics()
```

### 3.12 don't support null safety

#### 现象

```
Error: Cannot run with sound null safety, because the following dependencies
don't support null safety:

 - package:flutter_tindercard

For solutions, see https://dart.dev/go/unsound-null-safety
Target kernel_snapshot failed: Exception
```

#### 原因

这是因为在flutter**2**中使用了null safety(空安全)技术，即定义的所有变量在使用中都不能为空null,如果出现null,就会报错.这种安全机制大大减少了null error。

#### 解决办法

但是在一些框架中并没有使用空安全技术，所以在我们引入第三方框架运行后就会出现以上错误，这个时候的解决方法如下

方法一：cmd终端执行如下指令：

```
flutter run --no-sound-null-safety
flutter build apk --no-sound-null-safety
```

方法2：Run/Debug Configurations的Additional run args：中添加如下参数

```
--no-sound-null-safety
```

### 3.13 flutter.sdk not set in local.properties

#### 现象

```
flutter.sdk not set in local.properties. Expression: (flutterSdkPath != null). Values: flutterSdkPath = null
```

#### 原因

flutter项目/android/local.properties下面未设置flutter.sdk

#### 解决办法(给local.properties设置flutter.sdk)

```
sdk.dir=D\:\\SoftWare\\DevTools\\Android\\SDK
flutter.sdk=D:\\SoftWare\\DevTools\\flutter\\flutter-3.7.3
flutter.versionName=1.0.0
flutter.versionCode=1
```

### 3.14 We recommend using a newer Android Gradle plugin to...

#### 现象

```
We recommend using a newer Android Gradle plugin to use compileSdk = 33

This Android Gradle plugin (7.2.0) was tested up to compileSdk = 32

This warning can be suppressed by adding
    android.suppressUnsupportedCompileSdk=33
to this project's gradle.properties

The build will continue, but you are strongly encouraged to update your project to
use a newer Android Gradle Plugin that has been tested with compileSdk = 33
```

#### 解释

```
这句警告的意思是
建议使用一个新的Android Gradle插件去使用compileSdk = 33
这个 Android Gradle 插件 (7.1.2)已经通过了compileSdk = 32的测试
可以通过添加
android.suppressUnsupportedCompileSdk=33这条代码
来抑制此警告
```

#### 解决办法

将compileSdk设置为32

```
compileSdk = 32
```

### 3.15 ..\package_config.json does not exist.

#### 现象

```
D:\Code\FlutterCode\wechat_flutter-master\.dart_tool\package_config.json does not exist.
Did you run this command from the same directory as your pubspec.yaml file?
Target gen_dart_plugin_registrant failed: Exception: 
```

#### 原因

进入D:..\android.dart_tool目录发现没有package_config.json 这个文件

#### 解决办法

在项目的android目录下执行如下命令

```
flutter clean
flutter pub get
```



## 四 参考
* [入门: 在Windows上搭建Flutter开发环境](https://flutterchina.club/setup-windows/)
* [flutter-Issues-windows-version](https://github.com/flutter/flutter/issues/119927)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-bits-transfer.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-running-pub-update.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-running-pub-update.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-proxy-config-after.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-doctor-bundle-java-error.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-doctor-windows-version-error.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-doctor-unable-to-confirm-resolve.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-running-error-sdk-lower.png
