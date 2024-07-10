---
title: Ubuntu开发之——设置Mac主题
categories:
  - 系统
  - Ubuntu
tags:
  - Mac主题
abbrlink: bab7a0bc
date: 2020-02-09 10:31:15
---
## 一 概述

本文主要讲述Linux 18.0.4下，将系统设置成高仿Mac。使用到的工具：  

* Linux 18.0.4：Linux 18.0.4及以上系统
* gnome-tweak-tool：主题配置工具(用于设置：主题，图标，背景灯)
* chrome-gnome-shell：浏览器安装扩展User Themes(主题配置中的主题)
* 主题：Sierra-light-solid.tar.xz(主题配置文件)
* 主题图标：MacOSX-cursors.tar.xz和MacOSX-icon-theme.tar.xz
* 壁纸(背景)文件：HighSierra-wallpapers.tar.xz

<!--more-->

## 二 设置后的效果图

![][1]

## 三 软件下载

### 3.1 主题配置工具下载(优化配置)

* 安装主题配置工具(gnome-tweak-tool)

  ```
  sudo apt install gnome-tweak-tool
  ```
### 3.2 User Themes 主题下载及配置
* 安装主题插件，并开启主题

  ```
  sudo apt install chrome-gnome-shell
  ```

* 浏览器安装扩展(将网址https://extensions.gnome.org/复制到火狐浏览器中打开)
![][2]

* 安装User Themes(点击User Themes，进入插件后，将滑块打开)
![][3]

* 安装Dash to Dock(Dock居中显示)
![][4]

### 3.3 主题资源下载

#### 3.3.1 地址

* 主题下载地址：https://www.opendesktop.org/p/1013741/
* 图标下载地址：https://www.opendesktop.org/p/1218021/
* 鼠标下载地址：https://www.opendesktop.org/p/1241071/
* 壁纸下载地址：https://www.pling.com/p/1212719/

#### 3.3.2 下载(以主题下载为例)

* 点击右侧的Download，从下拉列表中选择下载
![][5]

#### 3.3.3 创建主题文件夹(如没有)

* 主题文件夹： usr/share/themes 
* 图标文件夹位置：usr/share/icons 
* 壁纸文件夹位置：usr/share/backgrounds

#### 3.3.4 将主题及图标相应的下载资源解压到对应的文件夹内(sudo 权限-以主题为例，图标，背景类似)

```
sudo tar -xzvf Sierra-compact-light.tar /usr/share/themes/ #因为在Download文件夹内打开终端
```

## 四 优化配置

* 在软件列表或搜索输入框中输入"tweaks"或“优化”，打开优化配置
![][6] 
* 在外观选项卡中，配置主题，背景和锁屏显示
![][7]

* 在扩展选项卡中配置Dock等选项
![][8]

* 其他设置如：登录苹果主题等不再赘述(设置后的效果见开头)

## 五 参考

* [Ubuntu18.04主题更换为 Mac OS high Sierra美化教程][9]
* [Ubuntu18.04（Gnome桌面）主题美化，Mac私人定制][10]
* [所用资源文件-百度网盘][11]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linu-mac-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-extra-user-theme.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-extra-user-theme-on.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-dash-to-dock.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-use-theme-compact-download.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-tweaks-open.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-look-theme-config.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-mac-look-extra-config.png
[9]:https://www.jianshu.com/p/321e15ec863d
[10]:https://blog.csdn.net/zyqblog/article/details/80152016
[11]:https://pan.baidu.com/s/1yCu3GQUTGH8cnAndOHYQ0A