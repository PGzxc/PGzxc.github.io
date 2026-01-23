---
title: Ubuntu开发之——访问权限限制下安装VMwareTools
categories:
  - 系统
  - Ubuntu
tags:
  - VMware Tools
abbrlink: 6815021d
date: 2018-10-12 23:04:35
---

# 前言
平时使用的电脑一般是Windows的，但是开发中避免不了使用Linux系统；常用的做法是在虚拟机上安装Ubuntu系统，为了扩展Ubuntu的性能，我们会选择安装VMwareTools，之后便可以全屏显示、虚拟机与本地电脑之间拖动复制文件等操作。    


本文之前讲过Linux开发之——安装VMware-Tools，但是最近在安装VMwareTools时却出现了问题，本文将为你介绍VMwareTools安装过程中出现的问题及相应的解决策略。
   
注：     
1.  之前使用的vmwaretools版本是10.1.6  
2. 本文使用的vmwaretools版本是10.2.5 


<!--more-->

# Ubuntu安装 VMware Tools
## 下载VMware Tools
![][1]  
## 查看下载的VMwareTools文件权限    
注：此版本(10.2.5)下文件的访问权限为只读，无法进行移动复制操作           
![][2]  

## 将VMwareTools解压到指定目录
### 将VMwareTools解压到mnt下

	sudo tar xzxf vmwaretools文件名 -C 解压到的文件夹路径    

![][3]  
   
### 查看解压后的文件
![][4]  
## 进入解压目录 
![][5] 
## 执行安装指令
	sudo ./vmare-install.pl     

![][6]  
## 出现如下文字Enjoy，VMware安装完成
![][7]  
    
# 总结
关于VMwareTools的安装，之前的文章已经讲述过，随着版本的升级，肯能会出现一些新的情况，随机应变；  
  
  
   


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm-tools-install.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-operate_authority.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-tar-xzvf.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-etc-file.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-install-into.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-install-cmd.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-enjoy.png