---
title: 'WinForm开发之——ADO.NET数据库操作及常用类概述(15.1)'
categories:
  - 开发
  - E-桌面开发
  - WinForm
tags:
  - WinForm
abbrlink: 8f74b968
date: 2020-08-10 21:29:21
---
## 一 概述

* 在C#语言中ADO.NET是在ADO的基础上发展起来的，ADO(Active Data Object)是一个COM组件类库，用于访问数据库，而ADO.NET是在.NET平台上访问数据库的组件。
* ADO.NET是以ODBC(Open Database Connectivity)技术的方式来访问数据库的一种技术

<!--more-->

## 二  ADO.NET 中的常用命名空间 

|         命名空间         |    数据库提供程序    |
| :----------------------: | :------------------: |
|  System.Data.SqlClient   | Microsoft SQL Server |
|     System.Data.Odbc     |         ODBC         |
| System.Data.OracleClient |        Oracle        |
|    System.Data.OleDB     |        OLE DB        |

## 三 数据库操作中常用的类

### 3.1 概述

* 在使用ADO.NET进行数据库操作时通常会用到5个类，分别是Connection类、Command类、DataReader类、DataAdapter类、DataSet类
* 在接下来的讲解中我们将以连接SQL Server为例介绍ADO.NET中的对象，引用的命名空间为System.Data.SqlClient
* 除了DataSet类以外，其他兑现的前面都加上Sql，即SqlConnection、SqlCommand、SqlDataReader、SqlDataAdapter

### 3.2  常用类介绍

#### 3.2.1 Connection类

* 该类主要用于数据库中建议连接和断开连接的操作，并且能通过该类取当前数据库连接的状态
* 使用Connection类根据数据库的链接串能连接任意数据库，例如SQLServer、Oracle、MySQL等
* 但是在.NET平台下，由于提供了一个SQL Server数据库，并额外提供了一些操作菜单便于操作 ，所以推荐使用SQL Server数据库

#### 3.2.2 Command类

* 该类主要对数据库执行增加、删除、修改以及查询的操作
* 通过在Command类的对象中传入不同的SQL语句，并调用相应的方法来执行SQL语句

#### 3.2.3 DataReader类

* 该类用于读取从数据库中查询出来的数据，但在读取数据时能向前读不能向后读，并且不能修改该类对象中的值
* 在与数据库的链接中断时，该类对象中的值也随之被清除

#### 3.2.4 DataAdapter类

* 该类与DataSet联用，它主要用于将数据库的结果运送到DataSet中保存
* DataAdapter可以看做是数控与DataSet的一个桥梁，不仅可以将数据库中的操作结果运送到DataSet中，也能将更改后的DataSet保存到数据库中

#### 3.2.5 DataSet类

* 该类与DataReader类似，都用于存放对数据库查询的结果
* 不同的是，DataSet类中的值不仅可以重复多次读取，还可以通过更改DataSet中的值更改数据库中的值
* 此外，DataSet类中的值在数据库断开连接的情况下依然可以保留原来的值



