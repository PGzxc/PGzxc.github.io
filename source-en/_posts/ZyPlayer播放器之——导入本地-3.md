---
title: ZyPlayer播放器之——导入本地(3)
categories:
  - 开发
  - J-NAS
  - ZyPlayer
tags:
  - ZyPlayer
abbrlink: 94ed7b99
date: 2025-07-20 09:40:23
---
## 一 概述

```
zyfun[zyplayer]是一款免费易用且打造的全功能媒体播放器, 
致力于提供流畅、高效的跨平台娱乐体验。

它基于electron-Vite框架, 结合TDesign组件库和vue3全家桶开发
```

<!--more-->

## 二 准备本地数据

### 2.1 准备本地json数据

```
dirtyTVBox：https://gitlab.com/vios0810/dirtytvbox
资源2：https://raw.githubusercontent.com/supermeguo/BoxRes/main/Myuse/catcr.json
```

### 2.2 下载数据源

```
打开dirtytvbox后，只下载如图所示xxx.JSON文件
```

![][1]

## 三 导入本地数据

1、打开ZyPlayer后，默认为空，点击右上角的设置按钮
![][2]

2、打开配置页面，选择左侧的`基础配置`，页面拉到底部，找到`数据管理`

![][3]

3、弹出`数据管理`窗口，配置`数据导入`，选择本地导入并点击`追加`方式

![][4]

4、左侧切换到`影视配置`选项卡，选中数据，点击左上方的检测按钮，检测完成后，可用资源打开状态

![][5]

5、删除无用资源后，切换到主页影视选项卡，显示数据

![][6]




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-3-tv-download-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-3-open-empty-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-3-data-manager-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-3-data-update-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-3-data-check-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-3-data-show-6.png
