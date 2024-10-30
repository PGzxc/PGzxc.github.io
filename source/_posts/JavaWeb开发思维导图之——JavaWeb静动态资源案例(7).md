---
title: JavaWeb开发思维导图之——JavaWeb静动态资源案例(7)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 5e878e49
date: 2024-10-30 09:16:13
---
## 一 概述

* 发布静态资源
* 发布动态资源

<!--more-->

## 二 内容详情

### 2.1  发布静态资源

1-步骤

* 创建JavaWeb项目
* 将静态页面所需资源导入到项目的web目录下
* 修改web.xml配置文件，修改默认主页
* 将项目部署到tomcat中
* 启动tomcat服务
* 打开浏览器查看页面

2-配置修改

* web.xml->welcome-file-list(默认主页)

### 2.2 发布动态资源

1-Servlet介绍

* 运行在Java服务器端的程序
* 用于接收和响应来自客户端基于Http协议的请求
* 要想实现Servlet功能，实现Servlet接口或继承实现类
* 核心方法: service()，任何客户端的请求都会经过该方法

2-实现步骤

* 创建一个JavaWeb项目
* 将静态页面所需资源导入到项目的web目录下
* 需修改web.xml配置文件，修改默认主页
* 在项目的src路径下编写一个类，实现Service接口
* 重写service方法，输出一句话即可
* 修改web.xml配置文件，配置servlet相关资源
* 将项目部署到tomcat中
* 启动tomcat服务
* 打开浏览器测试功能

3-配置

* web.xml->welcome-file-list(默认主页)
* web.xml->servlet(servlet声明)
* web.xml->servlet-mapping(servlet映射)

4-Servlet执行流程

* 浏览器访问资源路径(http://localhost:8080/crm/studentServlet)
* 通过servlet映射找到servlet-mapping配置(service-name)
* 通过servlet映射servlet-name找到servlet声明配置
* 通过servlet声明配置找到servlet-class实现类名
* 通过类找到service实现方法

## 三 思维导图

![javaweb-xmind-web-resource-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-resource-7.png