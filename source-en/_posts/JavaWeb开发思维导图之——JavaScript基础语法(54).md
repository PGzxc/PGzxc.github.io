---
title: JavaWeb开发思维导图之——JavaScript基础语法(54)
categories:
  - 开发
  - G-后端开发
  - JavaWeb
tags:
  - JavaWeb
abbrlink: 1f732c27
date: 2025-01-10 09:53:52
---
## 一 概述

* 注释
* 输入输出语句
* 变量和常量
* 原始数据类型
* 运算符
* 流程控制和循环语句
* 数组
* 函数

<!--more-->

## 二 内容详情

### 2.1 注释

* 单行注释 //注释内容
* 多行注释/* 注释内容*/

### 2.2 输入输出语句

* 输入框: prompt("提示内容")
* 弹出警告框: alert("提示内容")
* 控制台输出: consol.log("显示内容")
* 页面内容输出: document.write("显示内容")

### 2.3 变量和常量

*  javaScript属于弱类型语言
* 定义变量时不区分具体的数据类型
* 定义局部变量: let 变量名=值；
* 定义全局变量: 变量名=值;
* 定义常量: const 常量名=值;

### 2.4 原始数据类型

* boolean: 布尔类型，true或false
* null: 声明null值的特殊关键字
* underfined: 代表变量未定义
* number: 整数或浮点数
* string: 字符串
* bigint: 大整数,例如: let num=10n;

### 2.5 运算符

* 算术运算符
* 赋值运算符
* 比较运算符
* 逻辑运算符
* 三元运算符

### 2.6 流程控制和循环语句

* if语句
* switch语句
* for循环
* while循环

### 2.7 数组

* 说明: 数据类型和长度没有限制
* 格式: let 数组名=[元素1,元素2,..];
* 索引范围: 从0开始，最大到数组长度-1
* 数组长度: 数组名.length
* 高级运算符(...)

### 2.8 函数

* 定义格式:function 方法名(参数列表){方法体; return 返回值;}
* 可变参数: function 方法名(...参数名){方法体;return 返回值;}
* 匿名函数: function(参数列表){方法体;}

## 三 思维导图

![javaweb-xmind-javascript-basic-2][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-java/javaweb-xmind-javascript-basic-2.png