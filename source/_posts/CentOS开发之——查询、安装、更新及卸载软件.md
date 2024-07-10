---
title: CentOS开发之——查询、安装、更新及卸载软件
categories:
  - 系统
  - CentOS
tags:
  - 软件操作
abbrlink: b9d279d6
date: 2019-10-08 22:52:38
---
## 一 简介

本文主要介绍Centos7系统下软件的查询，安装，升级及卸载等相关的操作。

<!--more-->

## 二 软件查询
Centos7 系统下，软件查询的常用命令是rmp

### 2.1 rmp 简介
rpm命令是RPM软件包的管理工具。rpm原本是Red Hat Linux发行版专门用来管理Linux各项套件的程序，由于它遵循GPL规则且功能强大方便，因而广受欢迎。逐渐受到其他发行版的采用。RPM套件管理方式的出现，让Linux易于安装，升级，间接提升了Linux的适用度

### 2.2 常见的查询命令(以软件net-tools为例)
#### 2.2.1 列出所有安装的软件及依赖
![][1]

#### 2.2.2 查询某个软件包的文件全名

	rpm -q net-tools 

![][2]

#### 2.2.3 查询某个软件包安装的位置

	rpm -ql net-tools

![][3]


#### 2.2.4 查询某个软件包存储位置

	rpm -qal|grep net-tools
![][4]


#### 2.2.5 查询某个软件是否存在
* rpm包安装的，可以用rpm -qa看到，如果要查找某软件包是否安装，用 rpm -qa | grep "软件或者包的名字"
* deb包安装的，可以用dpkg -l能看到。如果是查找指定软件包，用dpkg -l | grep "软件或者包的名字" 
* yum方法安装的，可以用yum list installed查找，如果是查找指定包，命令后加 | grep "软件名或者包名"
* 如果是以源码包自己编译安装的，例如.tar.gz或者tar.bz2形式的，这个只能看可执行文件是否存在了
*  pip安装的所有包：pip list

## 三 软件安装(以安装java为例)
本文主要讲述几种常见的软件安装方式：rpm安装包，tar.gz压缩文件安装包，yum在线安装包

### 3.1 rpm安装包
	rpm -ivh ***.rpm　　#其中i表示安装，v表示显示安装过程，h表示显示进度

![][5]
### 3.2 tar.gz压缩文件安装包

#### 3.2.1 解压文件
	tar -zxvf jdk-13_linux-x64_bin.tar.gz
![][6]
#### 3.2.2 添加环境变量(修改/etc/profile文件，在文件结尾添加配置信息)

	export JAVA_HOME=/home/jdk-13
	export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib:
	export PATH=$JAVA_HOME/bin:$PATH

![][7]
#### 3.2.3   执行source /etc/profile命令让配置生效

	source /etc/profile 

![][8]
### 3.3 yum在线安装包
#### 3.3.1 查询系统有没有自带open-jdk

	rpm -qa |grep java
	rpm -qa |grep jdk
	rpm -qa |grep gcj

#### 3.3.2 检索包含java的列表
![][9]

#### 3.3.3 安装1.8.11的所有文件 

	yum install java-11-openjdk* -y

![][10]
## 四 软件卸载
### 4.1 卸载yum安装软件
	yum remove java-11*

![][11]

### 4.2 卸载rpm安装软件

	rpm -e jdk-13
![][12]

### 4.3 tar二进制包安装
* 直接删除解压出来的文件
* 去掉配置文件中的信息


## 五 更新软件
### 5.1 检查可更新的rpm包 
	yum check-update 
![][13]
### 5.2 更新指定的rpm包
	yum -y update kernel
![][14]
### 5.3 更新所有的rpm包(不升级淘汰的包 )
	yum update 
![][15]

### 5.3 更新所有的rpm包(连旧的淘汰的包也升级 )
	yum upgrade
![][16]
## 六 参考


* [CentOS安装JDK-tar.gz文件][30]
* [centos7通过yum安装JDK1.8][31]
* [linux下软件的更新命令][32]
* [centos查看是否安装了某个软件][33]





[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-rpm-qa-grep.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-rpm-q.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-rpm-ql.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-rpm-qal-grep.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos-software-rpm-ivh.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-tar-zxvf.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-ect-profile-config.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-source-etc-profile.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-yum-list.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-yum-install.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-yum-remove.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-rpm-e-remove.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-check-update.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-yum-update.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-yum-update-all.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/centos7-software-yum-upgrade-all.png


[30]: https://www.cnblogs.com/zhi-leaf/p/10315125.html
[31]: https://www.cnblogs.com/wlsblog/p/7908348.html
[32]: https://blog.csdn.net/mier9042/article/details/80612707
[33]: https://blog.csdn.net/zhangjianming2018/article/details/80382082