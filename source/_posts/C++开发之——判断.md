---
title: C++开发之——判断
categories:
  - 开发
  - A-基础语言
  - C++
tags:
  - 判断
abbrlink: 474e6eca
date: 2018-02-21 13:00:32
---
# C++判断
判断结构要求程序员指定一个或多个要评估或测试的条件，以及条件为真时要执行的语句（必需的）和条件为假时要执行的语句（可选的）。

下面是大多数编程语言中典型的判断结构的一般形式：  
![][1]  
<!--more-->
# 判断语句
++ 编程语言提供了以下类型的判断语句。点击链接查看每个语句的细节。  
![][2]  
#  : 运算符
我们已经在前面的章节中讲解了 条件运算符 ? :，可以用来替代 if...else 语句。它的一般形式如下：  

	Exp1 ? Exp2 : Exp3;

其中，Exp1、Exp2 和 Exp3 是表达式。请注意，冒号的使用和位置。

? 表达式的值是由 Exp1 决定的。如果 Exp1 为真，则计算 Exp2 的值，结果即为整个 ? 表达式的值。如果 Exp1 为假，则计算 Exp3 的值，结果即为整个 ? 表达式的值。  


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp_condition.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/cpp-if.png