---
title: JavaWeb开发思维导图之——Redis高级之建立连接阶段(155)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 93e529b
date: 2025-06-08 10:03:30
---
## 一 概述

* 说明
* 工作流程
* 主从链接(slave连接master)
* 主从断开连接
* 授权与验证

<!--more-->

## 二 说明

```
建立slave到master的连接, 使master能够识别slave, 并保存slave端口号
```

## 三 工作流程

### 3.1 步骤

```
1-设置master的地址和端口, 保存master信息
2-建立socket连接
3-发送ping命令(定时器任务)
4-身份验证(可无)
5-发送slave端口信息(至此, 主从连接成功)
6-当前状态
```

### 3.2 指令

```
1-slave
  1-发送指令: slaveof ip port
  3-保存master的ip与端口: masterhost 、masterport
  4-根据保存的信息创建连接master的socket
  5-周期性发送命令: ping
  7-发送指令: auth password
  9-发送指令: replconf listening-port <port-number>
  
2-master
  2-接收到指令 响应对方
  6-响应: pong
  8-验证授权:
  10-保存slave的端口号
```

## 四 主从链接(slave连接master)

### 4.1 连接方式

```
1-方式1
  1-说明:  客户端发送命令
  2-slaveof masterip masterport
2-方式2
  1-说明:  启动服务器参数
  2-redis-server -slaveof masterip masterport
3-方式3
  1-说明:  服务器配置
  2-slaveof masterip masterport
```

### 4.2 获取信息

```
1-slave信息
 1-master_link_down_since_seconds
 2-masterhost & masterport
2-master信息:1-slave_listening_port(多个)
```

## 五 主从断开连接

```
1-说明: 断开slave与master的连接, slave断开连接后，不会删除已有数据, 不再接收master数据
2-指令: slaveof no one
```

## 六 授权与验证

### 6.1 master

```
1-master客户端发送命令设置密码: requirepass password
2-master配置文件设置密码
 1-config set requirepass password
 2-config get requirepass
```

### 6.2 slave

```
1-slave客户端发送命令设置密码: auth password
2-slave配置文件设置密码: masterauth password
3-slave启动服务器设置密码: redis-server -a password
```


## 五 思维导图

![javaweb-xmind-redis-hig-conn-state-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-redis-hig-conn-state-5.png