---
title: JavaWeb开发思维导图之——Nginx(3)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: acb5c82
date: 2024-10-26 09:06:08
---
## 一 概述

* nginx介绍
* nginx安装
* nginx发布项目

<!--more-->

## 二 内容详情

### 2.1  nginx介绍

* 是一款服务器软件

### 2.2 nginx安装

* 上传压缩包:put d:/nginx-1.17.5.tar.gz
* 解压压缩包: tar -zxvf nginx-1.17.5.tar.gz
* 进入解压目录: cd nginx-1.17.5
* 安装依赖环境： yum -y install pcre pcre-devel、yum -y install zlib zlib-devel、yum -y install openssl openssl-devel
* 安装nginx：./configure、make、make install
* 重启nginx服务：./nginx
* 查看nginx服务状态：ps -ef | grep nginx

### 2.3 nginx发布项目

* 在/home下创建一个toutiao项目: mkdir toutiao
* 将项目上传到该目录下:put d:/web.zip
* 解压项目压缩包：unzip web.zip
* 编辑ngnx配置文件:vi /home/nginx-1.17.6/conf/nginx.conf(service/location/root指向)

## 三 思维导图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-nginx-3.png