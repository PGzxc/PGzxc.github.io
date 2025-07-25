---
title: NAS入门之——My Cloud EX2通过终端SSH访问(9)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: 8425f5b3
date: 2024-08-22 08:46:13
---
## 一 概述

* 准备材料
* 查看My Cloud EX2 SSH用户名
* MobaXterm访问NAS

<!--more-->

## 二 准备材料

* 终端工具Putty或MobaXterm(本文使用)
* My Cloud EX2

## 三 查看My Cloud EX2 SSH用户名

登录账户后，依次点击：设置—>网络—>网络服务—>SSH—>配置(默认用户名为`sshd`)

![][1]

## 四 MobaXterm访问NAS

1-打开MobaXterm，新建一个Session

![][2]

2-打开`Session设置`对话框中，输入NAS地址

![][3]

3-输入用户名`sshd`和NAS密码登录

![][4]

4-登录成功后，系统文件目录

![][5]

## 五 参考

* [西数My Cloud EX2 Ultra 最新的固件开启SSH后 Putty连接ID和密码到底是什么啊](http://www.nasyun.com/thread-67295-1-1.html)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-ssh-username-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-ssh-session-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-ssh-remote-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-ssh-login-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-ssh-login-sys-5.png