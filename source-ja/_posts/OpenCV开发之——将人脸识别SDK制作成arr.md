---
title: OpenCV开发之——将人脸识别SDK制作成arr
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: 1846d0b2
date: 2021-08-18 12:07:31
---
## 一 概述

本文介绍OpenCV开发中SDK制作相关问题：

* 如何将sdk打包为arr依赖
* sdk中含有jni如何处理

<!--more-->

## 二 OpenCV人脸识别的依赖关系

### 2.1 示例项目的关系图

![][1]

### 2.2 说明

* face-detection示例依赖于opencv-sdk
* so文件的生成路径有2个，一个是app目录下的jni文件夹，另一个是opencv_sdk下的native/jni
* 若直接对opencv_sdk执行打包输出arr时，jni下的so文件也会被打包进arr内部

## 三 将sdk打包为arr依赖

### 3.1 opencv-sdk下的build/gradle

```
android {
    compileSdkVersion 26
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 26
        versionCode openCVersionCode
        versionName openCVersionName
        externalNativeBuild {
            cmake {
                arguments "-DANDROID_STL=c++_shared"
                targets "opencv_jni_shared"
            }
        }
    }
    //....此处省略部分代码
    sourceSets {
        main {
            jniLibs.srcDirs = ['native/libs']
            java.srcDirs = ['java/src']
            aidl.srcDirs = ['java/src']
            res.srcDirs = ['java/res']
            manifest.srcFile 'java/AndroidManifest.xml'
        }
    }
    externalNativeBuild {
        cmake {
            path(project.projectDir.toString() + '/libcxx_helper/CMakeLists.txt')
        }
    }
}
```

### 3.2 将sdk打包为arr

将module opencv_sdk打包输出为arr，可以通过如下两种方式：

#### 工具栏制作arr

选中opencv_sdk，依次点击：Build—>Make Module 'xxx'
![][2]
指令执行完毕后，在opencv_sdk的build/outputs/arr目录下查看arr依赖
![][3]

#### Gradle制作arr
打开android studio右侧的Grande窗口，找到opencv_sdk下面的Tasks/build/assembleRelease指令
![][4]

右键运行后，在opencv_sdk的build/outputs/arr目录下查看arr依赖
![][3]

### 3.3 Analyze arr

依次点击：Build——>Analyze APK，选择opencv_sdk下的arr

![][5]
分析完成后，显示arr包含的内容(so文件被打包进了arr，导致arr过大)
![][6]

## 四  sdk中含有jni处理

### 4.1 如何处理

* opencv_sdk中含有jni，导出为arr时，jni会生成so文件包含在arr内部，导致arr体积过大
* 我们可以选择指定ABI版本的so文件集成到app下的jni目录下
* 将arr中不在包含so文件，只导出java、res、AndroidManifest等文件

### 4.2 除去arr中so文件

将opencv_sdk/build.gradle中关于cmake相关操作去除

```
 //第一处
 externalNativeBuild {
       cmake {
               arguments "-DANDROID_STL=c++_shared"
               targets "opencv_jni_shared"
          }
  }
//第二处  
 sourceSets {
      main {
            //jniLibs.srcDirs = ['native/libs']
            java.srcDirs = ['java/src']
            aidl.srcDirs = ['java/src']
            res.srcDirs = ['java/res']
            manifest.srcFile 'java/AndroidManifest.xml'
        }
  }  
//第三处
externalNativeBuild {
        cmake {
            path(project.projectDir.toString() + '/libcxx_helper/CMakeLists.txt')
        }
    }
```

重新执行assembleRelease，并查看Analyze APK
![][7]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-arr-project-struct.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-arr-build-make.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-arr-build-outputs-arr.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/andriod-opencv-arr-gradle-assemble.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-arr-analyze-apk.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-arr-analyze-arr-result-abi.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-arr-cmakeclean-build.png
