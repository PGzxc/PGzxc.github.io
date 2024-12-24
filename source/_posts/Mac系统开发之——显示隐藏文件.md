---
title: Mac系统开发之——显示隐藏文件
categories:
  - 系统
  - Mac
tags:
  - 显示隐藏文件
abbrlink: 1bcda7ac
date: 2019-09-01 18:56:26
---
# 前言

对于不熟悉Mac系统的人，很难找到隐藏的文件或文件夹。本文主要讲述Mac系统下如何查看或显示某个文件或文件夹。

<!--more-->

## 一 通过快捷键查看

* 1.1 打开访达，在访达左侧点击隐藏文件所在的目录
	![][1]
* 1.2 在隐藏文件所在的目录下按键盘上面的shift+command+.（文件名前缀带点或者文件夹显示淡蓝色的都是隐藏文件）	
	![][2]
* 将显示的隐藏文件或文件夹再次隐藏的话再次按shift+command+.
	![][1]

## 二 通过终端方式查看

* 2.1 打开终端，进入到隐藏文件夹里面(本文在根目录下)
	![][3]
* 2.2 在终端内输入：ls -a 或 ls -al，显示本目录下的所有文件
	![][4]
	




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-hidden-show-finder-file-open.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-hidden-show-finder-file-show.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-hidden-terminal-input-dir.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-hidden-terminal-show.png

