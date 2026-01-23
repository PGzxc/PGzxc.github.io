---
title: PHP开发之——Windows开发环境搭建之-Apache 安装
categories:
  - 开发
  - G-后端开发
  - PHP
tags:
  - PHP
abbrlink: '93e38218'
date: 2020-11-06 23:51:21
---
## 一 概述

* Apache 服务器和 Tomcat 服务器的区别与联系
* Apache服务器的下载
* 配置 Apache HTTP Server
* 启动Apache HTTP Server
* Apache HTTP Server加入开机启动

<!--more-->

## 二 Apache 服务器和 Tomcat 服务器的区别与联系

Apache与Tomcat都是Apache开源组织开发的用于处理HTTP服务的项目，两者都是免费的，都可以做为独立的Web服务器运行。Apache是Web服务器而Tomcat是Java应用服务器。

### 2.1 Apache：是C语言实现的，专门用来提供HTTP服务

特性：简单、速度快、性能稳定、可配置（代理）

* 主要用于解析静态文本，并发性能高，侧重于HTTP服务；
* 支持静态页（HTML），不支持动态请求如：CGI、Servlet/JSP、PHP、ASP等；
* 具有很强的可扩展性，可以通过插件支持PHP，还可以单向Apache连接Tomcat实现连通；
* Apache是世界使用排名第一的Web服务器。

### 2.2 Tomcat：是Java开发的一个符合JavaEE的Servlet规范的JSP服务器（Servlet容器），是 Apache 的扩展。

特性：免费的Java应用服务器。

* 主要用于解析JSP/Servlet，侧重于Servlet引擎；
* 支持静态页，但效率没有Apache高；支持Servlet、JSP请求；
* Tomcat本身也内置了一个HTTP服务器用于支持静态内容，可以通过Tomcat的配置管理工具实现与Apache整合。

### 2.3 Apache + Tomcat 两者整合后优点

如果请求是静态网页则由Apache处理，并将结果返回；如果是动态请求，Apache会将解析工作转发给Tomcat处理，Tomcat处理后将结果通过Apache返回。这样可以达到分工合作，实现负载远衡，提高系统的性能

## 三 Apache服务器的下载

* [Apache官方下载地址：https://httpd.apache.org/][21]

* 点击官方下载地址打开下载页面，再左侧列表中找到Download选项卡
  ![][1]
  
* 选择要下载的版本和适用于操作系统的版本镜像下载
  ![][2]
  
* 选择下载官方推荐第三方提供的Apache编译后安装文件(apache本身不提供已编译的安装包，只提供源码)
  ![][3]
  
* 选择`Apache Haus`下载页面，根据操作系统选择响应的版本下载

  ![][4]

## 四 配置 Apache HTTP Server

### 4.1  将下载后的文件解压后，放到要安装的位置，项目目录结构如下图

  ![][5]

### 4.2 打开 Apache24\conf 目录下的 httpd.conf，修改配置信息

* 修改 ServerRoot 路径：找到 ServerRoot 修改路径(D:\SoftWare\Apache24为解压后的路径)

  ```
  修改前：
  Define SRVROOT "/Apache24"
  ServerRoot "${SRVROOT}"
  修改后：
  Define SRVROOT "D:\SoftWare\Apache24"
  ServerRoot "${SRVROOT}"
  ```

* 修改端口号

  ```
  修改位置：Listen 80
  ```

* 修改ServerName

  ```
  修改位置：ServerName localhost:80
  ```

## 五 启动Apache HTTP Server

### 5.1 打开dos窗口，定位到httpd.exe路径，输入httpd.exe，并回车(一直闪烁，输入localhost显示正常)

![][6]

### 5.2 端口占用出现的问题及解决版本(如mysql占用443端口)

* 错误信息

  ```
  (OS 10048)通常每个套接字地址(协议/网络地址/端口)只允许使用一次。  : AH00072: make_sock: could not bind to address [::]:443
  (OS 10048)通常每个套接字地址(协议/网络地址/端口)只允许使用一次。  : AH00072: make_sock: could not bind to address 0.0.0.0:443
  AH00451: no listening sockets available, shutting down
  AH00015: Unable to open logs
  ```
  ![][7]
  
* 解决办法

  ```
  在httpd.conf中, 找到加载ssl_module的那一行, 加#号注释掉就好了：# LoadModule ssl_module modules/mod_ssl.so
  ```
## 六 Apache HTTP Server加入开机启动

* 配置path

  ```
  Apache24 E:\Software\Apache24
  path %Apache24%\bin
  ```

* 管理员模式下打开cmd，进入到apache httpd.exe目录下，执行

  ```
  service install httpd.exe
  ```
  ![][8]
  
* 管理员模式下,输入 sc delete httpd，删除已安装服务

  ![][9]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-webpage-download.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-latest-version-windows.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-download-alert.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-httpd-64-download.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-unzip-struct.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-http-service-start.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-error-443.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-service-install.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-apache-service-sc-delete.png
[21]:https://httpd.apache.org/