---
title: JavaWeb开发思维导图之——Zookeeper之Curator API常用操作(146)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 644fe44d
date: 2025-05-30 09:11:24
---
## 一 概述

* 建立连接
* 添加节点
* 删除节点
* 修改节点
* 查询节点
* Watch事件监听

<!--more-->

## 二 建立连接

### 2.1 创建方式

```
1-client=CuratorFrameworkFactory.newClient()
2-client=CuratorFrameworkFactory.builder() //级联方式, 可以设置namespace("app1")
```

### 2.2 创建时的参数

```
1-connectString: 连接字符串。zk server地址和端口号(如: 192.168.149.135:2181)
2-sessionTimeoutMs: 会话超时时间 单位ms
3-connectionTimeoutMs: 连接超时时间 单位ms
4-retryPolicy: 重试策略
```

### 2.2 开启连接

```
client.start()
```

## 三 添加节点

### 3.1 基本创建

```
1-示例: client.create().forPath("/app1") 
2-返回结果为当前节点
```

### 3.2 创建节点带有数据

```
1-示例:  client.create().forPath("/app2","aa".getBytes())//放回当前节点
2-不同点: 第二个参数为赋值
```

### 3.3 设置节点的类型

```
1-示例: client.create().withMode(CreateMode.EPHEMERAL).forPath("/app3")
2-不同点:creatingParentsIfNeeded
```

### 3.4 创建多级节点(/app1/p1)

```
1-示例: client.create.creatingParentsIfNeeded.forPath("/app4/p1")
2-不同点: creatingParentsIfNeded
```

## 四 删除节点

### 4.1 删除单个节点

```
1-示例: client.delete().forPath("/app1")
```

### 4.2 删除带有子节点的节点

```
1-示例: client.delete().deletingChildrenIfNeeded().forPath("/app2")
2-关键字：deletingChildrenIfNeeded()
```

### 4.3 必须成功的删除

```
1-示例: client.delete().guaranteed().forPath("/app3")
2-关键字: guaranteed()
```

### 4.4 回调

```
1-示例: clent.delete().inBackground(new BackgoundCallback()).forPath("/app4")
2-关键字: inBackgound
3-回调信息: processResult方法的event
```

## 五 修改节点

### 5.1 修改数据

```
1-示例: client.setData().forPath("/app1","aa".getBytes())
```

### 5.2 根据版本修改

```
1-创建节点: Stat stat = new Stat()
2-查询节点状态: client.getetData().storingStatIn(stat).forPath("/app1")
3-查出版本: int version=stat.getVersion()
4-根据版本修改: client.setData().withVersion(version).forPath("/app1","bb".getBytes())
```

## 六 查询节点

### 6.1 查询数据

```
1-客户端: get
2-示例: client.getData().forPath("/app1")
```

### 6.2 查询子节点

```
1-客户端: ls
2-示例: client.getChildren().forPath("/")
```

### 6.3 查询节点状态信息

```
1-客户端: ls -s
2-示例：client.getData().storingStatIn(stats).forPath("/app1")
3-说明
 1-没有client.getStatus()
 2-使用new Stat()传入，获取到后设置status
 3-stat种包含状态信息
```

## 七 Watch事件监听

### 7.1 监听概述

```
1-Watch机制是Zookeeper实现分布式协调服务的重要特性
2-Zookeeper引入Watcher机制实现发布/订阅功能，能够让多个订阅者同时监听某一个对象
3-Zookeeper原生的Watcher监听不是特别方便
4-Curator引入Cache来实现对Zookeeper服务端事件的监听
5-Zookeeper的三种Watcher
```

### 7.2 监听操作

```
1-监听NodeCache
2-监听PathChildrenCache
3-监听TreeCache
```

## 八 思维导图

![javaweb-xmind-zookeeer-curator-5][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-zookeeer-curator-5.png