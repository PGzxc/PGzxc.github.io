---
title: JavaWeb开发思维导图之——Maven高级之多环境开发配置(131)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: f0169eb6
date: 2025-05-15 08:50:19
---
## 一 概述

* 多环境兼容
* 多环境配置
* 加载指定环境

<!--more-->

## 二 多环境兼容

```
1-生产环境produce
2-开发环境develop
3-测试环境test
```

## 三 多环境配置

```
1-<profiles>创建多环境

1-<profile>具体环境
 1-<id>pro_env</id>//环境名称
 2-<properties>环境属性: 1-<jdbc.url>jdbc:my...</jdbc.url>//属性
 3-<activation>设置默认启动:<activeByDefault>true//开启
```

## 四 加载指定环境

### 4.1 任务

```
1-作用: 加载指定环境配置
2-调用格式: mvn 指令 -P 环境定义id
3-示例: mvn install -P pro_env
```

### 4.2 install标签

```
2-install标签(已配置默认)
```

## 五 思维导图

![javaweb-xmind-maven2-eve-7][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven2-eve-7.png