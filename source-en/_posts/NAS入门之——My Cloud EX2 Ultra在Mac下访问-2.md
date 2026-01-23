---
title: NAS入门之——My Cloud EX2 Ultra在Mac下访问(2)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2 Ultra
abbrlink: a20c3947
date: 2020-03-08 08:37:24
---
## 一 概述

上一篇博客介绍了Windows10系统下添加My Cloud EX2 Ultra访问时，通过网络临近添加失败的解决方案(其他低版本及Windows 7可以通过网上邻居直接添加)，本文介绍在Mac系统下如何添加My Cloud EX2 Ultra网络连接。  

<!--more-->

## 二 设置连接过程及切换访客模式

* 依次点击：访达——>网络——>从网络设备列表中选取相应的网络设备(如My Cloud EX2 Ultra)

  ![][1]
  
* My Cloud EX2 Ultra如果开启了：共享——>公共，Mac系统会以访客方式连接，并显示连接后的文件夹
	![][2]
	
* 点击`连接身份`，弹出连接身份对话框，选择`注册用户`模式，并输入My Cloud EX2 Ultra中事先添加的用户和密码
  ![][3]
  
* 切换到`注册用户`模式登陆后，文件夹到数量跟着变化(public,smartware,Time MacchineBackup)
  ![][4]
  
* 在：访达——>位置处，也会显示连接的My Cloud EX2 Ultra，选择某个文件夹，右键在新标签页中打开

  ![][5]
* Mac 桌面会显示打开此文件夹的磁盘影射，双击此磁盘，可以直接操作文件或文件夹
	![][6]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-mac-net-open.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-mac-share-setting.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-mac-switch-login.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-mac-login-admin.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-mac-public-open-tag.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-mac-public-yingshe.png