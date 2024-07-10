---
title: 错误解决之——IDE控制台乱码
categories:
  - 开发
  - M-错误
  - 乱码
tags:
  - 乱码
abbrlink: 6f6e4a3d
date: 2020-01-17 22:06:43
---
## 一 现象

IDE控制台调试时，打印信息出现乱码，现象如下：  
![][1]
<!--more-->

## 二  排查(是否设置文件为UTF-8)

* 依次打开：File->Settings->Editor->File Encodings，检查Global Encoding,Project Encoding和Default encoding for properties files是否设置为UTF-8
![][2]
* 设置后，重新编译项目并查看日志输出

## 三 其他办法

* 定位到IDEA安装目录中bin文件夹下的idea.exe.vmoptions和idea64.exe.vmoptions两个文件
![][3]

* 分别在这两个文件内容的末尾添加`-Dfile.encoding=UTF-8`
![][4]
* 重启IDE后， 重新编译，并查看输入信息(乱码显示正常)
![][5]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/error-idea-luanma-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/error-idea-utf8-check.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/error-idea-vmoptions.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/error-idea-vmoptions-dfileencoding.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/error-idea-luanma-correct.png