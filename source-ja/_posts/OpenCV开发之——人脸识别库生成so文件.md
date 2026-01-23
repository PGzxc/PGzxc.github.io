---
title: OpenCV开发之——人脸识别库生成so文件
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: d4b543e9
date: 2021-08-17 16:49:23
---
## 一 概述

* 本文介绍通过ndk-build和cmake分别编译过程
* 人脸识别库由face-detection下的jni生成的so文件和sdk生成的so合并后成为app的so文件

<!--more-->

## 二 ndk-build和cmake编译

### 2.1 ndk-build编译

#### 运行环境(ndk添加到环境变量中)

```
path=D:\SoftWare\Android\SDK\ndk\android-ndk-r15c
```

执行`ndk-build`执行，显示如下消息说明ndk配置成功

```
C:\Users\Admin>ndk-build
Android NDK: Could not find application project directory !
Android NDK: Please define the NDK_PROJECT_PATH variable to point to it.
D:\SoftWare\Android\SDK\ndk\android-ndk-r15c\build\\..\build\core\build-local.mk:151: *** Android NDK: Aborting    .  Stop.
```

#### ndk-build构建依赖文件

**Application.mk**：指定 ndk-build 的项目级设置。如ABI，Platform

```
APP_STL := gnustl_static
APP_CPPFLAGS := -frtti -fexceptions
APP_ABI := armeabi-v7a
APP_PLATFORM := android-8
```

**Android.mk**：文件位于项目 `jni/` 目录的子目录中，用于向构建系统描述源文件和共享库

```
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

#OPENCV_INSTALL_MODULES:=off
#OPENCV_LIB_TYPE:=SHARED
ifdef OPENCV_ANDROID_SDK
  ifneq ("","$(wildcard $(OPENCV_ANDROID_SDK)/OpenCV.mk)")
    include ${OPENCV_ANDROID_SDK}/OpenCV.mk
  else
    include ${OPENCV_ANDROID_SDK}/sdk/native/jni/OpenCV.mk
  endif
else
  include ../../sdk/native/jni/OpenCV.mk
endif

LOCAL_SRC_FILES  := DetectionBasedTracker_jni.cpp
LOCAL_C_INCLUDES += $(LOCAL_PATH)
LOCAL_LDLIBS     += -llog -ldl
LOCAL_MODULE     := detection_based_tracker
include $(BUILD_SHARED_LIBRARY)
```

#### ndk-build编译face-detection/jni文件

* 在项目/jni上右键—>Open In—>Terminal
  ![][1]
  
* 在打开后的终端，执行`ndk-build`指令

  ```
  Android NDK: android-8 is unsupported. Using minimum supported version android-14.
  Android NDK: WARNING: APP_PLATFORM android-14 is higher than android:minSdkVersion 1 in D:/Code/Android/OpenCV-android-sdk-453/samples/face-detection/AndroidManifest.xml. NDK binaries will *not* be comptible with
   devices older than android-14. See https://android.googlesource.com/platform/ndk/+/master/docs/user/common_problems.md for more information.
  D:/Code/Android/OpenCV-android-sdk-453/samples/face-detection/jni/Android.mk:14: ../../sdk/native/jni/OpenCV.mk: No such file or directory
  make: *** No rule to make target `../../sdk/native/jni/OpenCV.mk'.  Stop.
  ```

* 根据提示信息做如下修改

  Android.mk

  ```
  include ../../sdk/native/jni/OpenCV.mk 修改为 include ../../../sdk/native/jni/OpenCV.mk
  #LOCAL_SRC_FILES  := DetectionBasedTracker_jni.cpp(注释掉)
  ```
  ![][2]
  Application.mk
  
  ```
  APP_ABI := armeabi-v7a 修改为 APP_ABI := armeabi-v7a arm64-v8a
  ```

* 重新执行`ndk-build`执行，libs和obj文件夹下生成对应的so文件

  ![][3]

### 2.2 cmake编译

#### Cmake运行环境

官网下载地址：https://cmake.org/download/

环境变量配置

```
path=D:\SoftWare\cmake-3.18.2-win64-x64
path=C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Tools\MSVC\14.29.30133\bin\Hostx64\x64
```

#### Cmake构建文件

**CMakeLists.txt**：编译配置工具

#### 终端执行camek指令

* jni文件夹下新建build文件夹(用于cmake指令的生成目录)
* 右键build，依次选择：Open In——>Terminal，在终端中打开build
  ![][4]
* 在终端中执行如下cmake指令

  ```
  cmake .. -DOpenCV_DIR=..\..\..\sdk\native\jni\abi-arm64-v8a -DANDROID_TOOLCHAIN=clang -DANDROID_STL=c++_shared
  ```

  指令说明：

  * `..`表示执行上一层目录下的CMakeLists.txt文件
  * OpenCV_DIR，ANDROID_TOOLCHAIN，ANDROID_STL表示build.gradle中执行cmake时传递进来的参数，用等号链接

* 执行后的效果图
  ![][5]

#### cmake-gui.exe执行编译

* 找到cmake安装目录，打开cmake-gui
  ![][6]
* 分别选择source code和 build生成文件夹
  ![][7]
* 点击Configure按钮，在弹出的对话框中设置对应选项
  ![][8]
  
* 按照配置检查有无错误

  | 编译错误 | 错误原因 |
  | :------: | -------- |
  |  ![][9]  | ![][10]  |
  
* 修改OpenCV_DIR后重新执行Configure按钮，检查是否有错误
  ![][11]
* 点击Generate，查看build目录下生成内容
  ![][12]
## 三 android studio生成so文件

* 打开android studio，执行Build—>Rebuild Project按钮或者执行Gradle—>Tasks—>Build指令
  ![][13]
* 执行完毕后，在build/intermediates/cmake/debug/obj下生成对应的so文件
  ![][14]
* 同理，依赖sdk的build/intermediates/cmake/debug/obj下生成对应的so文件
  ![][15]
* app下的abi和sdk下的abi合并后就是app的abi

## 四 参考

* [在命令行中使用 cl.exe 编译器](https://zhuanlan.zhihu.com/p/98384105)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-face-jni-terminal.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-face-androidmk-modify.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-face-ndk-so.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-face-cmake-open-terminal.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-face-cmake-terminal-run.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui-source-build.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui-configure.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui-configure-error.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui-opencvdir-lack.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui-correct-configure.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-cmake-gui-x64-build.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-task-build.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-as-cmake-abi.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-sdk-build-abi.png