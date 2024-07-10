---
title: Java开发之——由JDK生成JRE
categories:
  - 开发
  - A-基础语言
  - Java
tags:
  - JRE
abbrlink: c6f29b82
date: 2023-02-13 11:07:00
---
## 一  概述

从jdk10开始(不含10)，jdk就不自带jre了。JDK安装目录如下

![][1]

<!--more-->

## 二  jdk生成jre

### 2.1 用命令提示符(cmd)进入jdk目录
![][2]

### 2.2 在CMD中执行如下指令

```
bin\jlink.exe --module-path jmods --add-modules java.desktop --output jre
```

![][3]

### 2.3 生成的jre
![][4]

## 三 参考

* [使用 jlink 的 Java 运行时](https://learn.microsoft.com/zh-cn/java/openjdk/java-jlink-runtimes)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/jdk-install-jre-no-exist.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/jdk-install-cmd-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/jdk-install-jre-jlink.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/jdk-install-jre-make.png
