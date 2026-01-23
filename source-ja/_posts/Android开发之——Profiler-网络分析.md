---
title: Android开发之——Profiler-网络分析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 3cb86604
date: 2021-08-15 19:08:46
---
## 一 Profiler-网络分析能做什么

* 网络性能剖析器会在时间轴上显示实时网络活动，包括发送和接收的数据以及当前的连接数
* 这便于您检查应用传输数据的方式和时间，并适当优化底层代码

<!--more-->

## 二  Profiler-网络分析概述

### 2.1 如何打开Profiler-网络分析剖析起

* 依次选择 **View > Tool Windows > Profiler** 或点击工具栏中的 Profile图标
  ![][1]
* 点击 NETWORK 时间轴上的任意位置以打开内存性能分析器
  ![][2]

### 2.2 网络设置

#### MainActivity

```
 val httpAsync = "https://httpbin.org/get"
                .httpGet()
                .responseString { request, response, result ->
                    print(response)
                }
 httpAsync.join()
```

#### SecondActivity

```
val httpAsync = "https://www.wanandroid.com/banner/json"
                .httpGet()
                .responseString { request, response, result ->
                    print(response)
                }
httpAsync.join()
```

### 2.3 网络分析器概览

#### 网络分析结果

![][3]

#### 结果说明

1. 时间轴，可以点击并拖动以选择时间轴的一部分来检查网络流量
2. **Connection View**和**Thread View**
   - Connection View：列出了在时间轴上选定时段内从您应用的所有 CPU 线程发送或接收的文件
   - Thread View：显示您应用的每个 CPU 线程的网络活动
3. 从 **Connection View** 或 **Thread View** 中点击请求名称，可检查有关已发送或已接收数据的详细信息

## 三 查看网络结果

* 拖动时间轴选择分析区间
  ![][4]
* 点击Connection View列表，查看接口请求及结果
  ![][5]

## 四 参考

* [利用网络性能剖析器检查网络流量](https://developer.android.google.cn/studio/profile/network-profiler?hl=zh_cn)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-network-all-session.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-network-clickin.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-network-view.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-network-period.gif
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-profiler-network-response.png