---
title: PHP开发之——Windows开发环境搭建
categories:
  - 开发
  - G-后端开发
  - PHP
tags:
  - PHP
abbrlink: b9a33ff4
date: 2020-11-06 23:54:14
---
## 一 概述

* PHP软件下载
* PHP环境配置
* 添加运行测试

<!--more-->

## 二 PHP软件下载

* PHP官方下载地址：[https://www.php.net/downloads.php][21]，选择Windows安装

  ![][1]
  
* 版本选择

  -  Thread Safe ： 如果是与 Apache 搭配，建议选择 Thread Safe 版本 
  -  Non Thread Safe ： 如果是与 CGI 或者 FAST-CGI 搭配，建议选择 Non Thread Safe 版本 
  
  ![][2]

## 三 PHP环境配置
### 3.1  将下载后的文件解压到指定目录，此处安装路径为
```
E:\Software\php-7.4.12-Win32-vc15-x64
```

### 3.2 将PHP 的根目录下的 php.ini-production复制一份并改名为 php.ini，作为PHP的配置文件； 

  ```
php.ini-production——>php.ini
  ```

### 3.3  打开php.ini，修改配置信息 

#### 3.3.1 配置说明

*  ini文件的注释是分号（英文分号），所以取消注释就删除分号； 
*  ${phphome}是PHP的根目录，即：E:\Software\php-7.4.12-Win32-vc15-x64，配置文件中写成绝对路径 

#### 3.3.2  修改扩展文件的路径 

```
修改前：;extension_dir = "ext"
修改后：extension_dir = "ext"
```

#### 3.3.3  修改需要加载的扩展文件，下面代码是取消部分扩展程序的注释之后的代码 

```
extension=bz2
extension=curl
;extension=ffi
;extension=ftp
extension=fileinfo
extension=gd2
extension=gettext
extension=gmp
extension=intl
extension=imap
extension=ldap
extension=mbstring
extension=exif      ; Must be after mbstring as it depends on it
extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
;extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_oci
extension=pdo_odbc
extension=pdo_pgsql
extension=pdo_sqlite
extension=pgsql
;extension=shmop

; The MIBS data available in the PHP distribution must be installed.
; See http://www.php.net/manual/en/snmp.installation.php
;extension=snmp

extension=soap
extension=sockets
;extension=sodium
extension=sqlite3
extension=tidy
extension=xmlrpc
extension=xsl
```

#### 3.3.4  设置默认的时区

```
[Date]
; Defines the default timezone used by the date functions
; http://php.net/date.timezone
date.timezone = Asia/Shanghai
```

#### 3.3.5  设置 ssl 

```
[openssl]
; The location of a Certificate Authority (CA) file on the local filesystem
; to use when verifying the identity of SSL/TLS peers. Most users should
; not specify a value for this directive as PHP will attempt to use the
; OS-managed cert stores in its absence. If specified, this value may still
; be overridden on a per-stream basis via the "cafile" SSL stream context
; option.
;openssl.cafile= cacert.pem
```

### 3.4 自定义扩展

 修改 Apache24\conf\ 目录下的 httpd.conf 配置 Apache ，让 Apache 和 PHP 协同工作

#### 3.4.1  DocumentRoot 设置 

  修改前：默认的是 Apache24 下的 htdocs 目录： 

```
DocumentRoot "${SRVROOT}/htdocs"
<Directory "${SRVROOT}/htdocs">
```

自定义修改(如)

```
DocumentRoot "E:/Software/php-7.4.12-Win32-vc15-x64/www"
<Directory "E:/Software/php-7.4.12-Win32-vc15-x64/www">
```

#### 3.4.2  修改默认的索引，以支持 PHP 

```
修改前
# DirectoryIndex: sets the file that Apache will serve if a directory
# is requested.
#
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
修改后
# DirectoryIndex: sets the file that Apache will serve if a directory
# is requested.
#
<IfModule dir_module>
    DirectoryIndex index.html index.php index.htm
</IfModule>
```

#### 3.4.3  开启 rewrite 功能：将下面这行代码前面的 # 去掉 

```
LoadModule rewrite_module modules/mod_rewrite.so
```

## 四 添加运行测试

*  在 E:\Software\Apache24\htdocs 目录下，创建 index.php 文件，文本内容如下 

  ```
  <?php
  echo phpinfo();
  ?>
  ```

* 重启 Apache 服务，打开浏览地址栏输入： localhost:80/index.php 或者 127.0.0.1/index.php ,就可以打开 PHP 页面。 

  ![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-soft-windows-select.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-soft-thread-safe.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-php/php-soft-indep-php.png
[21]:https://www.php.net/downloads.php