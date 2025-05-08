---
title: JavaWeb开发思维导图之——SpringMVC之注解版SSM整合(124)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c2100165
date: 2025-05-08 11:12:17
---
## 一 概述

* 配置文件
* 注解方式<!--more-->

## 二 内容详情

### 2.1 配置文件

```
1-注解替换 
 -web.xml
 -applicationContext.xml
 -spring-mvc.xml
 -userDao.xml
2-保留：1-jdbc.properties 
```

### 2.2 注解方式

```
1-UserDao->userDao.xml //在方法上写注解
2-JdbcConfig
3-MyBatisConfig
4-SpringConfig
5-SpringMVCConfig
6-ServletContainersInitConfig//启动服务器时，监听加载spring运行环境
```


## 三 思维导图

![javaweb-xmind-springmvc-level3-ssm-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level3-ssm-3.png