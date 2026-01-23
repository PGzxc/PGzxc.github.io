---
title: JavaWeb开发之——MySQL数据库软件(03)
categories:
  - 开发
  - G-后端开发
  - Java
tags:
  - Java
  - JavaWeb
abbrlink: 4d920de5
date: 2022-09-14 01:11:36
---
## 一 概述

* MySQL压缩版
* MySQL安装版

<!--more-->

## 二 下载地址

### 2.1 下载地址

https://downloads.mysql.com/archives/

### 2.2 选择下载方式
![][1]
MySQL压缩版选择：MySQL Community Server
MySQL安装版选择：MySQL Installer

## 三 MySQL压缩版

### 3.1 下载及解压

选择要下载的版本和操作系统

![][2]

解压缩下载的MySQL 
![][3]

### 3.2 配置

#### 添加环境变量

添加MYSQL_HOME变量

```
MYSQL_HOME：D:\SoftWare\DevTools\mysql-5.7.24-winx64
```

Path环境变量

```
Path：%MYSQL_HOME%\bin
```

#### 新建配置文件-my.ini—存放到MySQL根目录

```
[mysql]
default-character-set=utf8

[mysqld]
character-set-server=utf8
default-storage-engine=INNODB
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

#### 初始化MySQL

以管理员模权限打开CMD终端，执行如下指令

```
mysqld --initialize-insecure
```

指令执行完成后，目录下生成data文件夹
![][4]

#### 注册MySQL服务

在CMD终端执行如下指令，显示`Service successfully installed.`表示服务注册成功

```
mysqld -install
```

#### 启动/停止MySQL服务

```
net start mysql //启动mysql服务
net stop mysql //停止mysql服务
```

![][5]

#### 修改默认账户密码

在CMD终端输入如下指令:`mysqladmin -u root password root`，前一个root是管理员账户，root是密码

```
mysqladmin -u root password root
```

### 3.3 登录/退出MySQL

#### 登录

打开CMD终端，输入如下指令

```
mysql -uroot -proot
```

登录参数

```
mysql -u用户名 -p密码 -h要连接的mysql服务器的ip地址(默认127.0.0.1) -P端口号(默认3306)
```

![][6]

#### 退出mysql

```
exit
quit
```

### 3.4 卸载MySQL—管理员模式下

#### 停止mysql服务

```
net stop mysql
```

#### 删除mysql安装服务

```
mysqld -remove mysql
```

#### 最后删除MySQL目录及相关的环境变量

## 三 MySQL安装版

### 3.1 下载MySQL Installer
![][7]
### 3.2 安装
选择安装类型(Full)
![][8]
安装路径
![][9]
安装过程
![][10]
配置
![][11]

### 3.3 配置

配置Type和网络类型
![][12]
配置认证方式
![][13]
配置root账户登录密码
![][14]
配置Windows启动服务
![][15]
执行应用配置
![][16]
配置完成
![][17]

### 3.4 产品配置
配置开始
![][18]
MySQL Service配置
![][19]
配置MySQL Route
![][20]
链接检查
![][21]

### 3.5 连接-工作台
双击运行
![][22]
输入登录密码
![][23]
登录之后表结构
![][24]

### 3.6 配置CMD终端路径

```
MYSQL_HOME：D:\SoftWare\DevTools\MySQL\MySQL Workbench 8.0
Path:%MYSQL_HOME%
```

## 四 参考

* [由于找不到MSVCR120.dll,无法继续执行代码](https://blog.csdn.net/apollo_miracle/article/details/118438132)
* [由于找不到MSVCR120.dll,无法继续执行代码，重新安装程序可能会解决此问题](https://blog.csdn.net/will__be/article/details/106826534)
* [Mysql workbench requires the visual C++ 2019 redistributable package](https://docs.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist)




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-archives.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-unzip-download.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-unzip-download-unzip.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-unzip-config-data.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-unzip-config-start-stop.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-unzip-connect.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-download.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-full.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-path.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-progress.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-product-configuration.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-type-network.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-authentication.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-account.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-service.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-apply-conf.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-finish.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-product-conf-start.png
[19]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-conf-mysql.png
[20]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-conf-route.png
[21]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-sercice-conn.png
[22]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-login-click.png
[23]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-login-password.png
[24]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-03-mysql-install-login-table.png