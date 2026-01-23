---
title: Flutter开发之——Flutter与原生三种通信方式(98)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: c2984f15
date: 2021-07-18 23:06:21
---
## 一 概述

Flutter与Native原生端通信有三种方法：

* MethodChannel
* BasicMessageChannel
* EventChannel

<!--more-->

## 二 三种通信方式介绍

### 2.1 MethodChannel

* Flutter与Native端相互调用，调用后返回结果
* 可以Native端主动调用，也可以Flutter主动调用，属于双向通信
* 此种方式最为常见，Native端调用需要在主线程中执行

### 2.2 BasicMessageChannel

* 用于使用指定的编解码器对消息进行编码和解码
* 属于双向通信，可以以Native端主动调用，也可以Flutter主动调用

### 2.3 EventChannel

* 用于数据流(event stream)的通信，Native端主动发送数据给Flutter
* 通常用于状态端监听，比如网络变化、传感器数据等

## 三 通信架构图

此图为官方的[架构图](https://flutter.dev/docs/development/platform-integration/platform-channels)

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-channel-native-flutter.png