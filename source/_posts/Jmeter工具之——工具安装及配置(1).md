---
title: Jmeter工具之——工具安装及配置(1)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: 7a7e9853
date: 2024-11-28 08:56:20
---
## 一 概述

* 开发环境
* 工具下载安装及汉化
* 工具配置

<!--more-->

## 二 开发环境

* Windows 11
* JDK: 1.8.0_382

## 三 工具下载安装及汉化

### 3.1 工具下载及安装

1-下载：https://jmeter.apache.org/download_jmeter.cgi

图示(根据平台选择版本)

![][1]

2-解压安装

![][2]

目录说明：

* backup: 备份文件，编辑的脚本都在这个目录下备份，如果丢失都可以在此目录下找到
* bin 目录：常用文件介绍；包含启动、配置等相关命令
* docs目录——Jmeter帮助文档（官方本地文档目录；包含有框架类、无框架类、常量值、不建议使用列表、帮助文档、索引、框架综述等等）
* extras目录——辅助库；提供了对Ant的支持文件，可也用于持续集成
* lib目录——核心库；存放Jmeter依赖的jar包，同时安装插件也放于此目录
* licenses目录——软件许可文件，不用管
* printable_docs目录——可打印版本文档目录
* LICENSE JMeter ——许可说明
* NOTICE JMeter ——简单信息说明
* README.md ——JMeter 官方基本介绍

### 3.2 启动Jmeter

1-进入到bin目录，找到jmeter.bat，双击运行

![][3]

2-启动后界面如下图(保留cmd后台不关闭，界面显示英文)

![][4]

### 3.3 jmeter汉化

1-关闭终端, bin目录下找到jmeter.properties，打开后设置如下

```
language=zh_CN
```

图示

![][5]

2-重启jmeter.bat后，汉化界面如下

![][6]

## 四 工具配置

### 4.1 环境变量配置

```
1-定义变量
JMETER_HOME:D:\SoftWare\DevTools\apache-jmeter-5.6.3

2-PATH变量
%JMETER_HOME%\bin
%JMETER_HOME%\lib\ext\ApacheJMeter_core.jar
%JMETER_HOME%\lib\jorphan.jar;
```

### 4.2 验证配置

打开cmd终端，输入`jmeter`回车，图示如下

![][7]

## 五 参考

* [jmeter快速入门及环境搭建](https://www.cnblogs.com/shoubashoujiao/p/17952633)
* [jmeter安装及环境变量配置、Jmeter目录介绍和界面详解](https://blog.csdn.net/weixin_71807218/article/details/140448137)
* [jmeter官网](https://jmeter.apache.org/download_jmeter.cgi)



[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-download-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-unzip-folder-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-jemeter-start-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-start-en-4.png
[5]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-lang-zh-5.png
[6]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-jmeter-zh-6.png
[7]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-1-jmeter-cmd-7.png