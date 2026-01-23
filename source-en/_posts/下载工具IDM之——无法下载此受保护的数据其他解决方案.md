---
title: 下载工具IDM之——无法下载此受保护的数据其他解决方案
categories:
  - 工具
  - 下载
tags:
  - IDM
abbrlink: f29b96e8
date: 2021-02-09 16:52:20
---
## 一 现象描述

在使用IDM进行直播流数据下载时，可能会显示如下信息：

![][1]
<!--more-->

## 二 解决办法

### 2.1 [使用ffmpeg](http://www.ffmpeg.org/download.html)

下载配置ffmpeg后，使用下面的指令合成视频

```
ffmpeg -i http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8 -c copy cctv1.mp4
```

### 2.2  [N_m3u8DL-CLI](https://github.com/nilaoda/N_m3u8DL-CLI) 
![][2]

N_m3u8DL-CLI_v2.9.5.exe打开后，直接copy直播流地址，并回车进行下载
N_m3u8DL-CLI_v2.9.5_with_ffmpeg_and_SimpleG.zip：选择下载目录后，点击go进行下载
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/idm-download-error-protect.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/idm-m3u8-cli-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/idm-m3u8-imple-down.png