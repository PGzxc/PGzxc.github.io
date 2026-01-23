---
title: IOS开发之——数据库-基础知识介绍(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 数据库
abbrlink: eaa6617d
date: 2022-04-21 22:38:54
---
## 一 概述

* IOS中数据存储方式
* SQLite数据库
* 使用Navicat执行表格操作

<!--more-->

##  二 IOS中数据存储方式

* Plist(NSArray\\NSDictionary)：只能存数据和字典
* Preference(偏好设置\\NSUserDefaults)：系统自带，存到Preference目录下的一个以此应用包名来命名的plist文件
* NSCoding(NSKeyedArchiver\\NSkeyedUnarchiver)：遵循NSCoding协议，写对象到文件中和从文件中解析出对象
* SQLite3：数据库，纯C语言，轻量级
* Core Data：数据库，基于SQLite3，OC版本，庞大，重量级

## 三 SQLite数据库

### 3.1 SQLite

#### 什么是数据库

* 数据库（Database）是按照数据结构来组织、存储和管理数据的仓库
* 数据库可以分为2种类型：关系型数据库和非关系型数据库

#### 什么是SQLite数据库

* SQLite是一款轻型的嵌入式数据库
* 它占用资源非常的低，在嵌入式设备中，可能只需要几百K的内存就够了
* 它的处理速度比Mysql、PostgreSQL这两款著名的数据库都还快

#### 常用关系型数据库

* PC端：Oracle、MySQL、SQL Server、Access、DB2、Sybase
* 嵌入式\移动客户端：SQLite

### 3.2 如何存储数据

#### 数据库是如何存储数据的

数据库的存储结构和excel很像，以表（table）为单位

#### 数据库存储数据的步骤

* 新建一张表（table）
* 添加多个字段（column，列，属性）
* 添加多行记录（row，record，每行存放多个字段对应的值）

## 四 使用Navicat执行表格操作

### 4.1 软件清单

* Navicat

### 4.2 创建SQLite文件

打开Navicat，点击左上角的Connection，在下拉列表中选择SQLite

![][1]

设置Connection Name，选择Type为`New SQLite 3`，在Database File选择保存SQLite文件名

![][2]

创建成功后的SQLite结构形式如下

![][3]

### 4.3 创建表格

在Tables上右键或者点击右侧的`+`号，执行创建表格

![][4]

添加表格字段(Type有4个选项)，id设置为Auto Increment(主键自增)

![][5]

点击保存按钮，设置表格名

![][6]

### 4.4 添加数据

选中要添加数据的表格，点击底部的`+`添加数据

![][7]

添加数据后的视图如下所示

![][8]


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-connect-sqlite.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-save-sqlite-file.gif
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-sqlite-create-success.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-create-table.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-table-keys.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-table-save.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-table-add-value.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-sqlite-01-table-records.png

