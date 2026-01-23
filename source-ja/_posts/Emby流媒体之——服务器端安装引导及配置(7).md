---
title: Emby流媒体之——服务器端安装引导及配置(7)
categories:
  - 开发
  - J-NAS
  - Emby
tags:
  - Emby
abbrlink: 97bd7fc4
date: 2024-09-02 08:54:00
---
## 一 概述

* Emby安装引导
* Emby登录
* Emby添加媒体库

<!--more-->

## 二 Emby安装引导

1-Emby安装完成后，跳转到安装引导界面(选择首选语言)

网页

```
http://localhost:8096/web/index.html?start=wizard#!/wizard/wizardstart.html
```

图示

![][1]

2-下一页，创建用户信息

![][2]

3-设置媒体库(跳过，稍后设置)

![][3]

4-元数据语言设置

![][4]

5-配置远程访问

![][5]

6-配置使用许可

![][6]

7-引导设置完成

![][7]

## 三 Emby登录

1-引导完成后，跳转到登录界面

![][8]

2-输入用户名和密码进行登录

![][9]

3-登陆完成后，主界面视图

![][10]

## 四 Emby添加媒体库

### 4.1 进入控制台

1-点击右侧的设置图标，进入控制台

![][11]

2-控制台页面

![][12]

### 4.2 媒体库设置

1-点击左侧的`媒体库`切换到`媒体库`选项卡

![][13]

2-点击`新媒体库`弹出新媒体库对话框，进行新媒体设置

1-选择内容类型(本次选择`电视节目`)，显示名称可修改

![][14]

2-文件夹(点击+号，选择文件夹路径)

![][15]

3-媒体库设置(其他进行相应设置)

![][16]

### 4.3 媒体削刮

1-点击完成后，显示削刮进度

![][17]

2-电视节目媒体墙显示

![][18]

3-节目详情

![][19]

### 4.4 播放设置

切换到`播放`标签，设置播放相关属性(网络建议选最大、音频选中文简体、自动播放下一集等)

![][20]

## 五 参考


* [知乎—群晖nas如何安装emby](https://zhuanlan.zhihu.com/p/622800596)



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-welcome-1.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-userinfo-2.png
[3]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-media-3.png
[4]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-metadata-4.png
[5]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-remote-5.png
[6]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-agree-6.png
[7]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-start-finish-7.png
[8]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-login-8.png
[9]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-login-info-9.png
[10]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-home-10.png
[11]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-setting-11.png
[12]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-console-12.png
[13]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-select-13.png
[14]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-category-14.png
[15]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-folder-15.png
[16]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-setting-16.png
[17]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-progreee-17.png
[18]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-tv-18.png
[19]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-detail-19.png
[20]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-emby-7-webui-media-mps-20.png