---
title: Linux开发之——系统与设置命令(3)
categories:
  - 系统
  - Linux
tags:
  - Linux
abbrlink: 130052c6
date: 2024-10-18 09:11:26
---
## 一 概述

* Linux命令
* 系统相关
* 系统进程

<!--more-->

## 二  内容

### 2.1 Linux命令

1-账号管理(root)

* 创建用户：useradd(选项) 用户名
* 用户命令：passwd(选项) 用户名
* 修改用户：usermod(选项) 用户名
* 删除用户：userdel(选项) 用户名
* 切换用户：su 用户名

2-用户组(root)

* 创建用户组：groupadd(选项) 用户组名
* 修改用户组：groupmod(选项) 用户组名
* 查询用户所属组：groups 用户名
* 删除用户组：groupdel 用户组名

3-管理用户组内成员

* gpasswd(可选项) 组名
* gpasswd -a user1 kafazu
* grep 'kaifazu' /etc/group

### 2.2 系统相关

1-日期管理

* date[参数选项]
* date -d "2020-12-12 11:11:11"

2-显示用户

* logname [--help]\[--version] 显示登录账号的信息
* logname

3-切换用户

* su [fmp] [-c command] [-s shell] [--help] [--version] [-] [USER] [ARG]
* su root

4-id命令

* id [-g]\[--help]\[--version]\[用户名称] 查看当前用户的详细信息(用户id,群组id,所属组)
* id

5-sudo命令

* sudo [参数选项] 提高普通用户的操作权限
* sudo ls(需输入密码)

### 2.3 系统进程

1-top命令

* top\ [-]\[d delay]\[q]\[c]\[S]\[s]\[i]\[n]\[b]实时显示process的动态
* top(实时显示所有进程信息)

2-ps命令

* ps \[options]\[--help] 查看进程信息
* ps 显示当前正在运行的进程信息

3-kill命令

* kill [-s <信息名称或编号>] [程序] 中断执行中的程序
* kill -9(编号) 111 彻底杀死指定进程

4-关机

* shutdown \[-t seconds]\[-rkhncfF]time [message] 关机
* shutdown -h now 立马关机

5-重启

*  reboot \[-n]\[-w]\[-d]\[-f]\[-i]
* reboot 立马重启

6-who命令

* who -\[husfV][user] 显示当前登录系统的用户
* who 显示当前登录系统的用户

7-timedatectl命令

* 矫正服务器时间、时区
* timedatectl set-timezone "Asia/Shanghai" 设置本地时区

8-clear命令

* 清除屏


## 三 思维导图

![linux-xmind-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-xmind-3.png