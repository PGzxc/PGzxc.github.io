---
title: JavaWeb开发之——若依管理系统入门(1)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
  - 若依
abbrlink: 273f2104
date: 2025-07-01 12:01:38
---
## 一 概述

* 若依管理系统介绍
* 开发环境搭建
* 项目下载及演示

<!--more-->

## 二 若依管理系统介绍

### 2.1 介绍

```
-若依是一款开源的后台管理系统
-借助于此系统，企业能快速完成开发平台
-保护功能：权限管理、数据管理、系统监控等
```

### 2.3 网站地址

```
https://www.ruoyi.vip/
```

图示

![][1]

### 2.3 包含产品

| 编号 |    产品     |                    说明                    |
| :--: | :---------: | :----------------------------------------: |
|  1   |    RuoYi    | 基于SpringBoot的权限管理系统(前后端不分离) |
|  2   |  RuoYi-Vue  |            管理系统(前后端分离)            |
|  3   | RuoYi-Cloud |      管理系统(前后端分离+微服务版本)       |
|  4   |  RuoYi-App  |     uni-app小程序版本(依赖RuoYi-Cloud)     |

下载地址：

![][2]

## 三 开发环境搭建(以Ruoyi为例)

* 运行系统：Win 11 专业版 24H2
* Java：20.0.2
* Maven：3.9.9
* 开发工具：Eclipse或IDEA
* 数据库：MySQL(用户名: root，密码：admin)+Navicat

## 四 项目下载及演示

### 4.1 项目下载及解压并导入项目

1、依次点击：File—>Import，打开Import窗口，选择Maven下的Existing Maven Project

![][3]

2、选择解压后的项目并确定

![][4]

3、导入完成后，项目结构如下图

![][5]

### 4.2 数据库导入

1、找到项目下的数据库文件

![][6]

2、打开Navicat软件，在本地数据库下新建ry数据库

![][7]

3、选择`ry`数据表，执行运行SQ文件，依次导入ry_20250416.sql和quarts.sql，成功后表结构如下

![][8]

### 4.3 修改项目配置

1、打开项目/ruoyi-admin/src/resources/application-druid.yml配置数据库用户名和密码及表名

![][9]

2、打开项目/ruoyi-admin/src/resources/application.yml配置服务端口(如有冲突)

![][10]

### 4.4 启动项目并查看

1、ruoyi-admin项目中，在RuoYiApplication中运行

![][11]

2、运行后，打开http://localhost:8082/网址查看

![][12]

## 五 参考

* [若依官网](https://www.ruoyi.vip/)
* [若依官方文档-环境部署](https://doc.ruoyi.vip/ruoyi-vue/document/hjbs.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-website-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-down-site-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-ec-import-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-ec-choice-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-ec-ok-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-sq-view-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-sq-new-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-sql-table-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-config-sql-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-config-port-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-run-as-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-ry-run-view-12.png