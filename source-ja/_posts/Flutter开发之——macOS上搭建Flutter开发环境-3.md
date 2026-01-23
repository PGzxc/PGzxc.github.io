---
title: Flutter开发之——macOS上搭建Flutter开发环境(3)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 178be1e5
date: 2021-01-14 16:31:26
---
## 一 概述

* macOS上镜像配置
* 获取Flutter SDK
* 平台设置

<!--more-->

## 二 macOS上镜像配置

### 2.1 为何配置镜像

由于在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像

### 2.2 如何配置镜像

打开`/Users/zxc`下的.bash_profile文件(如果没有请先创建)

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

![][1]

## 三 获取Flutter SDK

### 3.1 下载Flutter SDK

* [Stable channel (macOS)][31]下载Flutter SDK

  ![][2]
  
* 将下载后的Flutter SDK移动到某个位置(如:资源库/flutter)

  ![][3]
  
* 添加flutter到path中(.bash_profile)

  ```
  Flutter=/Users/zxc/Library/flutter
  export PATH=$Flutter/bin:$PATH
  ```
* 在terminal(终端)中输入 source .bash_profile (使用刚才更新之后的内容)

### 3.2 运行flutter doctor

* 打开终端，输入下面的指令，检查是否需要安装其他依赖

  ```
  flutter doctor
  ```
![][4]

### 3.3 运行错误解决

#### 3.3.1 Some Android licenses not accepted

在终端输入

```
flutter doctor --android-licenses
```

#### 3.3.2 **CocoaPods not installed**

在终端输入

```
sudo gem install cocoapods
```

安装异常显示

```
ERROR:  Could not find a valid gem 'cocoapods' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - too many connection resets (https://rubygems.org/specs.4.8.gz)
```

删除旧的连接

```
gem sources --remove https://rubygems.org/
```

添加新的连接

```
gem sources -a https://gems.ruby-china.com
```

检查设置

```
gem sources -l
```

再次执行指令
![][5]
再次执行`flutter doctor`指令
![][6]

#### 3.3.3 Flutter&Dart plugin not installed

打开android studio开发之工具，依次打开：android studio—>Preferences—>Plugins，输入`Flutter`安装
![][7]

点击：Preferences—>Languages&Frameworks—>Dart&Flutter，配置Dart和Flutter路径
![][8]

再次执行`flutter doctor`检测
![][9]
#### 3.3.4 VS Code Flutter extension not installed

打开VS Code，搜索`flutter`插件安装
![][10]
安装flutter插件后，再次执行`flutter doctor`
![][11]

### 3.4 更新环境变量

打开(或创建) `$HOME/.bash_profile`

```
# java
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_241.jdk/Contents/Home
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH

# android
ANDROID_HOME=/Users/zxc/Library/Android/sdk 
export PATH=$ANDROID_HOME:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH

#gradle
GRADLE_HOME=/Users/zxc/.gradle/wrapper/dists/gradle-5.4.1-all/3221gyojl5jsh0helicew7rwx/gradle-5.4.1
export PATH=${PATH}:${GRADLE_HOME}/bin

#Flutter
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
Flutter=/Users/zxc/Library/flutter
export PATH=$Flutter/bin:$PATH
```

## 四 创建项目

### 4.1 利用VS Code创建Flutter项目

查看—>命令面板—>输入`flutter`，选择`New Project`，输入项目名称并创建项目
![][12]

### 4.2 将项目运行到模拟器上

#### 4.2.1 将项目运行到iOS模拟器上

打开一个iOS模拟器

```
open -a Simulator
```

依次点击：运行—>Start Debugging
![][13]
#### 4.2.2 将项目运行到android模拟器上

打开一个android模拟器
依次点击：运行—>Start Debugging

或者终端执行`flutter run`
![][14]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-pub-host-base-url.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-flutter-sdk.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-flutter-sdk-folder.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-doctor-inspect.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-cocoapods-install-success.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-cocoapods-flutter-doctor.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-as-plugin-flutter-install.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-flutter-dart-config.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-flutter-plugin-doctor.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-vs-code-flutter-install.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-vs-code-flutter-doctor.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-mac-vs-code-create-project.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-project-run-ios.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-project-run-android.png

[31]:https://flutter.dev/docs/development/tools/sdk/releases?tab=macos#macos

