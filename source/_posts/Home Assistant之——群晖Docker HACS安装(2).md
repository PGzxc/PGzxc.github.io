---
title: Home Assistant之——群晖Docker HACS安装(2)
categories:
  - 硬件
  - 智能家居
  - Home Assistant
  - 群晖Docker
tags:
  - Home Assistant
abbrlink: ccc1a0bf
date: 2024-12-28 08:46:35
---
## 一 概述

* HACS是什么？
* HACS能做什么？
* HACS下载
* HACS安装

<!--more-->

## 二 HACS是什么？

* HACS是The Home Assistant Community Store的缩写
* HACS是Home Assistant社区商店
* HACS提供了UI来管理Home Assistant中的自定义元素
* HACS官网：https://hacs.xyz/

## 三 HACS能做什么？

* 帮助您发现新的自定义元素
* 帮助您下载新的自定义元素
* 管理（更新/删除）自定义元素
* 发布您自己的自定义元素存储库并创建存储库或问题跟踪器的快捷方式。

## 四 HACS下载

### 4.1 检查HACS是否满足要求

```
Home Assistant版本2024.4.1或更新版本
```

如下图：依次点击：设置—>关于查看

![][1]

### 4.2 下载HACS(Docker容器方式)

1-进入群晖Container Manager，容器中点击`Home Assistant`，再点击右侧的操作—>打开终端机

![][2]

2-打开终端机后，点击左上角新增，输入bash，新增一个窗口

![][3]

3-HACS下载脚本(若第一条失败，请用第二条指令)

```
wget -O - https://get.hacs.xyz | bash -
wget -O - https://raw.githubusercontent.com/hacs/get/main/get | bash -
```

图示

![][4]

4-hacs下载完成

![][5]

5-回到容器菜单，点击homeassistant容器，右键重启容器

![][6]

## 五 HACS安装

### 5.1 开始添加

1-重启成功后，回到Home Assistant网页中，点击【设置】->【设备与服务】->右下角【添加集成】

![][7]

2-输入框输入hacs

![][8]

3-下一步，勾选如下选项

![][9]

### 5.3 Github授权

1-添加后，弹窗显示授权窗口(打开网址，并赋值HACS码)

![][10]

2-跳转到Github后，显示界面

![][11]

3-将赋值的码填充进入并继续

![][12]

4-使用GitHub进行授权

![][13]

5-github授权成功

![][14]

### 5.3 添加HACS

1-授权成功后，返回Home Assistant页面，弹窗确认

![][15]

2-左侧显示HACS栏，点击查看内容

![][16]

## 六 参考

* [hacs官网](https://hacs.xyz/)
* [什么值得买—Home Assistant社区商店HACS安装](https://post.smzdm.com/p/avpn58o9/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-ver-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-container-open-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-terminal-new-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-download-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-download-finish-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-restart-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-add-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-search-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-agree-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-auth-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-github-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-github-fill-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-github-author-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-github-agree-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-add-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-2-hacs-left-16.png