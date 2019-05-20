---
title: CentOS开发之——CentOS7安装
date: 2018-07-26 22:36:57
categories: [系统,CentOS]
tags: [CentOS7]
---
# 前言
CentOS（Community Enterprise Operating System，中文意思是：社区企业操作系统）是Linux发行版之一，它是来自于Red Hat Enterprise Linux依照开放源代码规定释出的源代码所编译而成。由于出自同样的源代码，因此有些要求高度稳定性的服务器以CentOS替代商业版的Red Hat Enterprise Linux使用。两者的不同，在于CentOS并不包含封闭源代码软件。   

<!--more-->

# 准备工作
本文基于vmware workstations进行CentOS7安装过程，关于vmware workstations安装配置这里不再介绍
## 软件
1. VMware 
2. CentOS7

## 下载
### 打开CentOS官网
[CentOS官网][1]     
![][2] 
### 从镜像列表中选择下载
![][3]
# 系统安装
## 新建虚拟机
1. 打开VMware
	![][4]  
2. 文件->新建虚拟机(本文选用典型模式)
	![][5]
3. 选择系统镜像(稍后安装)
	![][6]
4. 选择操作系统(Linux->centOS) 
	![][7]
5. 设置虚拟机的名称和存储位置
	![][8]
6. 设置虚拟机的容量
	![][9]
7. 下一步，完成向导设置
8. 选中虚拟机(centOS7)->编辑虚拟机设置(内存容量、ios镜像)
	![][10]
9. 点击开启虚拟机
	![][11]
## CentOS7操作系统安装过程
1. 虚拟机控制台出现界面，选择Install CentOS 7，点击回车键继续
	![][12]
2. 如下界面默认选择中文，点击Continue继续
	![][13]
3. centOS7安装配置主要界面
	
	3.1 本地化(不需要进行任何设置)   
	3.2 软件(不需要进行任何设置，这里本次采用默认值（即最小化安装安装)   
	3.3 系统    	

	![][14]


4. 点击 系统->安装位置，配置(也可默认配置)
	![][15]
	![][16]
	![][17]
5. 修改操作系统主机名，这里修改为orange
	![][18]
6. 设置登录密码
	![][19]
7. 确认后点击安装
	![][20]
8. 操作系统安装已经完成，点击reboot重启操作系统
9. 重启后oot用户登录（即root/(root密码)）
	![][21]

## CentOS配置
### 配置ip
1. 使用指令：ip add 查看ip 地址
可以看到inet6是没有地址信息的   
![][22]
2. 修改IP地址（vi /etc/sysconfig/network-scripts/ifcfg-ens32）
本文使用动态ip地址，打开ifcfg-ens32后将ONBOOT改为yes
![][23]
![][24] 
3. service network restart命令重启网卡，生效刚刚修改ip地址
可以看到inet6后面的ip已生效  
![][25] 
4. 打开外网cmd客户端，ping centOS 地址
![][26] 

### SSH工具

1. 链接远程主机
![][27]
2. 打开ssh shell 
![][28]	
3. ssh shell 乱码
	![][29]
4. 配置 /ect/locale.conf文件(UTF-8为GBK)
	![][30]
	![][31]
5. 修改后生效
	
	![][32]





[1]: https://www.centos.org/download/
[2]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-guanwang.png
[3]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-download.png
[4]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vmware-workstation.png
[5]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/vmware-guide.png
[6]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos--system.png
[7]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-select.png
[8]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-position.png
[9]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-capacity.png
[10]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-system-img.png
[11]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-start.png
[12]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-install-centos-7.png
[13]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-language.png
[14]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-config.png
[15]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos7-system.jpg
[16]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-boot.png
[17]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-done.png
[18]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-localhost-before.png
[19]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-password.png
[20]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-root-install.png
[21]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-login.png
[22]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-no-ip.png
[23]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-network-scripts.png
[24]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-noboots.png
[25]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-service-network-restart.png
[26]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-ping.png
[27]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-remote-host.png
[28]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-ssh.png
[29]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-lang-confusion.png
[30]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-language-before.png
[31]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-language-after.png
[32]: https://raw.githubusercontent.com/PGzxc/images/master/blog-images/centos-local-shengxiao.png
