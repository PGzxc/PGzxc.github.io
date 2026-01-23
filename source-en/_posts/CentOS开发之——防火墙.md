---
title: CentOS开发之——防火墙
categories:
  - 系统
  - CentOS
tags:
  - 防火墙
abbrlink: bee7142c
date: 2019-10-11 21:23:35
---
# 一 Linux系统防火墙工具发展历史
防火墙工具变化如下： ipfirewall--->ipchains--->iptables--->firewalld 

* Linux 2.0版内核中，包过滤机制为ipfw，管理工具是ipfwadm。
* Linux 2.2版内核中，包过滤机制为ipchain，管理工具是ipchains。
* Linux 2.4版内核中，包过滤机制为netfilter，管理工具是iptables。
* Linux 3.1版内核中，采取daemon动态管理防火墙，管理工具是firewalld。

<!--more-->

我们现在常用的防火墙工具是：iptables、firewalld

# 二 几种常见的防火墙及其关系
* iptables是Linux下功能强大的应用层防火墙工具
* firewall是centos7里面新的防火墙管理命令
* ufw是Ubuntu下的一个简易的防火墙配置工具


# 三 几种常见防火墙如何使用

## 3.1 iptables防火墙
### 3.1.1 iptables的位置
* ptables服务将配置存储在/etc/sysconfig/iptables和/etc/sysconfig/ip6tables中

### 3.1.2 基本操作
* 安装iptables
		
      yum install iptables-services

* 卸载iptables  
	
  	  yum remove iptables-services

* 查看防火墙状态
		
	  service iptables status

* 启动防火墙

	  service iptables start 

* 停止防火墙

	  service iptables stop

* 永久关闭防火墙

	  chkconfig iptables off 

* 永久关闭后重启

	  chkconfig iptables on

* 查看iptable端口

	  iptables -L -n

* 关闭所有的 INPUT FORWARD OUTPUT 只对某些端口开放

      iptables -P INPUT DROP
      iptables -P FORWARD DROP
      iptables -P OUTPUT DROP


* 打开所有的 INPUT FORWARD OUTPUT 只对某些端口开放

      iptables -P INPUT ACCEPT
      iptables -P FORWARD ACCEPT
      siptables -P OUTPUT ACCEPT

* 开放指定的端口(22)  

	可以打开文件查看 vi /etc/sysconfig/iptables

      iptables -A INPUT -p tcp --dport 22 -j ACCEPT
      iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT

*  iptables 保存  

        service iptables save

* 保存退出后重启防火墙

		service iptables restart

## 3.2 firewall防火墙
### 3.2.1 firewall的位置
* firewalld将配置存储在/usr/lib/firewalld/和/etc/firewalld/中的各种XML文件中

#### 3.2.2 基本操作
* 查看firewalld是否安装

		rpm -qa|grep firewalld

* 查看yum中firewalld中列表

		yum list firewalld* 
* firewalld 安装

		yum install firewalld*

* firewalld 卸载

		yum remove firewall*

*  firewalld 升级

		yum -y update firewalld

* 查看firewall 安装信息

		rpm -qi firewalld firewall-config

* 查看firewall服务状态

		systemctl status firewalld

* 查看firewall的状态

		firewall-cmd --state

* 开启firesalld服务

		service firewalld start

* 关闭firewalld服务

		service firewalld stop

* 重启firewalld服务

		service firewalld restart

* 查看防火墙规则

		firewall-cmd --list-all

* 开启防火墙

		systemctl start firewalld

* 关闭防火墙

		systemctl stop firewalld

* 允firewall开机启动

		systemctl disable firewalld

* 禁止firewall开机启动

	systemctl enable firewalld

* 查询端口是否开放(8080)

		firewall-cmd --query-port=8080/tcp

* 开放某一端口(8080)

		firewall-cmd --permanent --add-port=8080/tcp

* 移除端口(8080)

		firewall-cmd --permanent --remove-port=8080/tcp

* 重启防火墙

		firewall-cmd --reload

## 3.3 ufw防火墙
### 3.3.1 ufw的位置
* ufw服务将配置存储在/etc/ufw/user.rules 中

#### 3.3.2 基本操作

* uwf安装

		sudo apt-get install ufw
	
* ufw卸载

		sudo apt-get remove ufw
	
* 查看防火墙状态

		ufw status

* 开启防火墙

		ufw enable  

* 禁用防火墙

		ufw disable

* 添加某个端口

		ufw allow in 33  
		ufw insert 2 allow in 22/tcp   
		ufw allow 80/tcp

* 禁用某个端口

		ufw deny in 33

# 四 参考

* [防火墙之发展历史][30]
* [SELinux、Netfilter、iptables、firewall和UFW五者关系][31]
* [Centos中iptables和firewall防火墙开启、关闭、查看状态、基本设置等][32]
* [Linux下iptables 禁止端口和开放端口][33]
* [同时开启firewall和iptables][34]
* [Linux添加防火墙、iptables的安装和配置（亲测）][35]
* [CentOS7中firewalld的安装与使用详解][36]
* [ubuntu ufw相关命令][37]
* [ Ubutnu UFW防火墙的简单设置][38]




[30]:https://www.cnblogs.com/lv1572407/p/10949666.html
[31]:https://blog.csdn.net/qq_34870631/article/details/78581891
[32]:https://blog.csdn.net/bbwangj/article/details/74502967
[33]:https://www.cnblogs.com/zongfa/p/7967935.html
[34]:https://blog.csdn.net/NetRookieX/article/details/87705743
[35]:https://www.cnblogs.com/lemon-flm/p/7608029.html
[36]: https://blog.csdn.net/solaraceboy/article/details/78342360
[37]:https://www.cnblogs.com/sddai/p/11107576.html
[38]:https://www.cnblogs.com/wangwust/p/9768360.html