---
title: Jmeter工具之——连接数据库(6)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: 9e3eca3f
date: 2024-12-04 09:03:34
---
## 一 Jmeter连接mysql的场景

```
1-用作请求的参数化
2-用作结果的断言
3-清理垃圾数据
4-准备测试数据
```

<!--more-->

![][1]

## 二 Jmeter连接数据库配置

### 2.1 添加MySQL驱动jar包

1-查看mysql版本

```
mysql --version
mysql  Ver 8.0.28 for Win64 on x86_64 (MySQL Community Server - GPL)
```

2-下载mysql-connector驱动包

```
https://downloads.mysql.com/archives/c-j/
```

![][2]

3-添加Mysql驱动包

```
方式一：在测试计划面板点击“浏览...”按钮，将JDBC驱动添加进去
方式二：将MySQL驱动jar包放入到lib/ext目录下，重启Jmeter
```

| 方式1  | 方式2  |
| :----: | :----: |
| ![][3] | ![][4] |

### 2.2 配置数据库连接信息

添加：测试计划—>线程组—>配置元件—>JDBC Connection Configuration

```
1-Variable Name for created pool:test //连接池变量名
2-DatabaseURL:jdbc:mysql://localhost:3306/world?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai&useSSL=false
3-DatabaseURL:jdbc:mysql://localhost:3306/world //同2一样
4-JDBC Driver class:com.mysql.jdbc.Driver
5-Username:root
6-Pasword:admin
```

![][5]

### 2.3 JDBC请求配置

```
1-Variable Name of Pooldeclared in JDBC Connection Configuration:test//jdbc连接池变量名
2-SQL Query：select version() from dual //查询语句
```

![][6]

## 三 Jmeter直连数据库

### 3.1 操作步骤

* 添加线程组
* 添加JDBC Connection Configuration
* 添加JDBC Request
* 添加查看结果树

### 3.2 示例

![][7]




[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-sql-graph-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-jdbc-download-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-jar-way1-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-jar-way2-4.png
[5]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-jdbc-config-5.png
[6]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-jdbc-request-6.png
[7]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-6-jdbc-result-7.png