---
title: JavaWeb开发思维导图之——Maven基础简介(76)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: c3f6be3d
date: 2025-03-10 08:51:17
---
## 一 概述

* 传统项目管理问题
* Maven是什么
* 模型
* Maven的作用

<!--more-->

## 二 内容详情

### 2.1 传统项目管理问题

* 1-jar包不统一，jar包不兼容
* 2-工程升级维护过程操作繁琐

### 2.2 Maven是什么

* 1-本指是一个项目管理工具，将项目开发和管理过程抽象成一个项目对象模型
* 2-POM: Project Object Model缩写，项目对象模型

### 2.3 模型

* 1-项目: pom.xml->项目对象模型<->依赖管理->本地->私服->中央仓库
* 2-POM模型: 构建生命周期/阶段—>插件—>jar包/源代码/帮助文档/war包/XML

### 2.4 Maven的作用

* 1-项目构建: 提供标准的、跨平台的自动化项目构建方式
* 2-依赖管理: 方便快捷的管理项目依赖的资源(jar包)，避免资源间的版本冲突
* 3-统一开发结构: 提供标准的、统一的项目结构

## 三 思维导图

![javaweb-xmind-maven1-desc-1][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven1-desc-1.png