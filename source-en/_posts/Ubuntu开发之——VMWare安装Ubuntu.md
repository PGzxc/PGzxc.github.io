---
title: Ubuntu开发之——VMWare安装Ubuntu
categories:
  - 系统
  - Ubuntu
tags:
  - VMWare
abbrlink: f6328493
date: 2017-12-09 10:37:30
---

现在的很多服务器都是linux系统,作为一名开发人员有必要去了解一下Linux；   
今天主要是在虚拟机VMware上安装Ubuntu   

# 准备  
## 软件  
- securable
- VMware
- Ubuntu 16.04镜像

### 打开securable检测机器是否可虚拟化  
注：Hardvare virtualization是否为yes，有的机器需要从Bios设置开启

![virtualization][1]   
<!--more-->
###  下载安装VMware
注：本文使用vmware为12.5.7，请根据实际情况下载使用

![][2]  
  
### 下载Ubuntu镜像
下载地址：[官方地址][3]，[中文网地址][4]	
版本介绍：  

- Ubuntu桌面操作系统
注：本文以此为例
![ubuntu][27]   
- 优麒麟中文版    
注：不稳定，不建议使用
![kylin][6]   
- Ubuntu Core
注：用于开发物联网设备，无人机等    
![树莓派][7]  
- Ubuntu移动设备     
注：如Ubuntu手机，当然你也可以刷机
![][8]    
- Ubuntu 云    
注：Ubuntu OpenStack 使您能够配置服务器并在 Ubuntu 上创建一个 OpenStack 云
- Ubuntu 服务器    
注： Web应用和服务器应用
# 安装   

## VMware安装和破解     
注：比较简单，可自行百度，安装之后打开如下图   
![][9]   
## Ubuntu安装
- 创建虚拟机   
	注：点击文件->新建虚拟机选项
	![][10]   

- 虚拟机向导选择典型(也可自定义)
	
	![type][11]   

- 下一步选择稍后安装操作系统  

	![][12]   
- 选择操作系统(操作系统选择Linux，版本选择Ubuntu)

	![version][13]   
- 设置虚拟机名称和存放位置  

	![location][14]   
- 设置虚拟机容量个磁盘存储文件类型
	
	![][15]  
- 点击下一步，设置自定义硬件

	![][16]  
打开自义定硬件，设置镜像文件存放位置，确定无误后点击完成  

	![][17]  
- 开启虚拟机

	![开启][18]  
- 安装界面，左侧选择语言(如中文简体)，右侧选择安装

	![install][19]  
- 下一步，选择安装选项  

	![安装选项][20]  
- 选择如何对磁盘进行操作(本文选择默认项)  

	![][21]  
- 选择地区

	![location][22]  
- 选择键盘样式 

	![keyborad][23]  
- 设置用户名和密码

	![user][24]  
- 根据设置安装相应内容

	![process][25]  
- 安装完成后，关闭ubuntu，选择虚拟机设置->将连接改为使用物理驱动器  

	![物理驱动][26]  
- 重新启动

	![][27]  

# 其他

## 安装VMware tools
安装ubuntu后，Ubuntu并未全屏显示，需要安装vmware tools

-  下载vmware tools

	![][28]
- 打开文件，查看vmware tools是否下载完毕   

	![][29]
- 将vmware tools剪切到桌面  

	![][30]
- ALT+Ctrl+T 打开终端，ls列出当前目录，进入桌面

	![][31]
- 执行命令 命令：tar -xzvf  VMwareTools-10.0.6-3595377.tar.gz，解压缩
注：输入VM按TAB键自动输入后面内容

	![][32]
- 进入解压后的目录，执行：sudo ./wmware-install.pl  然后就一直回车了 

	![][33]
- 重启后可以看到ubuntu可以全屏显示，并且可以和本地电脑文件进行拖拽

	![][34]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-support-virtual.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-info.png
[3]: https://www.ubuntu.com/download
[4]: http://cn.ubuntu.com/download/
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu_origin.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/Kylin_ubuntu.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/develop-raspbian.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ubuntu_phone.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/Vmware_installed.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware_file.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_type.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_later.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_version.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_location.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_content.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_self.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_hardvare.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_start.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_start_install.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_install_opt.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_wripe.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_install_location.png
[23]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_install_keyboard.png
[24]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_install_user.png
[25]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_install_process.png
[26]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_cd.png
[27]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vm_finish.png
[28]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmtools_download.png
[29]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmtools_find.png
[30]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmtools-home.png
[31]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmtools_cd_home.png
[32]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmtools_tar.png
[33]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmtools_cd_vm.png
[34]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/vmware-full.png