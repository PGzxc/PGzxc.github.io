---
title: 虚拟机之——Vimware卸载时出现严重错误并回滚
categories:
  - 工具
  - 虚拟机
tags:
  - Vmware
abbrlink: bcd45530
date: 2020-01-11 23:03:00
---
## 一 现象
把Vmare安装目录删除，再通过控制面板执行卸载操作时，会出现回滚无法卸载的现象，本文将介绍此种情况下如何操作删除已安装的Vmware   
![][1]

<!--more-->

## 二 处理

* 打开服务选项  ：win + R  然后在跳出来的编辑框 键入  services.msc   然后回车
  ![][2]

* 执行sd delete 删除服务

  ```
  sc delete VBoxSDS
  ```
  ![][3]

* 执行 xxx.exe --extract命令，解压得到msi文件(用户目录/AppData/Temp目录下)

  ```
  D:\Tools\模拟器\VirtualBox-6.0.4-128413-Win.exe --extract
  ```

![][4]
* 打开C:\Users\Administrator\AppData\Local\Temp\VirtualBox可以查看.msi文件
![][5]
* 打开控制面板，程序和功能，找到Virtualbox，执行卸载和修复
![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/virtualbox-uninstall-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/virtualbox-system-service.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/virtual-sc-delete.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/virtualbox-extract.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/virtualbox-loca-temp-file.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/virtualbox-repair.png