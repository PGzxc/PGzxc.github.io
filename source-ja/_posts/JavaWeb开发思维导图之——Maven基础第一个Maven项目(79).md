---
title: JavaWeb开发思维导图之——Maven基础第一个Maven项目(79)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 19a3b559
date: 2025-03-13 08:47:47
---
## 一 概述

* 手工制作(麻烦,了解)
* 插件创建
* IDEA创建
* IDEA使用模板创建项目
* 安装插件及启动项目

<!--more-->

## 二 内容详情

### 2.1 手工制作(麻烦,了解)

1-Maven工程目录结构(自己创建)

2-Maven常用项目构建指令

* 1-mvn compile //编译
* 2-mvn clean //清理
* 3-mvn test //测试
* 4-mvn package //打包
* 5-mvn install //安装到本地仓库

### 2.2 插件创建

1-创建工程语法

* mvn archetype:generate
* -DgroupId={project-packaging}
* -DartifactId={project-name}
* -DarchetypeArtifactId={maven-archetype-quickstart}
* -DinteractiveMode=false

2-示例

* 1-创建Java工程
* 2-创建Web工程

3-Maven项目目录结构

### 2.3 IDEA创建

1-Maven环境配置

* 1-打开：File->Setting->Build Tools->Maven
* 2-IDEA与Maven版本不一致(下载支持版本)
* 3-配置: 1-Maven home directory: maven3.6.1目录(默认3.6.9);2-User settings file: maven 配置文件(3.6.1),Override

2-Maven项目创建

* 1-创建: 1-File创建;2-Module图标创建
* 2-配置文件属性: 1-位置1(module创建); 2-位置2(创建完成)
* 3-测试: 1-位置: IDEA右边->Maven Project; 2-添加测试依赖: junit(pom.xml);3-编写java代码及测试类;4-点击Lifecycle下的指令执行

3-Maven命令执行

* 1-点击`Edit Configurations`->+号—>Maven
* 2-配置命令
* 3-点击run运行

### 2.4 IDEA使用模板创建项目

* 1-使用原型创建java项目
* 2-使用原型创建web项目

### 2.5 安装插件及启动项目

* 1-tomcat7插件安装
* 2-运行web项目
* 3-配置文件说明

## 三 思维导图

![javaweb-xmind-maven1-project-4][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-maven1-project-4.png