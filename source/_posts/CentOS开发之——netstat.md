---
title: CentOS开发之——netstat
categories:
  - 系统
  - CentOS
tags:
  - netstat
abbrlink: b7f53712
date: 2019-10-11 21:16:51
---

## 一 前言
netstat 命令是用来查看当前网络连接情况的。Windows电脑命令提示符都自带了此命令，Linux系统下使用该指令，通常会提示没有那个文件或目录。  
![][1]   

本文以Centos7为例，讲解netstat相关的操作  

<!--more-->

## 二 Centos 如何安装netstat


### 2.1 安装说明

netstat是net-tools里面的一个命令，yum install net-tools组件

### 2.2 安装过程(输入下面的指令，如需确认输入"y") 

	yum install net-tools

![][2]

## 三 netstat使用
### 3.1 netstat --help查看帮助说明  

	netstat --help

![][3]

### 3.2 netstat -nao 查看当前所有的端口连接 包括显示连接IP

	netstat -nao

![][4]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-netstat-no.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-netstat-yum-install.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-netstat-help.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-netstat-ano.png