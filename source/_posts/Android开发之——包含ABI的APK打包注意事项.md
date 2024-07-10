---
title: Android开发之——包含ABI的APK打包注意事项
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 914a211f
date: 2021-08-25 15:05:52
---
## 一 概述

* ABI (Application Binary Interface)是两个程序模块之间的接口; 通常，其中一个是库文件或者是操作系统
* 一种CPU架构 = 一种对应的ABI参数 = 一种对应类型的SO库
* 第三方SDK提供多个ABI的SO库，打包输出时如何处理？

<!--more-->

## 二 [目前支持的 ABI][00]

|                             ABI                              |                         支持的指令集                         |           备注           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------: |
| [`armeabi-v7a`](https://developer.android.google.cn/ndk/guides/abis?hl=zh_cn#v7a) |               armeabi<br>Thumb-2<br/>VFPv3-D16               | 与 ARMv5/v6 设备不兼容。 |
| [`arm64-v8a`](https://developer.android.google.cn/ndk/guides/abis?hl=zh_cn#arm64-v8a) |                           AArch64                            |                          |
| [`x86`](https://developer.android.google.cn/ndk/guides/abis?hl=zh_cn#x86) |          x86 (IA-32)<br/>MMX<br/>SSE/2/3<br/>SSSE3           |  不支持 MOVBE 或 SSE4。  |
| [`x86_64`](https://developer.android.google.cn/ndk/guides/abis?hl=zh_cn#86-64) | x86-64<br/>MMX<br/>SSE/2/3<br/>SSSE3<br/>SSE4.1、4.2<br/>POPCNT |                          |

## 三  ABI依赖注意事项

### 3.1  jniLibs和libs的区别

- libs是存放jar或arr文件的在Project目录下与src同级
- jniLibs是存放so文件的在Project目录下的src下的main文件夹下的

### 3.2 ABi配置

#### SO文件放置到libs文件夹下时，通过jniLibs.srcDir指定位置

```
sourceSets{
        main{
            jniLibs.srcDir 'libs'
            jni.srcDirs = []    //disable automatic ndk-build
        }
    }
```
![][1]

#### SO文件放置到src/main/jniLibs文件夹下时(默认位置)，可不指定也可指定

```
sourceSets{
        main{
            jniLibs.srcDir 'src\\main\\jniLibs'
            //jniLibs.srcDir 'libs'
           // jni.srcDirs = []    //disable automatic ndk-build
        }
    }
```
![][2]

### 3.3 默认打包问题

#### 打包后的apk
![][3]

#### 说明

* 因为包含了所有情况下的ABI，可以在任意CPU架构下使用
* 正是因为包含了所有ABI，导致apk体积过大
* 下面介绍减少apk体积的优化方案

## 四 减少apk体积的优化方案

在这里我介绍两种技术：

- ABI Filters
- APK Split

### 4.1 ABI Filters

#### 一般情况

在`defaultConfig`中加入如下配制

```
ndk {
       //设置支持的SO库架构（开发者可以根据需要，选择一个或多个平台的so）
       abiFilters   "arm64-v8a", "armeabi-v7a"//,"armeabi", "x86","arm64-v8a","x86_64"
   }
```

这种情况下，仍然包含多个ABI
![][4]

#### productFlavors

去掉`defaultConfig`中配制，通过在productFlavors中指定abi

```
productFlavors {
      arm64_v8a {
            ndk {
                abiFilters "arm64-v8a"
            }
       }
      armeabi_v7a {
            ndk {
                abiFilters "armeabi-v7a"
            }
        }
    }
```

执行打包输出后的apk，只包含指定abi
![][5]

### 4.2 APK Split

APK split 允许我们自动生成多个APK文件，通过处理架构配制(请先去除ABI Filters配置)

```
 splits {
        abi {
            enable true
            universalApk false
            reset()
            include 'armeabi-v7a'
            include 'arm64-v8a'
            //include 'x86'
            //include 'x86_64'
        }
  }
```

执行打包后的对比
![][6]

## 五 参考
* [优化ApK大小之ABI Filters 和 APK split][01]
* [ANDROID动态加载 使用SO库时要注意的一些问题][02]


[00]:https://developer.android.google.cn/ndk/guides/abis?hl=zh_cn#gradle
[01]:https://www.bianchengquan.com/article/240058.html
[02]:https://blog.csdn.net/eric4784510/article/details/53609165
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-abi-jniLibs-src.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-abi-jniLibs-set.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-abi-all-release-oversize.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-abi-abifilter-set.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-abi-productFlavors.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-abi-split-apk.png