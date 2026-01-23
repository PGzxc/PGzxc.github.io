---
title: ZyPlayer播放器之——导入在线数据(4)
categories:
  - 开发
  - J-NAS
  - ZyPlayer
tags:
  - ZyPlayer
abbrlink: f415a521
date: 2025-07-21 08:17:21
---
## 一 概述

```
zyfun[zyplayer]是一款免费易用且打造的全功能媒体播放器, 
致力于提供流畅、高效的跨平台娱乐体验。

它基于electron-Vite框架, 结合TDesign组件库和vue3全家桶开发
```

<!--more-->

## 二 准备在线数据

### 2.1 在线数据常用网址

```
鸭先知：https://www.yxzhi.com/14218.html
```

### 2.2 说明

```
-ZyPlayer并不支持所有的TVBox接口格式
-接口验证通过后，方能正常导入
```

## 三 导入在线接口数据

1、打开ZyPlayer后，默认没有数据，界面如下图，点击右上角添加数据

![][1]

2、打开配置页面，切换到`基础配置`，页面滑动到底部找到`数据管理`

![][2]

3、配置数据

| 快捷配置 | ![][3] |
| -------- | ------ |
| 远程导入 | ![][4] |

4、导入后，切换到`影视配置`检测资源可用性

![][5]

5、删除无用资源后，切换到主页，查看影视

![][6]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-4-online-open-empty-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-4-online-data-manager-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-4-online-import-way1-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-4-online-import-way2-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-4-online-check-use-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/zyplayer-4-online-data-show-6.png
