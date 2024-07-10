---
title: Mac系统开发之——安装Tomcat
categories:
  - 系统
  - Mac
tags:
  - Tomcat
abbrlink: cde998ae
date: 2020-02-12 21:27:00
---
## 一 概述

本文介绍在Mac系统下下载安装及配置tomcat

<!--more-->

## 二 软件下载及安装

* [官方下载地址][1]
![][11]
* 解压后移动到`/usr/local`路径下
![][12]

## 三 配置环境变量
* 进入当前用户目录

  `cd ~/`

* 创建.bash_profile文件(如果没有.bash_profile)

  `touch .bash_profile`

* 之前以上两步后的结果文件(使用command+shift+. 显示隐藏文件)
  
* 打开.bash_profile文件对tomcat进行配置

  ```
  #tomcat
  Tomcat=/usr/local/apache-tomcat-8.5.50
  export PATH=$Tomcat/bin:$PATH
  ```


* 打开终端，输入`source ~/.bash_profile`刷新配置

* 查看并修改文件权限(以bin/目录下文件为例，确保`.sh`文件拥有读写可执行的权限)

  ```
  sudo chmod 777 *.sh #bin目录下的所有sh文件
  sudo chmod 777 logs #logs文件夹权限
  ```
  ![][13]
## 四 tomcat启动和关闭
* 执行`startup.sh`启动tomcat
  ![][14]
  
* 浏览器中输入`http://localhost:8080`，看到tomcat界面程序启动成功

  ![][15]
  
* 执行`shutdown.sh`指令，关闭tomcat

  ![][16]
## 五 参考

* [Mac系统安装Tomcat服务器](https://www.cnblogs.com/PyKK2019/p/10527296.html)
* [服务器上启动Tomcat失败][2]



[1]:https://tomcat.apache.org/download-90.cgi
[2]:https://blog.csdn.net/wangxinyao1997/article/details/89509861



[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-page-downloadpng.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-unzip-mv-library.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-folder-quanxian-before.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-terminal-startup.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-start-webview.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/tomcat-terminal-shutdown.png

