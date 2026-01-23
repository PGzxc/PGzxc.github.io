---
title: NAS入门之——My Cloud EX2 Ultra初始化设置(5)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2 Ultra
abbrlink: f909c84b
date: 2020-11-04 23:29:08
---
## 一 概述

新入手My Cloud Ex2 Ultra新人可能会对NAS的使用不甚了解，本文主要对My Cloud EX2 Ultra进行入门介绍：

* 如何登录My Cloud EX2 Ultra进行初始设置
* 如何开机和关机
* 如何选择磁盘RAID卷

<!--more-->

## 二 如何登录My Cloud EX2 Ultra进行初始设置

* 将My Cloud EX2 Ultra网络口接入网络并接入电源后开机
* 在浏览器中输入[http://mycloud.com/setup][21]进行初始信息注册，注册完成后重新登录
  ![][1]
* 登录后信息如下
  ![][2]

## 三 如何开机和关机

### 3.1 开机
将My Cloud EX2 Ultra网络口接入网络并接入电源后开机

### 3.2 关机

依次点击：右上角——>休眠——>等NAS休眠后拔掉电源
![][3]

## 四 如何选择磁盘RAID卷
 RAID: Redundant Array of Independent Disks 独立磁盘冗余阵列 

| RAID模式 | 磁盘数量  |                    优点                    |                            缺点                            |
| :------: | :-------: | :----------------------------------------: | :--------------------------------------------------------: |
|  RAID 0  | 最少 2 个 | 使用 n 颗硬盘，即可拥有将近 n 倍的读写效能 | 数据安全性较低，同组数组中任一硬盘发生问题就会造成数据遗失 |
|  RAID 1  | 最少 2 个 |   安全性依照数组里的实体硬盘数量倍数成长   |            空间利用率是所有 RAID 中最没有效率的            |
|  RAID 5  | 至少 3 个 |           兼顾空间利用率与安全性           |         需要额外的运算资源，仅能忍受 1 个硬盘损毁          |
|  RAID 6  | 至少 4 个 |       容错硬盘数量比 RAID 5 多 1 颗        |         运算量比 RAID 5 大、空间利用率比 RAID 5 低         |

![][4]
## 五 参考
* [RAID有哪几种？有什么区别](https://www.zhihu.com/question/20131784/answer/199454382)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-my-cloud-ex2-login.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-my-cloud-ex2-main-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-my-cloud-ex2-shutdown.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-raid-struct.png
[21]:http://mycloud.com/setup