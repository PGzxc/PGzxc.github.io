---
title: NAS入门之——KODI-挂载本地视频资源(2)
categories:
  - 开发
  - J-NAS
  - Kodi
tags:
  - Kodi
abbrlink: 2343f40b
date: 2023-04-02 22:27:40
---
## 一 概述

* 准备工作
* KODI未挂电影前视图
* KODI挂载本地电影资源

<!--more-->

## 二 准备工作

### 2.1 本地视频资源

![][1]
## 三 KODI未挂电影前视图

![][2]

## 四 KODI挂载本地资源

### 4.1 添加本地视频

打开Kodi,左侧菜单找到“视频”，右侧从“类别”里选择“文件”
![][3]
在“视频”文件夹中，选择“文件选项”
![][4]
“添加视频”-“浏览”，找到视频文件夹所在位置
![][5]
在弹出的窗口中，选择`浏览`按钮
![][6]
找到本地视频资源路径，并添加
![][7]

### 4.2 设置视频内容

添加完成后，弹出`设置内容`对话框
![][8]
设置添加视频的归属目录(电影)
![][9]
配置电影搜刮器
![][10]

注意：搜刮器可能无法搜索到电影内容，要修改本机或者前端路由器的Host

```
#kodi
52.222.158.31 image.tmdb.org
52.222.174.75 api.tmdb.org
18.160.41.44 api.themoviedb.org
```

### 4.3 配置完成后，电影信息

返回主页—>电影，查看视频信息

![][11]

## 五 参考

* [Kodi中文网—Kodi如何添加视频源 将电影剧集添加到资料库](http://www.kodiplayer.cn/course/2866.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-no-resource.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-choice-movie.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-file.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie-look.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie-view.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie-set.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie-set-category.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie-database.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-2-local-movie-add-movie-infoview.png
