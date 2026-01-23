---
title: NAS入门之——KODI-挂载NAS电视剧视频资源(3)
categories:
  - 开发
  - J-NAS
  - Kodi
tags:
  - Kodi
abbrlink: '34977472'
date: 2023-04-02 22:28:36
---
## 一 概述

* 准备工作
* KODI未挂载电视剧前视图
* KODI挂载NAS电视剧资源

<!--more-->

## 二 准备工作

### 2.1 NAS(Mycloudex2)访问

访问路径(通过西部数据官网查询)：

```
\\MYCLOUDEX2ULTRA
```

用户名和密码

### 2.2 电视剧资源+命名规则

通过第三方`字幕库`，根据下载后的字幕库名字修改电视剧视频资源名
![][1]

## 三 未挂载电视剧前界面视图
![][2]


## 四 KODI挂载NAS电视剧资源

### 4.1 添加视频

进入KODI后，左侧选择`视频`选项

![][3]

`类别`选择`文件`选项，选择`添加视频`弹出添加视频对话框

![][4]

### 4.2 链接NAS

点击`浏览`按钮，在`浏览新共享`列表中，选择`添加网络位置`
![][5]
在打开的对话框中，选择协议(SMB)，输入`服务器名称`、用户名及密码
![][6]

### 4.3 添加NAS电视剧资源
在弹出的对话框中，添加NAS视频源
![][7]
点击`确定`，下一步设置内容
![][8]
点击`设置`，设置`常规`、`评分`等内容
![][9]

### 4.4 扫描视频内容

在添加的电视剧上右键，选择`扫描新的内容`，右上角显示进度
![][10]
扫描完成后，返回主页，找到`剧集`，查看剧集信息
![][11]

## 五 参考

* [Kodi中文网—Kodi如何添加视频源 将电影剧集添加到资料库](http://www.kodiplayer.cn/course/2866.html)
* [字幕库](https://so.zimuku.org/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-named.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-no-view.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-select.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-dialog.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-net.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-net-set.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-resource.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-set-content.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-resource-commond.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-resource-scan.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-kodi-3-nas-movies-add-resource-finish.png
