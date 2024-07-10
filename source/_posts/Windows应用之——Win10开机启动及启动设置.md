---
title: Windows应用之——Win10开机启动及启动设置
categories:
  - 系统
  - Windows
tags:
  - 开机启动
abbrlink: d39f8f67
date: 2018-08-19 09:13:17
---
# 前言
接触过Windows的朋友肯定知道，一些系统服务软件、杀毒软件(360、腾讯电脑管家)、社交软件(QQ)等安装过后，下次都会开机启动，你知道是什么原因么，我们如何禁止它们开机启动呢。通过阅读本文，相信你会知道答案。  

<!--more-->


# 软件开机启动
1. 按住Win+R，在运行输入框中输入：shell:startup，回车   
![][1]
 
2. 打开后，如图     
![][2]  

3. 将要启动的软件快捷方式拖放到上图文件夹中(如图，本文将一个仿Dock软件拖放到开机启动文件夹)
	
	![][3] 
	 
4. 下次开机后，可以看到RocketDock已经开机启动

# 开机启动设置
1. 按住Win+R,在运行输入框中输入msconfig打开系统配置  
![][4]  
2. 选择启动选项卡  
![][5]  
3. 再点击"打开任务管理器   
![][6]  
4. 任务管理器自动切换到"启动"选项页  
![][7] 
5. 选择要禁用的程序,右键选择禁用就可以了  
![][8]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-shell-startup.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-shell-open.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-move-startup.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-open-msconfig.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-msconfig-start.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-msconfig-open.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-manager-start.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-manager-jinyong.png