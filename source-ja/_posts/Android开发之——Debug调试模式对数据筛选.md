---
title: Android开发之——Debug调试模式对数据筛选
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: d86630bf
date: 2021-08-26 15:21:31
---
## 一 应用场景

Debug调试时，返回了数据列表，且列表数据较多时，如何筛选有效信息呢？
![][1]

<!--more-->

## 二 解决方案
* 查看要调试的数据列表`wifiList`及特征数据`BSSID`
  ![][2]
* 在要查看的数据列表上右键，选择`Evaluate Expression`
  ![][3]
* 在弹出的Evaluate评估窗口中填入过滤表达式，回车或点击底部的`Evaluate`按钮
  ```
  wifiList.filter { it.SSID.contains("Bio") }
  ```
  ![][4]
* 所有适合表达式的结果展示在Result框中
  ![][5]
  
## 三 可能出现的问题

* 在数据列表上，右键选择`Filter`
  ![][6]
* 同理，在Filtered by输入框中输入过滤条件
  ![][7]
* 执行Filterd过滤操作，显示异常
  ```
  Errors:No such instance field:'filter'
  ```
  ![][8]
* 在失败页面，右键选择`Evaluate Expression`执行`Evaluate`操作
  ![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-list-data.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-inspect.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-choice-evaluate.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-expression.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-expression-result.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-filter-select.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-filterdby.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-filtered-error.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-debug-datalist-filtered-error-evaluate.png