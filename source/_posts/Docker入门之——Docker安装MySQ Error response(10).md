---
title: Docker入门之——Docker安装MySQ Error response(10)
categories:
  - 开发
  - G-后端开发
  - Docker
tags:
  - Docker
abbrlink: 1bb31817
date: 2024-10-06 08:45:49
---
## 一 概述

* 现象
* 解决办法

<!--more-->

## 二 现象

### 2.1 创建容器指令

运行如下指令，出现错误

```
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

### 2.2 错误信息

```
C:\Windows\System32>docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
5945a27ad7178c1cee684576ac4cf87a41041304194d50c173ba5901ef0d0b9a
docker: Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3306 -> 0.0.0.0:0: listen tcp 0.0.0.0:3306: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
```

## 三 解决办法

### 3.1 更换端口映射

```
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

```

3306映射为3360：

```
docker run -itd --name mysql-test -p 3306:3360 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

### 3.2 登录mysql

登录指令

```
mysql -h localhost -u root -p
```

登录结果

```
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 9.0.1 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```



