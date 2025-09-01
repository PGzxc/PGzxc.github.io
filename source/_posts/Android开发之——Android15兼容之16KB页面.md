---
title: Android开发之——Android15兼容之16KB页面
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 6a724f52
date: 2025-06-24 15:48:38
---
## 一 概述

* 什么是 “16 KB 页面大小”
* 怎么适配 16 KB 页面大小设备
* 适配清单一览

<!--more-->

## 二 什么是“16 KB 页面”？

### 2.1 16K页面

```
这指的是系统内存分页机制中的页(page)大小，
从 Android 15(API 35)开始，Android 系统允许设备配置使用 16 KB 内存页，
相比传统的 4 KB 页面规模有明显性能优化，尤其在大内存设备上
```

### 2.2 16K优势

```
-启动加速（启动时间平均缩短 3.16%，最高可达 30%）
-降低功耗（应用启动功耗平均降低 ~4.56%；相机启动也加速）
-系统启动时间缩短（平均节省约 950 毫秒）
```

### 2.3 要求

```
从 2025 年 11 月 1 日起，
Google Play 要求所有提交到 Play、目标平台为 Android 15 及以上的新应用或更新，
都必须支持 16 KB 页面大小
```

## 三 怎么适配 16 KB 页面大小设备

### 3.1 代码

```
如果你的 app 涉及 原生代码（C/C++）
```

### 3.2 注意事项

```
1、检查原生库（.so 文件）是否存在
 可通过 Android Studio 的 APK 分析器查看 lib 目录

2、确保 ELF 段按 16 KB 对齐
 使用 check_elf_alignment.sh 脚本或通过 llvm-objdump 查看 LOAD … align 是否为 2**14（即 16 KB）
 
3、使用zipalign工具验证APK文件是否按16 KB边界对齐(参数 -P 16)
 https://developer.android.google.cn/guide/practices/page-sizes?hl=zh-cn
 
4、使用 Android Gradle Plugin (AGP) 8.5.1 或以上版本更方便
 -它默认支持 16 KB 对齐；
 -若低于该版本，可通过 useLegacyPackaging true（在 Gradle 中）启用旧打包方式
 
5、NDK 设置
 -NDK r28 及以上版本默认支持 16 KB；
 -若使用 r27 或以下版本，需要在构建配置中添加 -DANDROID_SUPPORT_FLEXIBLE_PAGE_SIZES=ON 
 或链接器参数 -Wl,-z,max-page-size=16384（视构建系统如 CMake、ndk-build 而异）
 
6、审查代码中不能硬编码依赖页面大小，如使用 PAGE_SIZE 常量
 应改用 getpagesize() 或 sysconf(_SC_PAGESIZE) 等动态接口获取

7、测试
 必须在 16 KB 页面大小环境中
 （如Android15模拟器带16 KB page size镜像、Cuttlefish VM、真实设备通过开发者选项切换等）验证你的应用
```

## 四 适配清单一览

| 步骤 |                  操作说明                  |
| :--: | :----------------------------------------: |
|  1   |      检查是否使用原生代码（.so 文件）      |
|  2   |        检查 ELF 段是否按 16 KB 对齐        |
|  3   |      使用 zipalign 确认 APK 对齐正确       |
|  4   | 升级 AGP 到 8.5.1+ 或开启 legacy packaging |
|  5   |        NDK 配置支持 16 KB page size        |
|  6   |          移除硬编码页面大小的逻辑          |
|  7   |      在 16 KB 模拟器或设备上全面测试       |


## 五 参考

* [Android官方文档—行为变更](https://developer.android.google.cn/about/versions/15/behavior-changes-all?hl=zh-cn#core)
* [Android官方文档—支持16KB页面大小](https://developer.android.google.cn/guide/practices/page-sizes?hl=zh-cn)