---
title: JavaWeb开发思维导图之——JavaWeb核心JSTL(13)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 7ef3c970
date: 2024-11-07 12:06:24
---
## 一 概述

* 介绍
* 组成
* 核心标签库
* 使用

<!--more-->

## 二 内容详情

### 2.1  介绍

1-概念

* Java Server Pages Standarded Tag Library缩写
* jsp标准标签库
* 主要提供给开发人员一个标准通用的标签库

2-作用：利用标签库取代jsp上的Java代码

### 2.2 组成

* core(核心标签库) 通用逻辑处理
* fmt(国际化) 不同地域显示不同语言
* functions(EL函数) 可用方法
* sql(操作数据库) 
* xml(操作xml)

### 2.3 核心标签库

* 流程控制(\<标签名:if>)-用于条件判断
* 流程控制(\<标签名:choose>、\<标签名:when>、\<标签名:otherwise>)-多条件判断
* 迭代遍历(\<标签名:forEach>)-用于循环遍历

### 2.4 使用

1-步骤

* 创建一个web项目
* 在web目录下创建一个WEB-INF目录
* 在WEB-INF目录下创建一个libs目录，将JSTL的jar包导入
* 创建jsp文件，通过taglib导入jstl标签库
* 对流程控制和迭代遍历标签进行使用
* 部署并启动项目
* 通过浏览器查看

2-示例

* 导包：web/WEB-INF/libs/jstl-1.2.jar
* jsp导入核心库: <%@taglib uri="http://java.sn.com/jsp/jstl/core" prefix="c" %>
* 示例：<c:forEach items="${list}" var="str">${str}</br></c:forEach>

## 三 思维导图

![javaweb-xmind-web-jstl-13][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-web-jstl-13.png