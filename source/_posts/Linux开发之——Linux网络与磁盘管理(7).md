---
title: Linux开发之——Linux网络与磁盘管理(7)
categories:
  - 系统
  - Linux
tags:
  - Linux
abbrlink: 1f034403
date: 2024-10-22 09:07:56
---
## 一 概述

* 网络
* 硬盘管理
* yum

<!--more-->

## 二  内容

### 2.1 网络

1-ifconfig命令

* ifconfig //查看网卡配置
* ifconfig ens37 down //关闭ens37网卡
* ifconfig ens37 up //启用ens37网卡
* ifconfig ens37 192.168.23.199 //设置ip地址
* ifconfig ens37 192.168.23.199 netmask 255.255.255.0 //设置ip地址和子网掩码

2-ping命令

* ping www.baidu.com //检测是否连通
* ping -c 2 www.baidu.com //ping 2次

3-netstat命令

* netstat -a //显示所有连接情况
* netstat -i //显示网卡列表

### 2.2 硬盘管理

1-lsblk命令

* lsblk //列出硬盘使用情况
* lsblk -f//显示系统信息

2-df命令

* df //整个硬盘使用情况(盘符)
* df aaa //aaa文件夹使用情况
* df --total //显示所有的信息
* df -h //展示单位换算(KB,MB,GB)

3-mount命令

* mkdir 文件夹 //创建文件夹(挂载点)
* mount -t auto /dev/cdrom aaa //将光驱与aaa文件夹关联挂载
* umount aaa //卸载

### 2.3 yum

1-常见命令

* yum check-update //列出所有软件清单
* yum update //更新所有软件yum update //更新所有软件
* yum install xxx //安装指定软件
* yum update xxx //更新指定软件
* yum list //列出所有可安装软件清单
* yum remove xxx //删除软件包
* yum search \<keyword> //查找软件
* yum clean packages; 清除缓存目录下的软件包
* yum clean headers;清除缓存目录下的headers
* yum clean oldheaders;清除缓存目录下旧的headers
* yum clean,yum clean all //清除软件包及旧headers

2-安装tree

* yum -y install tree

3-更换源

* yum -y install wget
* wget -0 CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo


## 三 思维导图

![linux-xmind-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-xmind-7.png