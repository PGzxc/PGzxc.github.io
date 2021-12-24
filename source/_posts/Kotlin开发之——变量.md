---
title: Kotlin开发之——变量
categories:
  - 开发
  - B-高级语言
  - Kotlin
tags:
  - 变量
abbrlink: b26cca10
date: 2017-12-18 23:56:28
---
# 前言

在Kotlin中，当声明一个变量的时候，有两个关键字可以使用：val、var，其中val 修饰不可变变量，var修饰可变变量。
<!--more-->
# val，var用法比较 
## val
- 默认情况下使用val声明变量
- 可以通过条件语句，在不同条件下为val变量初始化不同的值
- 通过val声明的变量不可变指的是指向的引用不可变


## var 
- 仅仅在某些必要的情况下才使用var声明变量
- 通过var定义的变量，可以修改它的值
- 它的数据类型是固定的

# 实例分析
## 定义变量
### 定义不可变变量

	val name='Mike'
	val language:String='Java'

### 定义可变变量

	var name='Lucy'
 
## 修改val 变量的值

	val language= arrayListOf<String>("java")
    language.add("kotlin")
  