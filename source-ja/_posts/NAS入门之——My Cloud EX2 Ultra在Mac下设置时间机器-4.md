---
title: NAS入门之——My Cloud EX2 Ultra在Mac下设置时间机器(4)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2 Ultra
abbrlink: ec09a736
date: 2020-03-08 08:43:12
---
## 一 使用时间机器的目的

您可以使用 Mac 的内建备份功能“时间机器”对您的所有文件进行自动备份，包括应用、音乐、照片、电子邮件、文稿和系统文件。如果您拥有备份，当原始文件从 Mac 永久性删除或者 Mac 中的硬盘（或 SSD）被抹掉或更换时，可以[从备份恢复文件](https://support.apple.com/zh-cn/HT203981)

<!--more-->

## 二 创建“时间机器”备份的条件

- 连接到 Mac 的外置驱动器，例如 USB、雷雳或 FireWire 驱动器
- 连接到 AirPort Extreme 基站（802.11ac 机型）或 AirPort 时间返回舱的外置驱动器
- AirPort 时间返回舱
- 共享为“时间机器”备份目标位置的 Mac
- 支持通过 SMB 进行“时间机器”备份的联网储存 (NAS) 设备(本文使用My Cloud EX2 Ultra)

## 三 创建“时间机器”备份

* 选取苹果 () 菜单 >“系统偏好设置”，然后点按“时间机器” 

  ![][1]
* 打开如图所示窗口后，点按“选择备份磁盘”
	![][2]
* 从可用磁盘列表中选择您的外置驱动器。然后选择“加密备份”（推荐）并点按“使用磁盘”
	![][3]
* 设置完成后，开始备份
	![][4]

## 四 参考
* [使用“时间机器”备份您的 Mac][11]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-open.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-timebackup-click.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-disk-choice.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/nas-mycloudex2-ultra-setup-finish.png

[11]:https://support.apple.com/zh-cn/HT201250