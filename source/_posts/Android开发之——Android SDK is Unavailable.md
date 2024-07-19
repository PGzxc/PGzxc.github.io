---
title: Android开发之——Android SDK is Unavailable
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 3a900474
date: 2024-07-19 18:44:06
---
## 一 现象

首次安装时出现以下现象：Android SDK is Unavailable

![][1]

<!--more-->

## 二 原因分析(ping指令)

### 2.1 使用ping指令查看网络状况

```
ping dl.google.com
```

### 2.2 ping结果

```
zxc@zxc MacBook-Pro ~ % ping dl.google.com
PING dl.google.com (142.250.204.46): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
Request timeout for icmp_seq 3
Request timeout for icmp_seq 4
Request timeout for icmp_seq 5
Request timeout for icmp_seq 6
```

说明：超时，无法访问 dl.google.com

### 2.3 通过站长工具，查看可用探测点

```
https://ping.chinaz.com/dl.google.com
```

如图所示，从中找出一个节点`58.254.137.161`,同时`ping 58.254.137.161`，验证是否ping通

![][2]

### 2.4  将该点添加到host

```
220.181.174.97  dl.google.com
```

### 2.5 ping下dl.google.com

```
zxc@zxc MacBook-Pro ~ % ping dl.google.com
PING dl.google.com (220.181.174.97): 56 data bytes
64 bytes from 220.181.174.97: icmp_seq=0 ttl=116 time=11.651 ms
64 bytes from 220.181.174.97: icmp_seq=1 ttl=116 time=9.796 ms
64 bytes from 220.181.174.97: icmp_seq=2 ttl=116 time=11.865 ms
64 bytes from 220.181.174.97: icmp_seq=3 ttl=116 time=9.945 ms
64 bytes from 220.181.174.97: icmp_seq=4 ttl=116 time=10.991 ms
64 bytes from 220.181.174.97: icmp_seq=5 ttl=116 time=9.755 ms
64 bytes from 220.181.174.97: icmp_seq=6 ttl=116 time=11.677 ms
```

## 三 解决

退出重新进入后，发现SDK可用

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-sdk-unavailable.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-sdk-ping-site.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-sdk-download-ok.png