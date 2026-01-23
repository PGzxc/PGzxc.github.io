---
title: JavaWeb开发思维导图之——Dubbo之Zookeeper安装(138)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 1835c39c
date: 2025-05-22 09:03:41
---
## 一 概述

* 下载安装
* 配置zoo.cfg
* 启动ZooKeeper
* 查看ZooKeeper状态
* 停止Zookeeper

<!--more-->

## 二 下载安装

```
1-下载地址: https://zookeeper.apache.org/releases.html
2-环境准备: JDK 7或更高版本
3-上传
4-解压：tar -zxvf apache-ZooKeeper-3.5.6-bin.tar.gz  //将tar包解压到/opt/zookeeper目录下
```

## 三 配置zoo.cfg

```
1-说明: 进入到conf目录拷贝一个zoo_sample.cfg并完成配置
2-步骤：
 1-cd /opt/zooKeeper/apache-zooKeeper-3.5.6-bin/conf/ //进入到conf目录
 2-cp  zoo_sample.cfg  zoo.cfg //拷贝
 3-修改zoo.cfg
```

## 四 启动ZooKeeper

```
1-cd /opt/zooKeeper/apache-zooKeeper-3.5.6-bin/bin/ //进入bin目录
2-./zkServer.sh  start //启动
4-修改存储目录：dataDir=/opt/zookeeper/zkdata
```

## 五 查看ZooKeeper状态

```
1-查看状态指令: ./zkServer.sh status
```

## 六 停止Zookeeper

```
1-./zkServer.sh stop //停止指令
```

## 七 思维导图

![javaweb-xmind-dubbo-zookeeper-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-dubbo-zookeeper-5.png