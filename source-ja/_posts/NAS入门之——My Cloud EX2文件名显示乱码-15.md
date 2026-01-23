---
title: NAS入门之——My Cloud EX2文件名显示乱码(15)
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
abbrlink: adb4c73
date: 2024-12-12 10:28:52
---
## 一 现象

音乐文件名中文，标签却显示异常

![][1]

<!--more-->

## 二 原因

### 2.1 NAS查看原内容

选择文件—>右键—>编辑元数据

![][2]

### 2.2 文件编码

![][3]

说明:

* 中文编码格式: 936 中国 - 简体中文(GB2312)
* UTF-8编码格式：65001 Unicode (UTF-8)

## 三 软件准备

音乐标签pc版：https://www.cnblogs.com/vinlxc/p/11347744.html

音乐标签是一款可以编辑歌曲的标题，专辑，艺术家，歌词，封面等信息的应用程序

## 四 修改

### 3.1 添加乱码目录

![][4]

### 3.2 清除文件标签

全选后，右键清除标签

![][5]

清除标签完成

![][6]

### 3.3 添加新标签

![][7]

添加标签完成

![][8]

### 3.4 修改完成后刷新NAS效果

![][9]

## 五 参考

* [音乐标签pc版](https://www.cnblogs.com/vinlxc/p/11347744.html)
* [群晖Emby音乐乱码修正](https://post.smzdm.com/p/ao904w3n/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-filename-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-936-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-add-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-del-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-del-finish-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-add-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-add-finish-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-nas/nas-ex2-luanma-nas-9.png
