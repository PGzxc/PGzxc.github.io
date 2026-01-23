---
title: Kotlin开发之——字符串模板
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 字符串模板
abbrlink: dce5e494
date: 2017-12-19 17:04:40
---
# 前言

所谓字符串模板是在字符串中添加若干个占位符，内容会在后期指定，也就是说，用模板可以设置字符串动态的部分。   
模板使用美元符号"$"表示。

- 字符串可以通过占位符的形式进行插值
- 如果需要在字符串中包含"$"，可以对其进行转义
- 当占位符是表达式时，需要用花括号把表达式括起来
- 可以在双引号中嵌套双引号，只要被嵌套的双引号在花括号的表达式中
<!--more-->

# 示例
## 简单使用
	val name="Mike"
	println("hello,$name")
打印输出：hello,Mike
## 输出中包含$
	val name="Mike"
    println("$name have 5\$s")
当字符串中包含"$"时，要保持原型，可以使用转义字符"\"   
打印输出：Mike have 5$s
## 输出中有表达式
	val name="Mike"
    println("hello,${if(name.isBlank()) name.toUpperCase() else name.toLowerCase()}")

打印输出： hello,mike