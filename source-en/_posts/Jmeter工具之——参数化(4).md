---
title: Jmeter工具之——参数化(4)
categories:
  - 开发
  - L-自动化
  - Jmeter
tags:
  - Jmeter
abbrlink: 5defa579
date: 2024-12-02 08:35:05
---
## 一 概述

参数化测试：把测试数据组织起来，用不同的测试数据调用相同的测试方法

Jmeter中常见的参数化方式：

* 用户定义的变量
* CSV Data Set Config

<!--more-->

## 二 用户定义的变量

### 2.1 概念

* 作用：定义全局变量
* 位置: 测试计划—>线程组—>配置元件—>用户定义的变量

### 2.2 用户定义的变量示例

```
请求：https://www.baidu.com:443

检查：使用用户定义的变量配置被检测系统的协议、域名和端口
```

#### 步骤

* 添加线程组
* 添加用户定义的变量。格式：变量名-变量值
* 添加HTTP请求，引用定义的变量名。格式：${变量名}
* 添加查看结果树

#### 示例

1-测试计划配置全局变量。格式：变量名-变量值

![][1]

2-HTTP请求使用测试计划自定义变量${变量名}

![][2]

3-查看结果树，测试结果(内容被替换为定义变量)

![][3]

## 三 CSV Data Set Config

### 3.1 概念

* 作用：让不同用户在多次循环时，可以取到不同的值
* 位置：测试计划—>线程组—>配置元件—>CSV数据文件设置

### 3.2 CSV Data Set Config示例

```
请求：https://www.baidu.com
要求：循环请求3次，每次请求时附带参数username,password,code的值不相同
test_data.csv
user01,123456,0000
user02,123456,1111
user03,123456,2222
```

#### 操作步骤

* 定义CSV数据文件
* 添加线程组，设置循环次数为3
* 添加CSV数据文件设置
* 添加HTTP请求
* 添加查看结果树

#### 示例

1-添加线程组并设置线程数3(3组数据取值)

![][4]

2-在`线程组`上右键，依次点击：添加—>配置元件—>CSV Data Set Config

![][5]

3-配置CSV文件

![][6]

4-线程组添加http请求，并配置请求参数

![][7]

5-添加请求结果树，用于查看请求结果

![][8]

6-执行请求后，查看结果树内容(3个请求且请求参数不同)

![][9]




[1]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-global-set-1.png
[2]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-http-2.png
[3]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-http-result-3.png
[4]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-thread-set-4.png
[5]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-csv-add-5.png
[6]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-csv-set-6.png
[7]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-http-7.png
[8]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-result-add-8.png
[9]: https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-image/jmeter-4-param-result-view-9.png

