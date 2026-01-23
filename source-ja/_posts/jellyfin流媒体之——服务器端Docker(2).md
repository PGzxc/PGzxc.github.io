---
title: jellyfin流媒体之——服务器端Docker(2)
categories:
  - 开发
  - J-NAS
  - Jellyfin
tags:
  - Jellyfin
abbrlink: 96fbd336
date: 2024-08-15 09:05:59
---
## 一 概述

* 准备条件
* Docker下载安装
* jellyfin容器安装
* jellyfin配置
* jellyfin教程
* jellyfin容器再启动

<!--more-->

## 二 准备条件

* Windows 电脑
* VPN(下载及登录Docker及容器)

## 三 Docker下载安装

### 3.1 Docker下载

1-下载地址

```
https://www.docker.com/get-started/
```

2-打开官网，选择对应系统下载

![][1]

### 3.2 Docker安装

双击运行后，打开Docker界面如下

![][2]

## 四 jellyfin容器安装

1-打开Docker搜索框，输入`jellyfin`，在搜索结果页面选择并点击pul拉取

![][3]

2-如图所示，拉取完成后点击左侧的`容器`，查看已下载容器

![][4]

## 五 jellyfin配置

1-点击容器右侧的`>`图标，打开启动配置

![][5]

2-运行配置

```
1-Container name(容器名-方便查看，可忽略)
jellyfin
2-Ports(端口号)
8096 //设置0-端口随机
3-Volumes
/path/to/config:/config
/path/to/cache:/cache
I:\视频:/video
```

图示如下

![][6]

说明：

* /video：选择本地硬盘路径(点击`...`选择路径，可添加多个硬盘路径)
* /config、/cache选择Docker文件路径

3-点击图示位置，打开网页

![][7]

4-登录后主页显示

![][8]

## 六 jellyfin教程

1-点击左侧的`媒体库`，切换到媒体库页面

![][9]

2-添加媒体库时，使用`/video`指定的内容

![][10]

3-添加媒体库`电影`时如下

![][11]

4-扫描完成后，新增`电影`效果

![][12]

## 七 jellyfin容器再启动

![][13]

说明：

* 通过Images配置后，启动后的实例位于Containers下
* Containers下显示所有实例及当前状态
* 下次重启时，点击`>`按钮，并点击Port栏启动Web页面

## 八 参考

* [Docker官网](https://www.docker.com/get-started/)
* [Jellyfin-容器](https://jellyfin.org/docs/general/installation/container/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-install-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-pull.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-images.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-run.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-open.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-home.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-add-media.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-add-media-video.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-add-movie.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-config-add-finish.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/jellyfin-2-docker-jullyfin-restart.png