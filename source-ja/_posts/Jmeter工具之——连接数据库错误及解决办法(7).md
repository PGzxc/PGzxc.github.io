---
title: Jmeter工具之——连接数据库错误及解决办法(7)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: e7828d07
date: 2024-12-05 08:59:16
---
## 一 Jmeter连接mysql常见错误

```
1-Unable to load authentication plugin 'caching_sha2_password'
2-class java.math.BigInteger cannot be cast to class java.lang.Long
```

<!--more-->

## 二 caching_sha2_password错误

### 2.1 现象

![][1]

### 2.2 解决办法

```
ALTER USER 'your_username'@'your_host' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';
FLUSH PRIVILEGES;
```

注意：将`your_username`、`your_host`和`your_password`替换为你的MySQL用户名、主机和密码

![][2]

## 三 BigInteger cannot be cast to class java.lang.Long

### 3.1 现象

![][3]

### 3.2 解决办法

1-查询当前环境数据库版本

```
mysql --version
mysql  Ver 8.0.28 for Win64 on x86_64 (MySQL Community Server - GPL)
```

2-下载响应的mysql-connector对应版本

```
https://downloads.mysql.com/archives/c-j/
```

3-放到lib/ext目录下








[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-jdbc-7-error-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-7-mysql-set-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-jdbc-7-error-3.png

