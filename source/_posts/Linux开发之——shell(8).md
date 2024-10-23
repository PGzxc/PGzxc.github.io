---
title: Linux开发之——shell(8)
categories:
  - 系统
  - Linux
tags:
  - Linux
abbrlink: 38a3347
date: 2024-10-23 09:45:55
---
## 一 概述

* 初识shell
* 第一个shell
* shell语法

<!--more-->

## 二  内容

### 2.1 初识shell(如何使用)

* 手工方式(逐行输入命令，逐行执行)
* 脚本方式(写入文件再执行)

### 2.2 第一个shell

1- 新建后缀名为sh文件

2- 书写内容

```
#!/bin/bash
#这是临时shell脚本
echo 'nihao'
echo 'itcast'
```

3-执行

* chmod 777 a.sh //修改权限
* ./a.sh //执行脚本

### 2.3 shell语法

1-shell注释

* 单行注释 -#开头+内容
* 多行注释

2-shell变量

* 定义变量
* 使用变量
* 只读变量
* 删除变量

3-shell数组

* 定义数组
* 给数组元素赋值
* 获取元素
* 获取长度

4-运算符

* 算术运算符
* 字符串运算符
* 关系运算符
* 布尔运算符
* 逻辑运算符

5-判断句

6-选择语句

7-循环语句(for循环语句+while循环)

8-函数


## 三 思维导图

![linux-xmind-8][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/linux-xmind-8.png