---
title: Windows应用之——Win10版本激活
categories:
  - 系统
  - Windows
tags:
  - Windows
abbrlink: 7e9840f4
date: 2020-07-31 18:38:21
---
## 一 概述

新安装的系统默认是没有激活的，使用时间只有30天，这时就需要你输入激活码进行激活，本文介绍通过cmd命令行工具执行指令激活Windows系统

<!--more-->

## 二 激活过程

### 2.1 激活方式一

以管理员模式打开cmd
![][1]

在命令行中输入`slmgr.vbs /upk`（弹出窗口显未“已成功卸载了产品密钥”）
![][2]

接着输入`slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX`（弹出窗口提示：“成功的安装了产品密钥”）
![][3]
 
`slmgr /skms zh.us.to` （弹出窗口提示：“密钥管理服务计算机名成功的设置为 zh.us.to”） 
![][4]
  
最后`slmgr /ato`
![][5]
  
激活后的效果
![][6]

### 2.2 激活方式二

* 在命令行中输入`slmgr.vbs /upk`（弹出窗口显未“已成功卸载了产品密钥”）
*  接着输入`slmgr /ipk VK7JG-NPHTM-C97JM-9MPGT-3V66T`（弹出窗口提示：“成功的安装了产品密钥”）
* `slmgr /skms kms.xspace.in` （弹出窗口提示：“密钥管理服务计算机名成功的设置为 zh.us.to”） 
* 最后 `slmgr /ato `





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-active-open-cmd.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-active-slmgr-remove.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-active-ipk-install.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-active-sms-zhusto.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-active-slmgr-ato.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/windows-active-view.png