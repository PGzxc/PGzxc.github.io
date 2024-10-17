---
title: Linux开发之——Linux安装与使用(2)
categories:
  - 系统
  - Linux
tags:
  - Linux
abbrlink: 1cd4cc44
date: 2024-10-17 09:14:53
---
## 一 概述

* 虚拟机
* CentOS

<!--more-->

## 二  内容

### 2.1 虚拟机

1-Vmware简介

* 同一PC使用两种以上的操作系统
* 完全隔离保护不同操作系统资源
* 不同系统互动操作
* 复原功能
* 设置并随时修改操作系统环境

2-虚拟机实现方式

* VMware workstation
* VirtualBox

3-Vmware下载及安装

* 下载地址：https://www.vmware.com/
* 安装：VMnet1、VMnet2

### 2.2 CentOS

1-下载安装

* 下载地址：https://www.centos.org/download
* Vmware安装CentOS

2-CentOS安装设置

* 设置语言
* 系统安装位置选择
* 软件选择(GNOME桌面)
* Root密码

3-静态IP设置

* 虚拟网络编辑器-NAT模式设置
* ifcfg-ens33 修改

4-终端工具SecureCRT

* 介绍：是一款支持SSH的终端仿真程序
* Quick Connect连接CentOS：hostname、用户名和密码

5-文件和目录

* etc(系统配置文件)
* usr/bin(系统预设文件存放目录)
* var/log(程序运行日志存放目录)

6-时间同步

* date-查看当前时间(终端输入)
* 将客户端时间与主机同步(同步修改)

7-系统克隆与还原

* 说明：占用空间、原系统不存在，克隆体还能用
* 克隆：右键—>管理-克隆(完整克隆)
* 还原：文件—>打开——>选择克隆体

8-系统快照与还原

* 说明：占用空间小，原系统不存在，快照不能用
* 快照：右键—>快照-拍摄快照
* 还原：右键—>快照—>快照管理器—>转到

## 三 思维导图

![linux-xmind-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-xmind-2.png