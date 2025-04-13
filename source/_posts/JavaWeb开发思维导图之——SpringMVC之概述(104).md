---
title: JavaWeb开发思维导图之——SpringMVC之概述(104)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 1fe693a1
date: 2025-04-13 09:28:54
---
## 一 概述

* 三层架构
* MVC
* SpringMVC

<!--more-->

## 二 内容详情

### 2.1 三层架构

```
1-表现层
-作用: 负责数据展示
-技术: Servlet、HTML、Spring、SpringMVC

2-业务层
-作用: 负责业务处理
-技术: Spring

3-数据层
-作用: 负责数据操作
-技术: JDBC、MyBatis、Spring
```
### 2.2 MVC

1-概念

```
1-Model View Controller缩写
2一种用于设计创建Web应用程序表现层的模式
```

2-MVC

```
1-Model(模型): 数据模型，用于封装数据

2-View(视图)
 -1-说明: 数据模型，用于封装数据
 -2-技术: jsp、html
 
3-Controller(控制器) 
 -1-说明: 处理用户交互的调度器，根据用户需求处理程序逻辑
 -2-技术: Servlet、SpringMVC
```

### 2.3 SpringMVC

```
1-SpringMVC简介：是一种基于Java实现MVC模型的轻量级Web框架
2-SpringMVC优点
 -使用简单
 -性能突出(相比现有的框架技术)
 -灵活性强
```

## 三 思维导图

![javaweb-xmind-springmvc-level1-first-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-springmvc-level1-first-1.png