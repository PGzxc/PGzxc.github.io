---
title: JavaWeb开发思维导图之——Redis基础Redis下载与安装(74)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 3fcde21d
date: 2025-03-07 10:17:12
---
## 一 概述

* 下载与安装
* 服务器与客户端启动
* 服务器配置

<!--more-->

## 二 内容详情

### 2.1 下载与安装

1-说明：基于Center OS7安装Redis

2-步骤

* 1-下载安装包: wget http://download.redis.io/releases/redis-5.0.0.tar.gz
* 2-解压安装包: tar -xvf redis-5.0.0.tar.gz
* 3-编译(在解压目录执行): make
* 4-安装(解压目录执行): make install

3-常用指令

* 1-redis-server: 服务器启动命令
* 2-redis-cli: 客户端启动命令
* 3-redis-conf: redis核心配置文件
* 4-redis-check-dump: RDB文件检查工具(快照持久化文件)
* 5-redis-check-aof: aof文件修复工具

### 2.2 服务器与客户端启动

1-服务器启动

* 1-指令启动：redis-server --port 6379
* 2-配置文件启动：redis-server redis.conf

2-客户端启动

* 1-语法: redis-cli [-h host] [-p port]
* 2-示例: redis-cli -h 61.129.65.248 -p 6384

3-Redis基础环境约定

* 1-mkdir conf //创建配置文件存储目录
* 2-mkdir data //创建服务器文件存储目录(包含日志、数据、临时配置文件等)
* 3-ln -s redis-5.0.0 redis  //创建快速访问链接

### 2.3 服务器配置

* 1-配置文件: redis.conf
* 2-vim redis.conf操作
* 3-相关配置

## 三 思维导图

![javaweb-xmind-redis-down-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-down-3.png