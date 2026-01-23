---
title: JavaWeb开发思维导图之——MySQL数据库mycat中间件(30)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: fcc8c72b
date: 2024-12-06 09:47:08
---
## 一 概述

* 介绍
* mycat安装
* 数据库集群准备
* 主从复制
* 读写分离
* 分库分表

<!--more-->

## 二 内容详情

### 2.1  介绍

* 一台数据服务器无法满足存储需求，多台数据服务器构成集群
* 但是，为了保证数据一致性、查询效率等，同时解决多台服务器之间通讯、负载均衡等问题
* mycat是一款数据库集群软件，支持常用关系型数据库
* mycat是一个数据库中间件，支持mysql集群
* 可以像mysql一样使用mycat，开发人员几乎感觉不到mycat

### 2.2 mycat安装

* mycat官网: http://www.mycat.org.cn/
* 通过ssh工具(crt)上传到linux
* 解压并查看
* 为mycat目录授权
* 配置环境变量
* 启动mycat
* 查看端口监听: netstat -ant|grep 8066
* SQLyog连接mycat：默认用户名:root,端口 8066

### 2.3 数据库集群准备

1-集群模型

* Linux(Mycat+MySQL主服务器)
* Linux(MySQL从服务器)

2-服务器准备

* 克隆虚拟机
* 修改第二个虚拟机网卡，重新生成mac地址
* 修改MySQL配置文件uuid
* 启动相关服务

### 2.4 主从复制

1-概念

* mysql读写分离，主服务器操作数据，从服务器读取数据
* 配置mysql数据库的主从复制
* 从服务器自动同步主服务器数据，达到数据一致

2-配置

* 主服务器配置
* 从服务器配置
* 测试：在主服务器创建db1数据库，查看从服务器是否自动同步

### 2.5 读写分离

1-概念

* 写操作只写入主服务器，由于有主从复制，从服务器也会自动同步数据
* 读操作是读取从服务器中的数据

2-配置

* 主服务器server.xml：逻辑数据库配置
* 主服务器schema.xml：逻辑数据库对应主服务器数据库、主服务器配置、从服务器配置

3-操作

* mycat虚拟数据库创建表及添加记录
* 主服务器db1查看添加信息
* 从服务器读取数据

### 2.6 分库分表

1-概念：将庞大的数据量拆分为不同的数据库和数据表进行存储

2-分类

* 水平拆分
* 垂直拆分

## 三 思维导图

![javaweb-xmind-mysql-mycat-14][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-mysql-mycat-14.png