---
title: Flutter开发之——Linux上搭建Flutter开发环境(4)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: e47a67e8
date: 2021-01-19 17:28:26
---
## 一 概述

```
本文介绍在Linux上快速搭建Flutter开发环境

- 配置镜像
- 获取Flutter SDK
- Android设置及项目创建
```

<!--more-->

## 二 配置镜像

### 2.1 配置镜像原因

```
由于在国内访问Flutter有时可能会受到限制，Flutter官方为中国开发者搭建了临时镜像
```

### 2.2 国内镜像配置

1、打开/etc/profile文件，将下面的内容添加到profile中

```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
![][1]

2、执行下面的执行，保存文件修改

```
source /ect/profile
```

## 三 获取Flutter SDK

### 3.1 [Flutter SDK 下载][21]

![][2]

### 3.2 解压flutter SDK文件

```
1、下载后的文件名为`flutter_linux_1.22.5-stable.tar.xz`

2、首先执行如下指令，将`tar.xz`文件解压为`tar`文件
xz -d flutter_linux_1.22.5-stable.tar.xz

3、再执行如下指令，将`tar`文件解压为文件夹
tar xvf flutter_linux_1.22.5-stable.tar
```

### 3.3 配置Flutter相关工具到path中

```
1、打开`/etc/profile`文件，在里面添加如下内容
export PATH=/home/pgzxc/software/flutter/bin:$PATH

2、使之生效
source /etc/profile
```

## 四 运行flutter doctor

### 4.1 请先检查是否已安装git

```
1、终端执行如下指令
git --version

2、如果未安装，请先执行如下指令
sudo apt-get install git
```

### 4.2 运行 flutter doctor

#### 4.2.1 执行`flutter doctor`前，会下载dart，请确认已安装`curl`

```
sudo apt-get install curl
```

#### 4.2.2 执行`flutter doctor`
![][3]

### 4.3 解决错误问题

#### 4.3.1 Android license status unknown

1、按照提示，执行指令

```
flutter doctor --android-licenses
```

2、出现提示时，输入`y`

```
Accept? (y/N): y
All SDK package licenses accepted
```

3、执行`flutter doctor`后，提示信息如下

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel master, 1.26.0-2.0.pre.402, on Linux, locale zh_CN.UTF-8)
[✓] Android toolchain - develop for Android devices (Android SDK version
    30.0.3)
[✗] Chrome - develop for the web (Cannot find Chrome executable at
    google-chrome)
    ! Cannot find Chrome. Try setting CHROME_EXECUTABLE to a Chrome
      executable.
[!] Android Studio (not installed)
[!] Connected device
    ! No devices available

! Doctor found issues in 3 categories.
```

#### 4.3.2 Cannot find Chrome

1、下载chrome

```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_i386.deb //32位版本
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb //64位版本
```

2、安装chrome

```
sudo dpkg -i google-chrome*
sudo apt-get -f install
```

3、执行`flutter doctor`后

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel master, 1.26.0-2.0.pre.402, on Linux, locale zh_CN.UTF-8)
[✓] Android toolchain - develop for Android devices (Android SDK version
    30.0.3)
[✓] Chrome - develop for the web
[!] Android Studio (not installed)
[✓] Connected device (1 available)

! Doctor found issues in 1 category.
```

#### 4.3.3 Android Studio (not installed)

1、配置flutter --android-sdk

```
# android
export ANDROID_HOME=/home/pgzxc/Android/Sdk
export PATH=$ANDROID_HOME:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
flutter config --android-sdk="/home/pgzxc/Android/Sdk"
flutter config --android-studio-dir="/home/pgzxc/software/android-studio"
```

2、配置后，运行`flutter doctor`，信息如下

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel master, 1.26.0-2.0.pre.402, on Linux, locale zh_CN.UTF-8)
[✓] Android toolchain - develop for Android devices (Android SDK version 30.0.3)
[✓] Chrome - develop for the web
[✓] Android Studio
[✓] Connected device (1 available)

• No issues found!
```

## 五 Android设置及项目创建

### 5.1 安装IDE flutter 插件

1、打开Android Studio，依次点击：File—>Settings—>Plugins—>搜索flutter
![][4]

2、Preferences—>Languages&Frameworks—>Dart&Flutter，配置Dart和Flutter路径

```
Dart：/home/pgzxc/software/flutter/bin/cache/dart-sdk
Flutter:/home/pgzxc/software/flutter
```


### 5.1 IDE(android studio)创建项目

1、依次点击：File—>New—>New Flutter Project—>Flutter Application，配置项目信息
![][5]

2、执行如下指令，开启Web支持

```
flutter config --enable-web
```

3、运行项目到chrome浏览器上
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-linux-proxy-config.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-linux-sdk-choice.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-linux-flutter-doctor-info.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-linux-android-studio-plugin-install.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-linux-as-create-project.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-linux-run-chrome-view.png

[21]:https://flutter.dev/docs/development/tools/sdk/releases?tab=linux#macos