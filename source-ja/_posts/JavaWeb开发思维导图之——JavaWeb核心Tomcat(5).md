---
title: JavaWeb开发思维导图之——JavaWeb核心Tomcat(5)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: b287fe5c
date: 2024-10-28 09:27:24
---
## 一 概述

* 服务器
* tomcat介绍

<!--more-->

## 二 内容详情

### 2.1  服务器

1-服务器介绍

* 计算机的一种，比普通计算机更快、负载高、价格贵
* 具有高速cpu、可靠运行、强大I/O及扩展性
* 此处服务器指Web服务器或应用服务器，用于发布应用，供客户端访问

2-常用应用服务器

* weblogic(重量级服务器，javaEE容器)
* websphereAS(重量级服务器)
* JBOSSAS(重量级服务器，免费)
* Tomcat(实现jsp/servlet规范，轻量级服务器，开源免费)

### 2.2 tomcat介绍

1-介绍

* Apache基金会的Jakarta项目组中的一个核心项目
* 由Apache、Sun及其他一些公司及个人共同开发而成
* 支持Servlet、jsp规范
* 性能稳定，免费、开源

2-官网：

* 官网地址：https://tomcat.apache.org/

3-个版本支持

* servlet、jsp、el、java等(根据支持技术选择tomcat版本)

4-软件介绍

* bin(可执行二进制文件、启动、停止等)
* conf(配置文件)
* lib(依赖jar)
* log(日志文件)
* temp(临时文件)
* webapps(项目发布目录,ROOT根项目)
* work(工作目录)

5-基本使用

* 启动：startup.bat(windows)、startup.sh(linux)
* 停止：shutdown.bat(windows)、shutdown.sh(linux)
* 启动问题：一闪而过(没有配置jdk)、java.net.BindException(8080端口被占用)
* 部署自己的项目：
  - 在webapps目录下创建一个文件夹
  - 将资源放到该文件夹
  - 启动tomcat，输入正确路径

6-控制台乱码：logging.properties打开ConsoleHandler.encoding=gbk(utf-8)

7-IDEA集成Tomcat

* 配置tomcat
  - 点击Run->Edit Configurations
  - Defaults->Tomcat Server->Local
  - Server->Configure->Application server选择Tomcat
* 新建JavaEE项目
  - File->Project Struct->Modules->New Module
  - 弹窗->Java Enterprise(jdk/javaee/tomcat)
  - New Module->name

8-Linux安装Tomcat

* 上传压缩包到/home路径(put d:/apache-tomcat-9.0.29.tar.gz)
* 解压压缩包(tar -zxvf apache-tomcat-9.0.29.tar.gz)
* 进入bin目录下(cd apache-tomcat-9.0.26/bin)
* 启动tomcat(./startup.sh)
* 使用浏览器测试(http://127.0.0.1:8080)

9-JavaWeb项目创建

* 创建过程
  - File->Project Struct->Modules->New Module
  - 弹窗->Java Enterprise(jdk/javaee(e)/tomcat)
  - 勾选Web Application和Create web.xml
  - New Module->name(web_demo)
* 项目组成
  - src(源码)
  - web(多)：存放项目相关资源(html、css、js、jsp、图片等)、WEB-INF/web.xml(相关配置)、index.jsp
* 项目发布：IDEA发布、war包发布

10-配置

* 主配置文件server.xml
* 配置虚拟目录
* 配置虚拟主机

## 三 思维导图

![javaweb-xmind-web-tomcat-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-tomcat-5.png