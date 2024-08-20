---
title: Windows应用之——加载用户设置时遇到错误
categories:
  - 系统
  - Windows
tags:
  - Terminal
abbrlink: 143031cf
date: 2024-08-20 09:19:57
---
## 一 错误现象

Windows Terminal终端设置别的终端为默认终端并删除后，出现如下现象

![][1]

<!--more-->

## 二 原因

删除默认终端后，没有选择并设置默认终端

## 三 解决办法

1-设置—>启动，默认配置文件中选择一个默认终端

![][2]

2-打开JSON文件，查看`DefaultProfile`

![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-cmd-load-error-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-cmd-open-json-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-cmd-defaultprofile-guid-3.png

