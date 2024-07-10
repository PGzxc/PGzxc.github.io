---
title: Mac系统开发之——CleanMyMac闪退处理
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: f12f9b50
date: 2020-03-25 13:32:01
---
## 一 异常现象描述

Mac系统升级后，在使用CleanMyMac X 4.5.2 时，突然出现了如下问题
![][1]
<!--more-->
## 二 原因分析
新版本的CleanMyMac X容易发送官方网络链接

## 三 解决办法
* 运行终端输入以下命令然后回车即可

  ```
  codesign -f -s - --deep /Applications/CleanMyMac\ X.app
  ```

## 四 建议

* 建议安装一款防火墙软件屏蔽CleanMyMac X的官方网络链接！



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cleanmy-mac-exception.png