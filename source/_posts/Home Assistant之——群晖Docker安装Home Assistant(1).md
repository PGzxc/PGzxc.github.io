---
title: Home Assistant之——群晖Docker安装Home Assistant(1)
categories:
  - 硬件
  - 智能家居
  - Home Assistant
  - 群晖Docker
tags:
  - Home Assistant
abbrlink: fc98048f
date: 2024-12-27 09:29:25
---
## 一 概述

* Docker加速
* 下载Home Assistant镜像
* 创建Home Assistant容器
* 启动Home Assistant

<!--more-->

## 二 Docker加速

```
https://hub.geekery.cn
https://docker.unsee.tech
```

## 三 下载Home Assistant镜像

1-打开Container Manager，切换到注册表，搜索`Home Assiatant`

![][1]

2-在要下载的镜像上右键下载

![][2]

3-确定后显示下载进度

![][3]

4-下载完成后，镜像显示

![][4]

## 五 创建Home Assistant容器

1-在映像已下载双击或容器选项卡新建

![][5]

2-弹出窗口，进行设置(选择镜像和启用自动重新启动)

![][6]

3-高级设置

3-1 存储控件设置—>添加文件夹，选择docker/homeassistant

![][7]

3-2 homeassistant添加映射`/home`及文件读写权限

![][8]

3-3 添加环境变量

```
variable = TZ
value = Asia/Shanghai
```

图示

![][9]

3-4 高级设置—>网络，选择`host`

![][10]

3-5 摘要显示配置信息， 确认无误后，点击完成

![][11]

## 六 启动Home Assistant

### 6.1 Home Assistant初始化

1-输入网址，进入homeassistant初始化流程(192.168.1.4换成自己的ip)

```
http://192.168.1.4:8123/
```

图示

![][12]

2-创建用户信息

![][13]

3-家的位置(下一步)

![][14]

4-所在国家

![][15]

5-选择兼容设备

![][16]

6-点击完成后，进入主界面

![][17]

### 6.2 账户设置

1-点击左侧的设置，右侧列表选择人员

![][18]

2-如下图，可添加人员或对已有人员修改

![][19]

## 七 参考

* [CSDN—群晖NAS本地使用Docker搭建Home Assistant](https://blog.csdn.net/m0_70980326/article/details/141684502)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-search-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-download-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-download-pro-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-import-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-setting-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-folder-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-reflect-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-path-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-host-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-image-finish-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-welcome-12.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-user-create-13.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-home-14.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-country-15.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-device-16.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-home-17.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-setting-18.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ha/ha-1-setting-user-19.png