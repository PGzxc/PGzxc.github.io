---
title: IOS开发之——网络-服务器搭建(2)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 网络
abbrlink: '64199014'
date: 2022-02-28 21:49:00
---
## 一 概述

* 本地服务器的选择
* 本地服务器的搭建

<!--more-->

## 二 本地服务器的选择

### 2.1 选择什么样的服务器

学习阶段使用本地服务器

### 2.2 怎样搭建本地服务器

* 开发工具选择Eclise
* 服务器容器选择Apache Tomcat
* JDK，选择java1.8

### 2.3 本地服务器的开发及部署过程

* 安装java的开发工具：eclipse
* 利用java编写一套服务器代码
* 配置服务器的容器Apache Tomcat
* 启动Apache Tomcat，将项目部署到Tomcat上
* 访问项目地址

## 三 本地服务器的搭建

### 3.1 安装Elipse，并选择工作空间

![][1]

### 3.2 导入已有的服务器端代码
![][2]

### 3.3 在Eclipse中，点击底部的Server，添加一个Apache Tomcat
![][3]

### 3.4 启动服务器
![][4]
### 3.5访问项目

```
http://localhost:8080/MJServer/resources/images/minion_01.png
```
![][5]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-server-eclipse-workspace.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-server-eclipse-import-code.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-server-tomcat-add.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-server-tomcat-start.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-internet-server-project-view.png