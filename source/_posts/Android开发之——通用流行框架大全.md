---
title: Android开发之——通用流行框架大全
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 第三方库
abbrlink: 66cc8d59
date: 2017-12-13 10:12:30
---
## 一 概述

原文请参考[15 个 Android 通用流行框架大全][0]，包含：缓存、图片加载、图片处理、网络请求、网络解析、数据库、依赖注入、图表、后台处理、事件总线、响应式编程、Log框架、测试框架、调试框架。
![][1]

<!--more-->

## 二 15 个 Android 通用流行框架大全

### 2.1 缓存
- [DiskLruCache][2]：Java实现基于LRU的磁盘缓存

### 2.2 图片加载  
- [Android Universal Image Loader][3]： 一个强大的加载，缓存，展示图片的库
- [Picasso][4]： 一个强大的图片下载与缓存的库
- [Fresco][5]：一个用于管理图像和他们使用的内存的库 
- [Glide][6]: 一个图片加载和缓存的库

### 2.3  图片处理
- [Picasso-transformations][7]：一个为Picasso提供多种图片变换的库
- [Glide-transformations][8]：一个为Glide提供多种图片变换的库
- [Android-gpuimage][9]： 基于OpenGL的Android过滤器

###  2.4 网络请求
- [Android Async HTTP][10]：Android异步HTTP库
- [AndroidAsync][11]：异步Socket，HTTP(客户端+服务器)，WebSocket，和socket.io库。基于NIO而不是线程。 
- [OkHttp][12]： 一个Http与Http/2的客户端
- [Retrofit][13]：类型安全的Http客户端
- [Volley][14]：Google推出的Android异步网络请求框架和图片加载框架

### 2.5 网络解析

- [Gson][15]：一个Java序列化/反序列化库，可以将JSON和java对象互相转换 
- [Jackson][16]：Jackson可以轻松地将Java对象转换成json对象和xml文档，同样也可以将json、xml转换成Java对象
- [Fastjson][17]：Java上一个快速的JSON解析器/生成器
- [HtmlPaser][18]：种用来解析单个独立html或嵌套html的方式 
- [Jsoup][19]：个以最好的DOM，CSS和jQuery解析html的库

### 2.6 数据库
- [OrmLite][20]：JDBC和Android的轻量级ORM java包
- [Sugar][21]：用超级简单的方法处理Android数据库
- [GreenDAO][22]:一种轻快地将对象映射到SQLite数据库的ORM解决方案
- [ActiveAndroid][23]：以活动记录方式为Android SQLite提供持久化
- [SQLBrite][24]：SQLiteOpenHelper 和ContentResolver的轻量级包装
- [Realm][25]：移动数据库：一个SQLite和ORM的替换品

###  2.7 依赖注入

- [ButterKnife][26]： 将Android视图和回调方法绑定到字段和方法上
- [Dagger2][27]：一个Android和java快速依赖注射器
- [AndroidAnotations][28]：快速安卓开发。易于维护
- [RoboGuice][29]：Android平台的Google Guice

### 2.8 图表
- [WilliamChart][30]：创建图表的Android库
- [HelloCharts][31]：兼容到API8的Android图表库
- [MPAndroidChart ][32]：一个强大的Android图表视图/图形库

### 2.9 后台处理
- [Tape][33]：一个轻快的，事务性的，基于文件的FIFO的库
- [Android Priority Job Queue][34]：一个专门为Android轻松调度任务的工作队列

### 2.10 事件总线
- [EventBus][35]： 安卓优化的事件总线，简化了活动、片段、线程、服务等的通信  
- [Otto][36]： 一个基于Guava的增强的事件总线

### 2.11 响应式编程
- [RxJava][37]： JVM上的响应式扩展
- [RxJavaJoins][38]：为RxJava提供Joins操作
- [RxAndroid][39]： Android上的响应式扩展，在RxJava基础上添加了Android线程调度
- [RxBinding][40]： 提供用RxJava绑定Android UI的API
- [Agera][41]：Android上的响应式编程

### 2.12 Log框架
- [Logger][42]：简单，漂亮，强大的Android日志工具
- [Hugo][43]： 在调试版本上注解的触发方法进行日志记录
- [Timber][44]： 一个小的，可扩展的日志工具

### 2.13 测试框架 

- [Mockito][45]： Java编写的Mocking单元测试框架
- [Robotium][46]：Android UI 测试
- [robolectric][47]：Android单元测试框架

Android自带很多测试工具：JUnit，Monkeyrunner，UiAutomator，Espresso等

### 2.14 调试框架
- [Stetho][48]： 调试Android应用的桥梁，使得可以利用Chrome开发者工具进行调试

### 2.15  性能优化
- [LeakCanary][49]： 内存泄漏检测工具
- [ACRA][50]： Android应用程序崩溃报告


[0]: https://www.oschina.net/news/73836/15-android-general-popular-frameworks
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android_utils.png
[2]: https://github.com/JakeWharton/DiskLruCache
[3]: https://github.com/nostra13/Android-Universal-Image-Loader
[4]: https://github.com/square/picasso
[5]: https://github.com/facebook/fresco
[6]:一个图片加载库

[7]: https://github.com/wasabeef/picasso-transformations
[8]: https://github.com/wasabeef/glide-transformations
[9]: https://github.com/CyberAgent/android-gpuimage
[10]: https://github.com/loopj/android-async-http
[11]: https://github.com/koush/AndroidAsync
[12]: https://github.com/square/okhttp
[13]: https://github.com/square/retrofit
[14]: https://android.googlesource.com/platform/frameworks/volley
[15]: https://github.com/google/gson
[16]: https://github.com/codehaus/jackson
[17]: https://github.com/alibaba/fastjson
[18]: https://sourceforge.net/projects/htmlparser/
[19]: https://github.com/jhy/jsoup
[20]: https://sourceforge.net/projects/ormlite/files/releases/com/j256/ormlite/
[21]: https://github.com/chennaione/sugar
[22]: https://github.com/greenrobot/greenDAO
[23]: https://github.com/pardom/ActiveAndroid
[24]: https://github.com/square/sqlbrite
[25]: https://github.com/jhy/jsoup
[26]: https://github.com/JakeWharton/butterknife
[27]: https://github.com/google/dagger
[28]: https://github.com/androidannotations/androidannotations
[29]: https://github.com/roboguice/roboguice
[30]: https://github.com/diogobernardino/WilliamChart
[31]: https://github.com/lecho/hellocharts-android
[32]: https://github.com/PhilJay/MPAndroidChart
[33]: https://github.com/square/tape
[34]: https://github.com/yigit/android-priority-jobqueue
[35]: https://github.com/greenrobot/EventBus
[36]: https://github.com/square/otto
[37]: https://github.com/ReactiveX/RxJava
[38]: https://github.com/ReactiveX/RxJavaJoins
[39]: https://github.com/ReactiveX/RxAndroid
[40]: https://github.com/JakeWharton/RxBinding
[41]: https://github.com/google/agera
[42]: https://github.com/orhanobut/logger
[43]: https://github.com/JakeWharton/hugo
[44]: https://github.com/JakeWharton/timber
[45]: https://github.com/mockito/mockito
[46]: https://github.com/RobotiumTech/robotium
[47]: https://github.com/robolectric/robolectric
[48]: https://github.com/facebook/stetho
[49]: https://github.com/square/leakcanary
[50]: https://github.com/ACRA/acra