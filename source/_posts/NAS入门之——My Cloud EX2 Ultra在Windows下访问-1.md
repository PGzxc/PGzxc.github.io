---
title: NAS入门之——My Cloud EX2 Ultra在Windows下访问(1)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2 Ultra
abbrlink: 1153d8ad
date: 2020-03-04 17:47:58
---
## 一 概述
Windows 10系统下，通过网上邻居的方式添加My Cloud EX2 Ultra文件访问时，无法完成添加操作。MyCloud或WD网络设备的名称在Windows 10 系统下无法完成加载  
![][1]
<!--more-->

## 二 原因
* Windows 10v1709及更高版本的“网络浏览”功能已被禁用
* 通过：设置——>系统——>关于(查看当前电脑系统版本windows 10 专业版 1909)

![][2]

## 三 如何映射驱动器
* 到[西部数据官网][11]，根据设备名称获取网络路径

  ```
  如：My Cloud EX2 Ultra 的网络路径为：\\MYCLOUDEX2ULTRA
  ```
![][3]
* 打开文件浏览，将网络路径复制到文件窗口中
![][4]
* 点击回车后，打开后显示WD网络驱动器中的文件
![][5]
* 在要映射的文件夹中点击，添加映射驱动器
![][6]
* 添加完成后，如下图所示(可以按照本地磁盘的操作类似执行操作)
![][7]

## 四 网络访问

### 4.1 输入如下地址

```
http://mycloudex2ultra/
```

### 4.2 输入管理员用户名和密码

```
管理员用户名：admin
密码：
```

## 五 参考

* [如何在Windows 10上映射WD网络驱动器][11]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-ext2-net-add-no.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-ext2-windows-version.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-guanwang-name-path.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-ext2-windows-path-fill.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-ext2-net-folder-open.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-ext2-windows-public-yingshe.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mycloud-ext2-windows-add-finish.png

[11]:https://support-en.wd.com/app/answers/detail/a_id/25436/h/p2#subject2