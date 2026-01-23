---
title: Android开发之——Parcelable和Serializable的区别
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 序列化
abbrlink: 5f1f64ca
date: 2017-11-22 15:31:42
---

## 一 概述

进行Android开发的时候，我们都知道不能将对象的引用传给Activities或者Fragments，我们需要将这些对象放到一个Intent或者Bundle里面，然后再传递。 

通过Android的API，我们知道有两种选择，即在传递对象时，需要对我们的对象进行 Parcelable 或者Serializable化。作为Java开发者，相信大家对Serializable 机制有一定了解，那为什么还需要 Parcelable呢？  

为了回答这个问题，让我们分别几个方面进行展开 
<!--more-->

## 二 序列化概念
### 2.1 什么是序列化  

- 序列化，表示将一个对象转换成可存储或可传输的状态。
- 序列化后的对象可以在网络上进行传输，也可以存储到本地。  

### 2.2 为什么要进行序列化  
- 为了永久性保存对象，保存对象的字节序列到本地文件中
- 通过序列化对象在网络中传输
- 通过序列化在进程间传递

### 2.3  怎样进行序列化
- 实现Serializable接口
- 实现Parcelable接口

## 三 两种序列化的区别

### 3.1  Serializable序列化
- JavaSE本身就支持
- Serializable在序列化的时候会产生大量的临时变量，从而引起频繁的GC 
- Serializable接口非常简单，声明一下就可以了
- 如果将数据存储到磁盘，尽管Serializable效率低点，但此时还是建议使用Serializable 。

### 3.2 Parcelable序列化
- Android特有功能
- 效率比实现Serializable接口高效 
- 实现Parcelable接口稍微复杂一些，但效率更高
- Parcelable不能使用在要将数据存储在磁盘上的情况  

##  四 序列化的实现

### 4.1  Serializable序列化实现
- 安装插件  
![serializable插件][3]
- 使用插件  
![使用插件][4]

### 4.2  Parcelable序列化实现  

- 安装插件 
![安装插件][1]

- 使用插件 
![使用插件][2]

参考：  
[Android系统中Parcelable和Serializable的区别][5]  
[Android中Parcelable接口用法][6]



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/parcelable-plug.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/parcelable-use.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/serialize-plug.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/serializeable-use.gif
[5]: http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0204/2410.html
[6]: http://www.cnblogs.com/renqingping/archive/2012/10/25/Parcelable.html



