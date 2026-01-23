---
title: NAS入门之——My Cloud EX2安装Docker(13)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: a4b46390
date: 2024-11-10 22:58:51
---
## 一 概述

* docker插件下载
* ex2安装docker
* 出现的问题

<!--more-->

## 二 docker插件下载

访问WDCommunity/wdpksrc下载docker插件

```
https://github.com/WDCommunity/wdpksrc/releases
```

图示

![][1]

## 三 ex2安装docker

切换到应用，手动安装应用，选择docker文件，安装后显示如下

![][2]

## 四 出现的问题

点击配置，打开docker配置页面,无法访问

![][3]

参考issues: https://github.com/WDCommunity/wdpksrc/issues/56

![][4]

## 五 参考

* [Github-JediNite/wdpksrc](https://github.com/JediNite/wdpksrc)
* [Github-WDCommunity/wdpksrc](https://github.com/WDCommunity/wdpksrc)
* [西部数据官方: WD community](https://wdcommunity.com/)
* [西部数据-github-wdpksrc](https://github.com/WDCommunity/wdpksrc/releases)
* [wd-ultra-mycloud-owncloud](https://github.com/igormcoelho/wd-ultra-mycloud-owncloud)
* [Entware](https://github.com/Entware/Entware)


[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-docker-download-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-docker-install-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-docker-refuse-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-docker-issues-4.png