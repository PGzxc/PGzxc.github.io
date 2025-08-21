---
title: Cmake自学之——打印消息(5)
categories:
  - 开发
  - T-构建
  - Cmake
  - 自学
tags:
  - Cmake
abbrlink: 6899af34
date: 2020-01-17 22:12:13
---
## 一 概述

打印日志消息是软件开发中一个重要的功能。本文要讲述的Cmake的打印消息方法message，用于编译时期在cmake项目中输出日志信息，也可用于断点调试时，随时查看日志信息。
![][1]
<!--more-->

## 二 Cmake方法介绍

### 2.1 message打印方法

```
message([<mode>] "message to display" ...)
```

* message：消息名字，可在CMakeLists.txt或者.cmake脚本文件中输入，且有提示，不区分大小写
* mode：打印消息的类别，有FATAL_ERROR，SEND_ERROR，WARNING，AUTHOR_WARNING，DEPRECATION，(none) or `NOTICE`，STATUS，VERBOSE，DEBUG，TRACE共10种
* "message to display"：输出消息的内容，是字符串类型
* ...：表示可变参数，可连接多个输出

### 2.2 mode说明

* FATAL_ERROR：cmake出错，停止编译和生成(信息红色)
* SEND_ERROR：cmake出错，继续编译，但是停止生成(信息红色)
* WARNING：cmake警告，继续编译(信息红色)
* AUTHOR_WARNING：开发者警告，继续编译(信息红色)
* DEPRECATION：如果使用set方法设置CMAKE_ERROR_DEPRECATED为true(不区分大小写)，编译出错，否则继续编译
* (none) or `NOTICE`：不设置mode，默认是NOTICE模式，不影响编译和生成，用于打印消息(信息白色)
* STATUS：编译时状态信息，左边以`--`开头(信息白色)
* DEBUG：针对开发人员的调试信息(信息白色)
* TRACE：日志级别的临时信息(信息白色)

## 三 示例

### 3.1 FATAL_ERROR模式

* CMakeLists.txt中打印FATAL_ERROR模式配置信息
![][2]  
* 打印日志信息
![][3]

### 3.2 SEND_ERROR模式
* CMakeLists.txt中打印SEND_ERROR模式配置信息
![][4]
* 打印日志信息
![][5]

### 3.3 WARNING和AUTHOR_WARNING模式
* CMakeLists.txt中打印WARNING和AUTHOR_WARNING模式配置信息
![][6]
* 打印日志信息
![][7]

### 3.4 DEPRECATION模式
* CMakeLists.txt中打印DEPRECATION模式配置信息(通过set方法设置)
![][8]
* 打印日志信息(设置为true时，编译出错)
![][9]

### 3.5 剩余其他模式

* MakeLists.txt中打印NOTICE，STATUS，VERBOSE，DEBUG，TRACE模式配置信息
![][10]
* 打印日志信息
![][11]

## 四 参考
* [Documentation » cmake-commands(7) »message][12]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-debug-message-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-fatal-error-config.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-fatal-error-print.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-send-error-config.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-send-error-print.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-warning-config.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-warning-print.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-deprecation-config.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-deprecation-print.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-other-config.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cmake-message-model-other-print.png
[12]:https://cmake.org/cmake/help/latest/command/message.html