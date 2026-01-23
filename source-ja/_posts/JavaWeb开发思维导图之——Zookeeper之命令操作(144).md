---
title: JavaWeb开发思维导图之——Zookeeper之命令操作(144)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 9a9e8205
date: 2025-05-28 08:47:25
---
## 一 概述

* Zookeeper数据模型
* Zookeeper服务端常用命令
* Zookeeper客户端常用命令

<!--more-->

## 二 Zookeeper数据模型

### 2.1 Zookeeper数据模型

```
1-倒置的树状结构，顶点为/
2-访问当前层时加上父类的目录(如/app1)
```

### 2.2 模型相关

```
1-Zookeeper是一个树形目录服务，和Unix的文件目录树类似，拥有一个层次化结构
2-每个节点称为: ZNode, 节点上保存自己的数据和节点信息
3-节点可以拥有子节点，同时页允许少量(1MB)数据存储在该节点下
4-节点分为4大类
```

## 三 Zookeeper服务端常用命令

```
1-启动Zookeeper服务: ./zkServer.sh start
2-查看Zookeeper服务状态: ./zkServer.sh status
3-停止Zookeeper服务: ./zkServer.sh stop
4-重启Zookeeper服务: ./zkServer.sh restart
```

## 四 Zookeeper客户端常用命令

### 4.1 访问Zookerper服务

```
1-Zookeeper客户端
2-Zookeeper Java API
```

### 4.2 客户端常用命令-基本操作

```
1-连接Zookeeper服务:示例: ./zkCli.sh -server localhost:2181
2-断开连接: quit
3-查看命令帮助: help
4-显示指定目录下节点：2-示例: ls /dubbo
5-创建节点： create /app1 aa
6-获取节点值：示例: get /app1
7-设置节点值：示例: set /app1 bb
8-删除单个节点：示例: delete /app1
9-删除带有子节点的节点：示例: deleteall /app1
```

### 4.3 客户端常用命令-临时循环节点

```
1-创建临时节点：示例: create -e /app1
2-创建顺序节点：create -s /app1
3-查询节点详细信息:示例: ls -s /dubbo
```

## 五 思维导图

![javaweb-xmind-zookeeer-cmd-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-zookeeer-cmd-3.png