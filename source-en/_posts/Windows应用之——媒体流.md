---
title: Windows应用之——媒体流
categories:
  - 系统
  - Windows
tags:
  - 媒体流
abbrlink: 78b4a606
date: 2023-02-23 14:54:34
---
## 一 概述

* Windows提供了媒体流功能，启用后，网络位置显示一个类似于NAS的媒体流网盘
* 在局域网内部，通过手机可以访问此媒体流网盘的内容

<!--more-->

## 二  window启用媒体流

### 2.1 媒体流查看路径

点击`开始`，在弹出的搜索框中输入`控制面板`

![][1]

在控制面板页面，选择`网络和Internet`

![][2]

在打开的页面，选择`网络和共享中心`

![][3]
进入`网络和共享中心`
![][4]

### 2.2 查看媒体流是否开启

在`网络和共享中心`，点击左侧的`媒体流式处理选项`

![][5]

在打开的页面，查看媒体流是否开启

![][6]

### 2.3 媒体流开启

在`网络和共享中心`，点击左侧的`更改高级共享设置`

![][7]

打开：高级共享设置——>所有网络——>媒体流，下的选择媒体流选项

![][8]

点击`启用媒体流`
![][9]
打开`媒体流选项`，配置媒体库名字，显示位置等
![][10]
此时，我的电脑——>网络位置，显示此媒体流
![][11]
双击，打开媒体流文件夹
![][12]

### 2.4 媒体流对应的实际文件位置

![][13]

如上图所示：

* 媒体流视频——>我的电脑视频
* 媒体流图片——>我的电脑图片
* 媒体流音乐——>我的音乐

## 三 手机如何查看媒体流

### 3.1 通过网上邻居

|         |         |         |
| ------- | ------- | ------- |
| ![][14] | ![][15] | ![][16] |

### 3.2 通过带有SMB功能的播放器

![][17]

## 四 关闭媒体流
选择`全部阻止`，点击确定保存
![][18]

## 五 参考
* [媒体流设置(媒体流启用)](http://www.ekangw.net/a/diannaojiqiao/2022/1113/565594.html)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-stream-media-control-search.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-internet.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-internet-share.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-internet-share-center.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-deal-option.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-is-open.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-share-change.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-internet-all.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-open-media.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media--open-set.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-internet-position-show.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media--folder.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-nas-folder-relate.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-phone-1.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-phone-2.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-phone-3.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-phone-4.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-windows/windows-steam-media-stop.png