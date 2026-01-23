---
title: JavaWeb开发思维导图之——Zookeeper之模拟12306售票案例(148)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 1f6419ad
date: 2025-06-01 09:33:14
---
## 一 概述

* Curator五种锁方案
* 案例模型
* 代码实现

<!--more-->

## 二 Curator五种锁方案

```
1-InterProcessSemaphoreMutex: 分布式排它锁(非可重入锁)
2-InterProcessMutex: 分布式可重入排它锁
3-InterProcessReadWriteLock: 分布式读写锁
4-InterProcessMultiLock: 将多个锁作为单个实体管理容器
5-InterProcessSemaphoreV2: 共享信号量
```

## 三 案例模型

```
1-线程应用: 携程、飞猪、去哪儿
2-3个线程应用通过12306访问DB
3-12306使用Zookeeper分布式锁
```

## 四 代码实现

```
1-构造创建锁: lock = new InterProcessMutex(client,path)
2-线程运行获取锁: lock.acquire(3,TimeUnit.Second)
3-finally释放锁:lock.release()
```

## 五 思维导图

![javaweb-xmind-zookeeer-curator-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-zookeeer-curator-7.png