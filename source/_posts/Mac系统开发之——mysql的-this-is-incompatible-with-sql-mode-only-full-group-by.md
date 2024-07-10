---
title: Mac系统开发之——mysql的 this is incompatible with sql_mode=only_full_group_by
categories:
  - 系统
  - Mac
tags:
  - Mysql
abbrlink: 73b98567
date: 2020-02-23 17:47:37
---
## 一 概述

Mac系统使用MySQL(5.7.29)时，会出现如下错误：

```
ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'database_tl.emp.id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

<!--more-->

## 二 原因

### 2.1 原理层面

* 这个错误发生在mysql 5.7 版本及以上版本会出现的问题：
* mysql 5.7版本默认的sql配置是:sql_mode="ONLY_FULL_GROUP_BY"，这个配置严格执行了"SQL92标准"。
* 很多从5.6升级到5.7时，为了语法兼容，大部分都会选择调整sql_mode，使其保持跟5.6一致，为了尽量兼容程序。

### 2.2 sql层面

在sql执行时，出现该原因：

* 简单来说就是：输出的结果是叫target list，就是select后面跟着的字段，还有一个地方group by column，就是group by后面跟着的字段。
* 由于开启了ONLY_FULL_GROUP_BY的设置，所以如果一个字段没有在target list 和group by字段中同时出现，或者是聚合函数的值的话，那么这条sql查询是被mysql认为非法的，会报错误。

## 三 解决办法

* 打开终端，登陆mysql(mysql -u root -p)

  ![][1]

* 输入下面的语句，修改sql_mode

  ```
  set @@global.sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
  ```
  ![][2]
## 四 参考

* [5分钟学会MySQL-this is incompatible with sql_mode=only_full_group_by错误解决方案][11]
* [this is incompatible with sql_mode=only_full_group_by][12]

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-mysql-errot-terminal-login.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/mac-mysql-error-sql-model.png





[11]:https://blog.csdn.net/qq_42175986/article/details/82384160
[12]:https://segmentfault.com/q/1010000009488335