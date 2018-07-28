---
title: CentOS开发之——设置静态ip
date: 2018-07-28 16:09:42
categories: [系统,CentOS]
tags: [静态ip]
---
# 前言
安装好的CentOS系统，默认是动态ip，下次启动后ip地址有可能就变了。而应用软件有些是需要设置固定ip地址的，本文主要讲述CentOS系统设置静态ip。      

<!--more-->

# 设置静态ip
1. 使用SSH Secure Shell 连接到CentOS远端。 
![][1]  
2. 输入命令： ls /etc/sysconfig/network-scripts/查看网卡列表
![][2]
3. 打开ifcfg-ens33
![][3] 
4. 配置ifcfg-ens33
	
	//配置静态IP，网关，子网掩码    
	IPADDR=192.168.174.130   
	NETMASK=255.255.255.0   
	GATEWAY=192.168.86.2   
	取消networkmanager 管理   
	NM_CONTROLLED=no   

	修改前   
	![][4]   
	修改后   
	![][5]  
5. 保存修改   
![][6]   




[1]: http://pcj4vn4xs.bkt.gdipper.com/ip-connect.png
[2]: http://pcj4vn4xs.bkt.gdipper.com/ip-network-script.png
[3]: http://pcj4vn4xs.bkt.gdipper.com/ip-ens33-open.png
[4]: http://pcj4vn4xs.bkt.gdipper.com/ip-modify-before.png
[5]: http://pcj4vn4xs.bkt.gdipper.com/ip-modify-after.png
[6]: http://pcj4vn4xs.bkt.gdipper.com/ip-save-yes.png