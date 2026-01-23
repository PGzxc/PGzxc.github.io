---
title: 下载工具IDM之——禁止Chrome扩展程序自动更新
categories:
  - 工具
  - 下载
tags:
  - IDM
abbrlink: 213df9bb
date: 2024-10-12 16:11:04
---
## 一 概述

* IDM更新对比
* 禁用Chrome扩展解决办法
* 参考

<!--more-->

## 二 IDM更新对比

| 安装插件(6.38.19) | 更新插件(6.42.22) |
| :---------------: | :---------------: |
|      ![][1]       |      ![][2]       |

## 三 禁用Chrome扩展解决办法

修改Hosts文件：

```
C:\Windows\System32\drivers\etc\hosts 
```

添加内容

```
127.0.0.1 edge.microsoft.com
127.0.0.1 clients.google.com
127.0.0.1 clients1.google.com
127.0.0.1 clients2.google.com
127.0.0.1 update.googleapis.com
```

图示
![][3]

## 四 参考

* [B站—禁用 Edge/Chrome 上拓展插件的自动更新](https://www.bilibili.com/read/cv39181650/)
* [Jb51—Windows系统禁止Chrome自动更新教程](https://www.jb51.net/softjc/942015.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/idm-install-ver-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/idm-update-ver-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/idm-ext-disable-3.png