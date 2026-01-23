---
title: JavaWeb开发思维导图之——Maven基础概念(78)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 68bd12ad
date: 2025-03-12 09:26:48
---
## 一 概述

* 仓库
* 坐标
* 仓库配置

<!--more-->

## 二 内容详情

### 2.1 仓库

* 1-概念: 存储资源，包含各种jar包
* 2-分类: 1-本地仓库;2-远程仓库

### 2.2 坐标

1-什么是坐标

* Maven中坐标用于描述仓库中资源的位置
* 仓库位置: https://repo1.maven.org/maven2
* Maven仓库地址：https://mvnrepository.com/

2-Maven坐标组成

* 1-groupId: 定义当前Maven项目隶属于组织名称(通常是域名反写，例如: org.mybits)
* 2-artifactId: 定义当前Maven项目名称(通常是模块名称，例如CRM、SMS)
* 3-version: 定义当前项目版本号
* 4-packaging: 定义该项目的打包方式

3-Maven坐标作用

* 唯一标识，唯一性定位资源位置
* 通过该标识符将资源的识别与下载工作交由机器完成

### 2.3 仓库配置

1-本地仓库配置

* 1-为何要配置本地仓库：Maven默认的仓库位于user/home/.m2/repository文件
* 2-修改Maven下载位置：配置文件: setting.xml

2-远程仓库配置

* 1-说明: maven仓库替换为阿里云仓库
* 2-查看系统自带: pom-4.0.0.xml->repositories标签
* 3-镜像仓库配置：1-文件位置: setting.xml；2-配置\<mirrors>标签

3-全局setting与用户setting区别

* 1-全局setting定义了当前计算机中Maven的公共配置
* 2-用户setting定义了当前用户配置

## 三 思维导图

![javaweb-xmind-maven1-pom-3][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven1-pom-3.png