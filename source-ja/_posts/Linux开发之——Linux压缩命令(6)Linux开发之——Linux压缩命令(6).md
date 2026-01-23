---
title: Linux开发之——Linux压缩命令(6)
categories:
  - 系统
  - Linux
tags:
  - Linux
abbrlink: 4ef34c12
date: 2024-10-21 08:58:00
---
## 一 概述

* gzip
* tar命令
* zip
* bzip

<!--more-->

## 二  内容

### 2.1 gzip

1-gzip命令

* gzip a.txt 压缩一个文件(后缀.gz)
* gzip * 压缩所有文件
* gzip -dv * 解压所有文件

2-gunzip命令

* gunzip * //解压所有文件

### 2.2 tar命令

* tar -cvf a.tar a.txt //将a.txt打包成a.tar
* tar -zcvf b.gz b.txt //将b.txt压缩为b.gz
* tar -zcvf aaa.gz aaa //将aaa文件夹压缩为aaa.gz
* tar -zcvf aaa.gz aaa //将aaa文件夹压缩为aaa.gz
* tar -zxvf aaa.gz //解压aaa.gz

### 2.3 zip

1-zip命令

* zip -q -r aaa.zip aaa //将aaa压缩为aaa.zip

2-unzip命令

* unzip -l aaa.zip //查看aaa.zip中内容
* unzip -d bbb aaa.zip //将aaa.zip解压到bbb

### 2.4 bzip

1-bzip2命令

* bzip2 a.txt //压缩a.txt为a.txt.bz2

2-bunzip2命令

* bunzip2 a.txt.bz2 //解压a.txt.bz2
* bunzip2 -v a.txt.bz2 //解压a.txt.bz2并显示信息


## 三 思维导图

![linux-xmind-6][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-xmind-6.png