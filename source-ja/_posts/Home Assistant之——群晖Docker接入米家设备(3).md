---
title: Home Assistant之——群晖Docker接入米家设备(3)
categories:
  - 硬件
  - 智能家居
  - Home Assistant
  - 群晖Docker
tags:
  - Home Assistant
abbrlink: 38edaabd
date: 2024-12-29 09:21:49
---
## 一 准备条件

* Home Assistant+HACS
* 小米账号
* 小米设备

<!--more-->

## 二 接入米家设备

### 2.1 下载组件

1-点击左侧的HACS，输入框中输入`xiaomi`，结果列表选择【xiaomi MIoT】和【xiaomi Gateway3】

![][1]

2-右侧的三个点按钮，选择下载

![][2]

3-图示下拉可选择版本，本文默认下载

![][3]

4-下载完成的，列在Pending restart列，等待重启

![][4]

### 2.2 重启Home Assistant

切换到左侧设置选显卡，右上角的三个点，选择重启Home Assistant

![][5]

### 2.3 集成米家设备

1-切换到左侧的设置—>集成选项页面，`添加集成`

![][6]

2-弹出框，输入xiaomi

![][7]

3-点击后，选择操作方式(本次选择账号集成)

![][8]

4-输入小米账户

![][9]

## 三 参考

* [什么值得买—添加第一个米家设备](https://post.smzdm.com/p/avpn58o9/)
* [什么值得买—Home Assistant社区商店HACS安装，并集成米家所有设备](https://post.smzdm.com/p/avpn58o9/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-mi-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-mi-download-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-mi-ver-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-pending-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-restart-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-setting-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-setting-search-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-setting-deal-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-docker-3-hacs-mi-account-9.png