---
title: OpenCV开发之——将SDK替换为arr和so文件
categories:
  - 开发
  - H-音、视频开发
  - OpenCV
tags:
  - OpenCV
abbrlink: ad973e92
date: 2021-08-23 17:09:57
---
## 一 概述

* 将生成的arr和so导入项目
* 将opencv_sdk替换为arr和so文件

<!--more-->

## 二 将SDK引用方式去除

### 2.1 去除依赖

```
//implementation project(':opencv')
```

### 2.2 去除项目native编译

**default->externalNativeBuild**

```
    defaultConfig {
        applicationId "org.opencv.samples.facedetect"
        minSdkVersion 21
        targetSdkVersion 28
        versionCode 301
        versionName "3.01"
//        externalNativeBuild {
//            cmake {
//                arguments "-DOpenCV_DIR=" + project(':opencv').projectDir + "/native/jni", "-DANDROID_TOOLCHAIN=clang", "-DANDROID_STL=c++_shared"
//                targets "detection_based_tracker"
//            }
//        }
    }
```

**externalNativeBuild**

```
//    externalNativeBuild {
//        cmake {
//             path 'jni/CMakeLists.txt'
//        }
//    }
```

## 三 将生成的arr导入项目

### 3.1 将opencv.aarcopy到libs目录下

### 3.2 在build.gradle中添加下面的代码

```
repositories {
    flatDir {
        dirs 'libs'
    }
}
```

### 3.3 在app/build.gradle中添加arr依赖

```
implementation(name:'opencv', ext:'aar')
```

### 3.4 同步项目后查看FdActivity中引用是否正确导入

## 四  将生成so导入项目

### 4.1 新建jniLibs文件夹

项目上右键，依次选择：File——>New——>Folder——>JNI Folder

![][1]

在弹出的创建jni文件夹中输入`jniLibs`

![][2]

将jni修改为jniLibs

* 修改前：

  ```
  sourceSets {
          main {
              java.srcDirs = ['src']
              aidl.srcDirs = ['src']
              res.srcDirs = ['res']
              manifest.srcFile 'AndroidManifest.xml'
              jni {
                  srcDirs 'jni', 'src\\main\\jniLibs'
              }
          }
      }
  ```

* 修改后(jniLibs.srcDir或者  jniLibs {})

  ```
      sourceSets {
          main {
              java.srcDirs = ['src']
              aidl.srcDirs = ['src']
              res.srcDirs = ['res']
              manifest.srcFile 'AndroidManifest.xml'
              //jniLibs.srcDir 'src\\main\\jniLibs'
              jniLibs {
                  srcDirs 'jniLibs', 'src\\main\\jniLibs'
              }
          }
      }
  ```

### 4.2 将abi复制到jniLibs目录下(app和sdk及sdk/libs目录下)

![][3]

### 4.3 若so文件引用不正确，显示package not found
![][4]
## 五 总结

### 5.1 jniLibs和libs的区别

* libs是存放jar或arr文件的在Project目录下与src同级
* jniLibs是存放so文件的在Project目录下的src下的main文件夹下的

### 5.2 ABI架构(armeabi-v7a,arm64- v8a,x86,x86_64)
![][5]
### 5.3 ABI限定及打包

```
android {
    splits {
        abi {
            enable true
            universalApk false
            reset()
            include 'armeabi-v7a'
            include 'arm64-v8a'
            include 'x86'
            include 'x86_64'
        }
    }
static def releaseTime() {
    return new Date().format("yyyyMMdd", TimeZone.getTimeZone("GMT+8"))

    applicationVariants.all { variant ->
                variant.outputs.all { output ->
                    project.ext { appName = 'YourApkName' }
                    outputFileName = "${variant.flavorName}_${output.getFilter(com.android.build.OutputFile.ABI)}_V${variant.versionCode}_${releaseTime()}.apk"
                }
            }
}
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-jnilibs-new.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-jni-folder.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-jnilibs-copy.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-package-not-found.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-opencv/android-opencv-abis-supports.png