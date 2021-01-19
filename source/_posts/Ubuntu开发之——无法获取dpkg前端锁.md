---
title: Ubuntu开发之——无法获取dpkg前端锁
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: bab0205c
date: 2021-01-19 15:50:28
---
## 一 现象描述

在终端执行指令时，遇到了如下错误

```
sudo apt-get install yum
E: 无法获得锁 /var/lib/dpkg/lock-frontend。锁正由进程 2320（unattended-upgr）持有
N: 请注意，直接移除锁文件不一定是合适的解决方案，且可能损坏您的系统。
E: 无法获取 dpkg 前端锁 (/var/lib/dpkg/lock-frontend)，是否有其他进程正占用它？
```
<!--more-->

## 二 原因分析

在`sudo apt-get install yum`时没有完成就强行关闭terminal了。然后再次打开重新install时就抛出了这个错误

## 三 解决办法

强制解锁

```
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/cache/apt/archives/lock  
sudo rm /var/lib/dpkg/lock
```

